/* =========================================================================
   Echoes of the Voice — soundboard engine
   -------------------------------------------------------------------------
   Pure vanilla JS. No build step, no backend.

   Audio model:
     - Exactly one ambient loop plays at a time. Starting a new location
       cross-fades from the previous ambient. Fades use requestAnimationFrame.
     - Any number of one-shot effects can play at once, layered over the
       ambient, each at the current effects volume.
     - When an audio file is missing, a gentle Web Audio placeholder is
       generated instead (toggle with `synthFallback` in sounds.config.js),
       so the board works before you add your own recordings.

   iOS / Android notes:
     - The AudioContext is created and resumed inside a user gesture.
     - Every HTMLAudioElement .play() call happens synchronously inside a
       tap handler, which is what mobile browsers require to allow sound.
   ========================================================================= */
(function () {
  'use strict';

  var CONFIG = window.SOUND_CONFIG || { locations: [], audioFormat: 'mp3', fadeMs: 1800, synthFallback: true };
  var FADE_MS = CONFIG.fadeMs || 1800;

  /* ---------------------------------------------------------------- utils */
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function audioUrl(file) {
    if (!file) return '';
    return 'audio/' + file + '.' + (CONFIG.audioFormat || 'mp3');
  }

  function hash(str) {
    var h = 0;
    str = String(str || '');
    for (var i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  function easeInOut(t) { return -(Math.cos(Math.PI * t) - 1) / 2; }

  // Tween a value over `ms`, calling onUpdate each frame. Returns a cancel fn.
  function tween(from, to, ms, onUpdate, onDone) {
    var start = null;
    var raf = 0;
    var cancelled = false;
    function step(now) {
      if (start === null) start = now;
      var t = ms <= 0 ? 1 : Math.min(1, (now - start) / ms);
      onUpdate(from + (to - from) * easeInOut(t));
      if (t < 1 && !cancelled) {
        raf = requestAnimationFrame(step);
      } else if (!cancelled && onDone) {
        onDone();
      }
    }
    raf = requestAnimationFrame(step);
    return function cancel() { cancelled = true; cancelAnimationFrame(raf); };
  }

  function load(key, fallback) {
    try {
      var v = localStorage.getItem('eotv.' + key);
      return v === null ? fallback : parseFloat(v);
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem('eotv.' + key, String(value)); } catch (e) {}
  }

  /* --------------------------------------------------------- audio engine */
  var Engine = {
    ctx: null,
    noiseBuf: null,
    ambientBase: clamp(load('vol.ambient', 0.8)),
    effectBase: clamp(load('vol.effect', 0.9)),

    current: null,      // { id, voice, level, cancel }
    fadingOut: [],      // [{ voice, level, cancel }]
    activeEffects: [],  // [{ setGain }]
    failed: {},         // url -> true (remember missing files)

    audioContext: function () {
      if (!this.ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx;
    },

    /* ---- shared noise buffer for synthesised ambience (brown noise) ---- */
    noiseBuffer: function () {
      var ac = this.audioContext();
      if (!ac) return null;
      if (this.noiseBuf) return this.noiseBuf;
      var len = Math.floor(ac.sampleRate * 3);
      var buf = ac.createBuffer(1, len, ac.sampleRate);
      var data = buf.getChannelData(0);
      var last = 0;
      for (var i = 0; i < len; i++) {
        var white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
      this.noiseBuf = buf;
      return buf;
    },

    /* ----------------------------- ambient ----------------------------- */
    buildSynthAmbient: function (loc) {
      var ac = this.audioContext();
      if (!ac) return null;
      var seed = hash(loc.id);
      var gain = ac.createGain();
      gain.gain.value = 0.0001;
      gain.connect(ac.destination);

      var src = ac.createBufferSource();
      src.buffer = this.noiseBuffer();
      src.loop = true;

      var filter = ac.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 240 + (seed % 520);
      filter.Q.value = 0.7;

      // slow movement so the wash feels alive
      var lfo = ac.createOscillator();
      lfo.frequency.value = 0.04 + (seed % 8) * 0.01;
      var lfoGain = ac.createGain();
      lfoGain.gain.value = 70;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      src.connect(filter);
      filter.connect(gain);
      var started = false;
      return {
        kind: 'synth',
        play: function () {
          ac.resume();
          if (!started) { try { src.start(); lfo.start(); } catch (e) {} started = true; }
        },
        setGain: function (v) {
          gain.gain.setTargetAtTime(Math.max(0.0001, clamp(v) * 0.4), ac.currentTime, 0.08);
        },
        stop: function () {
          var t = ac.currentTime;
          gain.gain.setTargetAtTime(0.0001, t, 0.2);
          try { src.stop(t + 0.6); } catch (e) {}
          try { lfo.stop(t + 0.6); } catch (e) {}
        }
      };
    },

    buildAmbientVoice: function (loc) {
      var self = this;
      var url = audioUrl(loc.ambient && loc.ambient.file);

      if (CONFIG.synthFallback && (!url || this.failed[url])) {
        return this.buildSynthAmbient(loc) || this.buildSilentVoice();
      }

      var el = new Audio(url);
      el.loop = true;
      el.preload = 'auto';
      var synth = null;
      var fellBack = false;

      var voice = {
        kind: 'file',
        el: el,
        play: function () {
          var p = el.play();
          if (p && p.catch) p.catch(function () { voice._fallback(); });
        },
        setGain: function (v) {
          if (synth) synth.setGain(v);
          else el.volume = clamp(v);
        },
        stop: function () {
          if (synth) synth.stop();
          else { try { el.pause(); el.currentTime = 0; } catch (e) {} }
        },
        _fallback: function () {
          if (fellBack || !CONFIG.synthFallback) return;
          fellBack = true;
          self.failed[url] = true;
          synth = self.buildSynthAmbient(loc);
          if (synth) {
            synth.play();
            // follow whatever level the fade is currently at
            var lvl = (self.current && self.current.voice === voice) ? self.current.level : 1;
            synth.setGain(lvl * self.ambientBase);
          }
        }
      };
      el.addEventListener('error', voice._fallback, { once: true });
      return voice;
    },

    buildSilentVoice: function () {
      return { kind: 'silent', play: function () {}, setGain: function () {}, stop: function () {} };
    },

    toggleAmbient: function (loc) {
      if (this.current && this.current.id === loc.id) {
        this.stopAmbient();
        return false;
      }
      this.startAmbient(loc);
      return true;
    },

    startAmbient: function (loc) {
      // Prime/resume the audio context inside the tap so a later (async) synth
      // fallback can still make sound on iOS, which only unlocks audio in a gesture.
      if (CONFIG.synthFallback) this.audioContext();
      if (this.current) this._fadeOutCurrent();
      var self = this;
      var voice = this.buildAmbientVoice(loc);
      voice.setGain(0);
      voice.play();                       // must be inside the user gesture
      var entry = { id: loc.id, voice: voice, level: 0, cancel: null };
      this.current = entry;
      entry.cancel = tween(0, 1, FADE_MS, function (v) {
        entry.level = v;
        voice.setGain(v * self.ambientBase);
      });
    },

    stopAmbient: function () {
      if (this.current) this._fadeOutCurrent();
    },

    _fadeOutCurrent: function () {
      var self = this;
      var entry = this.current;
      this.current = null;
      if (entry.cancel) entry.cancel();
      this.fadingOut.push(entry);
      entry.cancel = tween(entry.level, 0, FADE_MS, function (v) {
        entry.level = v;
        entry.voice.setGain(v * self.ambientBase);
      }, function () {
        entry.voice.stop();
        var i = self.fadingOut.indexOf(entry);
        if (i >= 0) self.fadingOut.splice(i, 1);
      });
    },

    setAmbientVolume: function (v) {
      this.ambientBase = clamp(v);
      save('vol.ambient', this.ambientBase);
      if (this.current) this.current.voice.setGain(this.current.level * this.ambientBase);
      for (var i = 0; i < this.fadingOut.length; i++) {
        var e = this.fadingOut[i];
        e.voice.setGain(e.level * this.ambientBase);
      }
    },

    /* ----------------------------- effects ----------------------------- */
    setEffectVolume: function (v) {
      this.effectBase = clamp(v);
      save('vol.effect', this.effectBase);
      for (var i = 0; i < this.activeEffects.length; i++) {
        this.activeEffects[i].setGain(this.effectBase);
      }
    },

    playEffect: function (effect) {
      // Prime/resume the audio context inside the tap (see startAmbient).
      if (CONFIG.synthFallback) this.audioContext();
      var url = audioUrl(effect.file);
      if (!url || (CONFIG.synthFallback && this.failed[url])) {
        this._synthEffect(effect);
        return;
      }
      var self = this;
      var done = false;
      var el = new Audio(url);
      el.volume = this.effectBase;
      var handle = { setGain: function (v) { el.volume = clamp(v); } };
      this.activeEffects.push(handle);

      function cleanup() {
        done = true;
        var i = self.activeEffects.indexOf(handle);
        if (i >= 0) self.activeEffects.splice(i, 1);
      }
      function fallback() {
        if (done) return;
        cleanup();
        self.failed[url] = true;
        if (CONFIG.synthFallback) self._synthEffect(effect);
      }
      el.addEventListener('ended', cleanup, { once: true });
      el.addEventListener('error', fallback, { once: true });
      var p = el.play();
      if (p && p.catch) p.catch(fallback);
    },

    // Soft placeholder tone, varied per effect so they sound distinct.
    _synthEffect: function (effect) {
      var ac = this.audioContext();
      if (!ac) return;
      var h = hash(effect.file || effect.label);
      var base = 150 + (h % 620);
      var dur = 0.22 + (h % 6) * 0.11;
      var types = ['sine', 'triangle', 'sine', 'triangle'];
      var type = types[h % types.length];
      var now = ac.currentTime;
      var peak = Math.max(0.0008, 0.22 * this.effectBase);

      var g = ac.createGain();
      g.connect(ac.destination);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(peak, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      var osc = ac.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(base, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, base * 0.85), now + dur);
      osc.connect(g);
      osc.start(now);
      osc.stop(now + dur + 0.05);
    }
  };

  /* --------------------------------------------------------------- icons */
  var ICONS = {
    market: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l2-4h14l2 4M3 9h18M5 9v10M19 9v10M4 21h16M9 21v-5h6v5"/></svg>',
    hospital: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M12 7v6M9 10h6M4 21h16"/></svg>',
    cafe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9h11v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2"/><path d="M8 3c0 1 1 1 1 2M11.5 3c0 1 1 1 1 2"/><path d="M4 21h13"/></svg>',
    flat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M4 21h16"/></svg>',
    church: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M10 4h4M6 21V11l6-4 6 4v10M4 21h16M10 21v-4a2 2 0 0 1 4 0v4"/></svg>'
  };
  var ICON_PLAY = '<svg class="icon icon-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5v14l11-7z"/></svg>';
  var ICON_STOP = '<svg class="icon icon-stop" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>';
  var EQUALIZER = '<span class="equalizer" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';

  /* ------------------------------------------------------------------ UI */
  var UI = {
    cards: {},        // id -> card element
    npBar: null,
    npLocation: null,

    init: function () {
      this.npBar = document.getElementById('nowPlaying');
      this.npLocation = document.getElementById('npLocation');
      this.renderLocations();
      this.wireControls();
      this.wireNowPlaying();
    },

    renderLocations: function () {
      var main = document.getElementById('locations');
      if (!main) return;
      main.innerHTML = '';
      var self = this;

      CONFIG.locations.forEach(function (loc) {
        var card = document.createElement('section');
        card.className = 'location';
        card.id = 'loc-' + loc.id;
        card.setAttribute('aria-label', loc.name);

        // header
        var head = document.createElement('div');
        head.className = 'location-head';
        head.innerHTML =
          '<span class="location-icon">' + (ICONS[loc.icon] || ICONS.church) + '</span>' +
          '<div class="location-titles">' +
            '<h2 class="location-name">' + esc(loc.name) + '</h2>' +
          '</div>';
        card.appendChild(head);

        if (loc.blurb) {
          var blurb = document.createElement('p');
          blurb.className = 'location-blurb';
          blurb.textContent = loc.blurb;
          card.appendChild(blurb);
        }

        // ambient toggle
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ambient-btn';
        btn.setAttribute('aria-pressed', 'false');
        btn.innerHTML =
          ICON_PLAY + ICON_STOP + EQUALIZER +
          '<span class="label-play">' + esc(loc.ambient.label || 'achtergrond') + '</span>' +
          '<span class="label-stop">Stop ' + esc(loc.name) + '</span>';
        btn.addEventListener('click', function () {
          var nowPlaying = Engine.toggleAmbient(loc);
          self.setActiveLocation(nowPlaying ? loc : null);
        });
        card.appendChild(btn);

        // effects
        var efLabel = document.createElement('p');
        efLabel.className = 'effects-label';
        efLabel.textContent = 'Geluidseffecten';
        card.appendChild(efLabel);

        var grid = document.createElement('div');
        grid.className = 'effects';
        (loc.effects || []).forEach(function (effect) {
          var eb = document.createElement('button');
          eb.type = 'button';
          eb.className = 'effect-btn';
          eb.textContent = effect.label;
          eb.setAttribute('aria-label', effect.label);
          eb.addEventListener('click', function () {
            Engine.playEffect(effect);
            fire(eb);
          });
          grid.appendChild(eb);
        });
        card.appendChild(grid);

        main.appendChild(card);
        self.cards[loc.id] = card;
      });
    },

    setActiveLocation: function (loc) {
      for (var id in this.cards) {
        if (!this.cards.hasOwnProperty(id)) continue;
        var card = this.cards[id];
        var active = loc && id === loc.id;
        card.classList.toggle('is-active', !!active);
        var btn = card.querySelector('.ambient-btn');
        if (btn) btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      }
      if (loc) {
        this.npLocation.textContent = loc.name;
        this.npBar.hidden = false;
      } else {
        this.npBar.hidden = true;
      }
    },

    wireControls: function () {
      bindSlider('ambientVol', 'ambientVolVal', Engine.ambientBase, function (v) {
        Engine.setAmbientVolume(v);
      });
      bindSlider('effectVol', 'effectVolVal', Engine.effectBase, function (v) {
        Engine.setEffectVolume(v);
      });
    },

    wireNowPlaying: function () {
      var self = this;
      var stop = document.getElementById('npStop');
      if (stop) {
        stop.addEventListener('click', function () {
          Engine.stopAmbient();
          self.setActiveLocation(null);
        });
      }
    }
  };

  /* --------------------------------------------------------- UI helpers */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fire(btn) {
    btn.classList.remove('is-firing');
    // force reflow so the animation can restart on rapid taps
    void btn.offsetWidth;
    btn.classList.add('is-firing');
    btn.addEventListener('animationend', function handler() {
      btn.classList.remove('is-firing');
      btn.removeEventListener('animationend', handler);
    });
  }

  function bindSlider(inputId, valId, initial, onChange) {
    var input = document.getElementById(inputId);
    var valEl = document.getElementById(valId);
    if (!input) return;
    var pct = Math.round(clamp(initial) * 100);
    input.value = pct;
    if (valEl) valEl.textContent = pct + '%';
    input.addEventListener('input', function () {
      var v = parseInt(input.value, 10) / 100;
      if (valEl) valEl.textContent = input.value + '%';
      onChange(v);
    });
  }

  /* ----------------------------------------------------- service worker */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
      navigator.serviceWorker.register('sw.js').catch(function () { /* offline support is optional */ });
    }
  }

  /* ----------------------------------------------------------- bootstrap */
  function start() {
    UI.init();
    registerServiceWorker();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
