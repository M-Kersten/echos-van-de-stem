/* =========================================================================
   Echo's van de Stem — verbindingsweb
   -------------------------------------------------------------------------
   Tekent een interactief web: zes personages in een cirkel plus een zevende
   knoop in het midden (de gedeelde plekken). Verbindingen zijn dik en
   doorgetrokken (sterk), dun en gestippeld (sluimerend), of dun naar het
   midden (gedeelde plek).

   - Tik op een knoop: licht de verbindingen van dat personage op en toon een
     korte omschrijving.
   - Tik op een lijn: toon wat die verbinding inhoudt.
   ========================================================================= */
(function () {
  'use strict';

  var CFG = window.CONNECTIONS_CONFIG;
  if (!CFG) return;

  var SVGNS = 'http://www.w3.org/2000/svg';
  var XLINK = 'http://www.w3.org/1999/xlink';

  // viewBox-afmetingen (geometrie in deze eenheden; CSS schaalt naar de breedte)
  var VW = 124, VH = 122;
  var CX = 62, CY = 60, R = 39, NODE_R = 9, CENTER_R = 14, LABEL_GAP = 17;

  function el(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    return e;
  }

  function byId(arr, id) {
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return null;
  }

  var Web = {
    svg: null,
    info: null,
    nodes: {},        // id -> { data, group, x, y, isCenter }
    edges: [],        // { a, b, type, desc, group }
    selection: null,  // { kind:'node'|'edge', ref }

    init: function () {
      this.svg = document.getElementById('webSvg');
      this.info = document.getElementById('webInfo');
      if (!this.svg) return;

      this.svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
      this.computePositions();
      this.buildEdges();
      this.buildNodes();
      this.wireBackground();
      this.resetInfo();
    },

    computePositions: function () {
      var chars = CFG.characters;
      var n = chars.length;
      for (var i = 0; i < n; i++) {
        var ang = (-90 + i * (360 / n)) * Math.PI / 180;
        this.nodes[chars[i].id] = {
          data: chars[i],
          x: CX + R * Math.cos(ang),
          y: CY + R * Math.sin(ang),
          isCenter: false,
          group: null
        };
      }
      if (CFG.center) {
        this.nodes[CFG.center.id] = { data: CFG.center, x: CX, y: CY, isCenter: true, group: null };
      }
    },

    // Verzamel alle lijnen: personage-personage plus (optioneel) elk personage naar het midden.
    allLinks: function () {
      var links = (CFG.links || []).slice();
      if (CFG.center) {
        (CFG.centerLinks || []).forEach(function (cl) {
          links.push({ a: CFG.center.id, b: cl.id, type: 'plek', desc: cl.desc });
        });
      }
      return links;
    },

    buildEdges: function () {
      var self = this;
      var g = el('g', { 'class': 'web-edges' });
      // Teken in volgorde plek -> sluimerend -> sterk, zodat sterke lijnen bovenop liggen.
      var order = { plek: 0, sluimerend: 1, sterk: 2 };
      var links = this.allLinks().sort(function (x, y) { return order[x.type] - order[y.type]; });

      links.forEach(function (link) {
        var na = self.nodes[link.a], nb = self.nodes[link.b];
        if (!na || !nb) return;

        var group = el('g', {
          'class': 'web-edge edge-' + link.type,
          role: 'button',
          tabindex: '0'
        });
        var labelA = na.data.name, labelB = nb.data.name;
        group.setAttribute('aria-label', 'Verbinding tussen ' + labelA + ' en ' + labelB);

        var coords = { x1: na.x, y1: na.y, x2: nb.x, y2: nb.y };
        group.appendChild(el('line', Object.assign({ 'class': 'edge-hit' }, coords)));
        group.appendChild(el('line', Object.assign({ 'class': 'edge-line' }, coords)));

        var edge = { a: link.a, b: link.b, type: link.type, desc: link.desc, group: group };
        group.addEventListener('click', function (ev) { ev.stopPropagation(); self.selectEdge(edge); });
        group.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); self.selectEdge(edge); }
        });
        self.edges.push(edge);
        g.appendChild(group);
      });
      this.svg.appendChild(g);
    },

    buildNodes: function () {
      var self = this;
      var g = el('g', { 'class': 'web-nodes' });

      Object.keys(this.nodes).forEach(function (id) {
        var node = self.nodes[id];
        var r = node.isCenter ? CENTER_R : NODE_R;
        var hasIcon = !node.isCenter && !!node.data.icon;
        var group = el('g', {
          'class': 'web-node' + (node.isCenter ? ' center' : '') + (hasIcon ? ' has-icon' : ''),
          role: 'button',
          tabindex: '0'
        });
        group.setAttribute('aria-label', node.data.name + ' — bekijk verbindingen');

        group.appendChild(el('circle', { 'class': 'node-hit', cx: node.x, cy: node.y, r: r + 4 }));

        if (hasIcon) {
          // Knip de personagefoto rond in de knoop; toon een rand erbovenop.
          var clipId = 'web-clip-' + id;
          var clip = el('clipPath', { id: clipId });
          clip.appendChild(el('circle', { cx: node.x, cy: node.y, r: r }));
          group.appendChild(clip);
          group.appendChild(el('circle', { 'class': 'node-bg', cx: node.x, cy: node.y, r: r }));
          var img = el('image', {
            x: node.x - r, y: node.y - r, width: r * 2, height: r * 2,
            preserveAspectRatio: 'xMidYMid slice',
            'clip-path': 'url(#' + clipId + ')'
          });
          img.setAttribute('href', node.data.icon);              // modern browsers
          img.setAttributeNS(XLINK, 'xlink:href', node.data.icon); // oudere Safari
          group.appendChild(img);
          group.appendChild(el('circle', { 'class': 'node-dot', cx: node.x, cy: node.y, r: r }));
        } else {
          group.appendChild(el('circle', { 'class': 'node-dot', cx: node.x, cy: node.y, r: r }));
        }

        if (node.isCenter) {
          // Tweeregelig label binnen de middelste knoop.
          var t = el('text', { 'class': 'node-label center-label', x: node.x, y: node.y });
          t.appendChild(makeTspan('De gedeelde', node.x, '-0.35em'));
          t.appendChild(makeTspan('plekken', node.x, '1.1em'));
          group.appendChild(t);
        } else {
          var lp = self.labelPlacement(node);
          var label = el('text', {
            'class': 'node-label',
            x: lp.x, y: lp.y,
            'text-anchor': lp.anchor,
            'dominant-baseline': lp.baseline
          });
          label.textContent = node.data.name;
          group.appendChild(label);
        }

        group.addEventListener('click', function (ev) { ev.stopPropagation(); self.selectNode(id); });
        group.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); self.selectNode(id); }
        });

        node.group = group;
        g.appendChild(group);
      });
      this.svg.appendChild(g);
    },

    labelPlacement: function (node) {
      var dx = node.x - CX, dy = node.y - CY;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var ux = dx / len, uy = dy / len;
      return {
        x: node.x + ux * LABEL_GAP,
        y: node.y + uy * LABEL_GAP,
        anchor: ux > 0.3 ? 'start' : ux < -0.3 ? 'end' : 'middle',
        baseline: uy > 0.3 ? 'hanging' : uy < -0.3 ? 'auto' : 'middle'
      };
    },

    wireBackground: function () {
      var self = this;
      this.svg.addEventListener('click', function () { self.clearSelection(); });
    },

    /* -------------------------------------------------- selectie & highlight */
    selectNode: function (id) {
      if (this.selection && this.selection.kind === 'node' && this.selection.ref === id) {
        this.clearSelection();
        return;
      }
      this.selection = { kind: 'node', ref: id };
      var self = this;
      var connectedIds = {};
      connectedIds[id] = true;

      this.edges.forEach(function (edge) {
        var touches = edge.a === id || edge.b === id;
        edge.group.classList.toggle('is-active', touches);
        edge.group.classList.toggle('is-dim', !touches);
        if (touches) { connectedIds[edge.a] = true; connectedIds[edge.b] = true; }
      });

      Object.keys(this.nodes).forEach(function (nid) {
        var grp = self.nodes[nid].group;
        grp.classList.toggle('is-active', !!connectedIds[nid]);
        grp.classList.toggle('is-dim', !connectedIds[nid]);
        grp.classList.toggle('is-selected', nid === id);
      });

      this.showNodeInfo(id);
    },

    selectEdge: function (edge) {
      if (this.selection && this.selection.kind === 'edge' && this.selection.ref === edge) {
        this.clearSelection();
        return;
      }
      this.selection = { kind: 'edge', ref: edge };
      var self = this;
      var ends = {};
      ends[edge.a] = true; ends[edge.b] = true;

      this.edges.forEach(function (e) {
        var active = e === edge;
        e.group.classList.toggle('is-active', active);
        e.group.classList.toggle('is-dim', !active);
      });
      Object.keys(this.nodes).forEach(function (nid) {
        var grp = self.nodes[nid].group;
        grp.classList.toggle('is-active', !!ends[nid]);
        grp.classList.toggle('is-dim', !ends[nid]);
        grp.classList.remove('is-selected');
      });

      this.showEdgeInfo(edge);
    },

    clearSelection: function () {
      if (!this.selection) return;
      this.selection = null;
      var self = this;
      this.edges.forEach(function (e) { e.group.classList.remove('is-active', 'is-dim'); });
      Object.keys(this.nodes).forEach(function (nid) {
        self.nodes[nid].group.classList.remove('is-active', 'is-dim', 'is-selected');
      });
      this.resetInfo();
    },

    /* ----------------------------------------------------------- infopaneel */
    typeLabel: function (type) {
      return type === 'sterk' ? 'Sterke verbinding'
        : type === 'sluimerend' ? 'Sluimerende verbinding'
        : 'Gedeelde plek';
    },

    showNodeInfo: function (id) {
      var node = this.nodes[id];
      var strong = [], dormant = [];
      var self = this;
      this.edges.forEach(function (edge) {
        if (edge.type === 'plek') return;
        var other = edge.a === id ? edge.b : edge.b === id ? edge.a : null;
        if (!other) return;
        var name = self.nodes[other].data.name;
        (edge.type === 'sterk' ? strong : dormant).push(name);
      });

      var html = '<h3 class="web-info-title">' + esc(node.data.name) + '</h3>';
      var blurb = node.data.blurb;
      var paras = Array.isArray(blurb) ? blurb : (blurb ? [blurb] : []);
      paras.forEach(function (p) { html += '<p class="web-info-text">' + esc(p) + '</p>'; });
      if (strong.length) html += '<p class="web-info-line"><span class="dot dot-sterk"></span><strong>Sterke verbindingen:</strong> ' + esc(strong.join(', ')) + '</p>';
      if (dormant.length) html += '<p class="web-info-line"><span class="dot dot-sluimerend"></span><strong>Sluimerend:</strong> ' + esc(dormant.join(', ')) + '</p>';
      this.info.innerHTML = html;
    },

    showEdgeInfo: function (edge) {
      var a = this.nodes[edge.a].data.name;
      var b = this.nodes[edge.b].data.name;
      this.info.innerHTML =
        '<h3 class="web-info-title">' + esc(a) + ' &harr; ' + esc(b) + '</h3>' +
        '<p class="web-info-badge badge-' + edge.type + '">' + esc(this.typeLabel(edge.type)) + '</p>' +
        '<p class="web-info-text">' + esc(edge.desc || '') + '</p>';
    },

    resetInfo: function () {
      this.info.innerHTML = '<p class="web-info-hint">' + esc(CFG.intro || '') + '</p>';
    }
  };

  function makeTspan(text, x, dy) {
    var t = el('tspan', { x: x, dy: dy });
    t.textContent = text;
    return t;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Lichte Object.assign-polyfill voor oudere mobiele browsers.
  if (typeof Object.assign !== 'function') {
    Object.assign = function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var src = arguments[i];
        if (src) for (var k in src) if (Object.prototype.hasOwnProperty.call(src, k)) target[k] = src[k];
      }
      return target;
    };
  }

  function start() { Web.init(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
