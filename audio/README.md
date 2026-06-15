# Audio files

Drop your sound files into these folders. The app loads them by name, so the
**filenames must match** the list below (the extension is set by `audioFormat`
in `../sounds.config.js`, which defaults to `.mp3`).

Until a file exists, the soundboard plays a gentle placeholder tone instead, so
everything is usable while you are still recording or sourcing audio.

## What goes where

Each location has **one ambient loop** (`ambient.*`) plus several **one-shot
effects**. Ambient loops should be seamless (loopable) and a minute or more is
ideal. Effects should be short.

```
audio/
├── marketplace/
│   ├── ambient.mp3                  Busy Utrecht market atmosphere (loop)
│   ├── rain.mp3
│   ├── bicycle-bell.mp3
│   ├── dutch-conversation.mp3       Passing conversation in Dutch
│   ├── distant-church-bells.mp3
│   ├── footsteps.mp3
│   └── vendor-call.mp3              Vendor calling customers
│
├── hospital/
│   ├── ambient.mp3                  Quiet Dutch hospital ambience (loop)
│   ├── heart-monitor.mp3
│   ├── rolling-cart.mp3
│   ├── announcement.mp3             Distant announcement
│   ├── door-opening.mp3
│   ├── cough.mp3
│   └── footsteps.mp3
│
├── cafe/
│   ├── ambient.mp3                  Cozy Utrecht café ambience (loop)
│   ├── espresso-machine.mp3
│   ├── cups-and-plates.mp3
│   ├── quiet-chatter.mp3
│   ├── door-opening.mp3
│   ├── cash-register.mp3
│   └── spoon-stirring.mp3
│
├── flat/
│   ├── ambient.mp3                  Small Dutch apartment ambience (loop)
│   ├── kettle.mp3
│   ├── phone-vibration.mp3
│   ├── doorbell.mp3
│   ├── washing-machine.mp3
│   ├── clock-ticking.mp3
│   └── rain-window.mp3              Rain against the window
│
└── church/
    ├── ambient.mp3                  Reverent church atmosphere (loop)
    ├── organ.mp3
    ├── pages-turning.mp3
    ├── prayer-voices.mp3            Soft prayer voices
    ├── church-bells.mp3
    ├── pew-creak.mp3                Wooden pew creak
    └── footsteps.mp3
```

## Tips

- **Format:** MP3 works on every modern phone and desktop browser. To use a
  different format (e.g. `ogg` or `m4a`), change `audioFormat` in
  `sounds.config.js` and use that extension for every file.
- **File size:** keep ambient loops reasonably compressed (96–128 kbps mono is
  plenty) so they load quickly and cache well for offline use.
- **Adding or renaming sounds:** edit `sounds.config.js` — the `file:` value is
  the path here without the extension (e.g. `marketplace/rain`).
