(function () {
  'use strict';

  var root = document.querySelector('[data-wellness-wheel]');
  if (!root) return;

  var svg = root.querySelector('.ww-svg');
  var wheel = root.querySelector('[data-ww-wheel]');
  var callout = root.querySelector('.ww-callout');
  var nameEl = root.querySelector('[data-ww-name]');
  var tagEl = root.querySelector('[data-ww-tag]');
  var dotEl = root.querySelector('[data-ww-dot]');
  if (!svg || !wheel || !callout || !nameEl || !tagEl || !dotEl) return;

  var SVGNS = 'http://www.w3.org/2000/svg';
  var CX = 180;
  var CY = 180;
  var INNER = 54;
  var OUTER = 150;
  var PAD = 0.72;
  var LIFT = 17;

  var ROTATE_MS = 3450;
  var FIRST_ROTATE_MS = 4100;
  var SETTLE_MS = 240;
  var ANTICIPATE_MS = 90;
  var HOLD_MS = 2700;
  var RETRACT_MS = 660;
  var GAP_MS = 420;

  var DIMS = [
    { name: 'Social',        color: '#8E9AC8', tag: 'People who know you, not just who you care for.' },
    { name: 'Occupational',  color: '#4A7690', tag: 'Your work, your role, and who you still are.' },
    { name: 'Environmental', color: '#6E8570', tag: 'Surroundings that steady you, not just function.' },
    { name: 'Intellectual',  color: '#7CA7C4', tag: 'A mind that gets to stay curious, not just vigilant.' },
    { name: 'Spiritual',     color: '#8093A6', tag: "Meaning that holds steady when things don't." },
    { name: 'Emotional',     color: '#C98F97', tag: 'Naming what you feel, not just managing it.' },
    { name: 'Physical',      color: '#5FA0A0', tag: "Tending your own body, not only everyone else's." },
    { name: 'Financial',     color: '#CDA66B', tag: 'Some real control over what caring costs.' }
  ];

  var ARRIVAL = [7, 0, 1, 2, 3, 4, 5, 6];
  var timers = [];
  var wedges = [];
  var mark;

  function el(tag, attrs) {
    var node = document.createElementNS(SVGNS, tag);
    Object.keys(attrs || {}).forEach(function (key) {
      node.setAttribute(key, attrs[key]);
    });
    return node;
  }

  function polar(cx, cy, r, deg) {
    var angle = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  }

  function unit(deg) {
    var angle = (deg - 90) * Math.PI / 180;
    return [Math.cos(angle), Math.sin(angle)];
  }

  function sector(cx, cy, r0, r1, a0, a1) {
    var p0 = polar(cx, cy, r1, a0);
    var p1 = polar(cx, cy, r1, a1);
    var p2 = polar(cx, cy, r0, a1);
    var p3 = polar(cx, cy, r0, a0);
    var laf = (a1 - a0) > 180 ? 1 : 0;
    return [
      'M', p0[0], p0[1],
      'A', r1, r1, 0, laf, 1, p1[0], p1[1],
      'L', p2[0], p2[1],
      'A', r0, r0, 0, laf, 0, p3[0], p3[1],
      'Z'
    ].join(' ');
  }

  function makeToneFilter(id, colour) {
    var filter = el('filter', { id: id, x: '-8%', y: '-8%', width: '116%', height: '116%' });
    filter.appendChild(el('feComponentTransfer', {}));
    return filter;
  }

  function drawWheel() {
    DIMS.forEach(function (dim, i) {
      var group = el('g', { class: 'ww-wedge' });
      var start = i * 45 + PAD;
      var end = (i + 1) * 45 - PAD;
      var path = el('path', {
        class: 'ww-wedge-fill',
        d: sector(CX, CY, INNER, OUTER, start, end),
        fill: dim.color,
        opacity: '0.92'
      });
      var sheen = el('path', {
        class: 'ww-sheen',
        d: sector(CX, CY, INNER + 3, OUTER - 3, start + 0.9, end - 0.9),
        fill: 'none',
        stroke: 'rgba(255,255,255,0.24)',
        'stroke-width': '1.2',
        opacity: '0.55'
      });
      group.appendChild(path);
      group.appendChild(sheen);
      wheel.appendChild(group);
      wedges.push(group);
    });

    wheel.appendChild(el('circle', {
      class: 'ww-hub',
      cx: CX,
      cy: CY,
      r: INNER,
      fill: 'url(#wwPaper)',
      stroke: 'rgba(221,231,229,0.92)',
      'stroke-width': '1.1'
    }));

    // Placement lives on a wrapper group: the CSS transform set by
    // .ww-mark.is-awake would otherwise replace this transform entirely
    // and throw the mark to the SVG origin.
    var markWrap = el('g', { transform: 'translate(180 180) scale(2.18) translate(-12 -12)' });
    mark = el('g', {
      class: 'ww-mark',
      stroke: '#4A7690',
      'stroke-width': '1.42',
      fill: 'none',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    });
    mark.appendChild(el('path', { d: 'M12 12c0-3.6 1.6-6.6 4.6-8.2 1 3.8-.2 7.2-2.6 9.4' }));
    mark.appendChild(el('path', { d: 'M12 12c3.1-1.9 6.4-2.1 9.4-.4-1.8 3.3-5 4.9-8.6 4.6' }));
    mark.appendChild(el('path', { d: 'M12 12c-1.1 3.5-3.6 5.9-7.2 6.8-1-3.8.4-7.1 3.1-9.1' }));
    mark.appendChild(el('circle', { cx: 12, cy: 12, r: 1.6, fill: '#4A7690', stroke: 'none' }));
    markWrap.appendChild(mark);
    // Attach to the breathing group, not the rotating wheel group, so the
    // mark stays upright while the wheel turns around it.
    wheel.parentNode.appendChild(markWrap);
  }

  function later(fn, ms) {
    var id = window.setTimeout(fn, ms);
    timers.push(id);
    return id;
  }

  function clearTimers() {
    timers.forEach(window.clearTimeout);
    timers = [];
  }

  function clearActive() {
    wedges.forEach(function (group) {
      group.classList.remove('is-lifted', 'is-soft');
      group.style.transform = 'translate(0, 0) scale(1)';
      // Opacity is CSS-driven (.is-soft / .is-lifted); an inline opacity
      // here would outrank those class rules and the soften effect would
      // never show.
      group.style.removeProperty('opacity');
    });
    if (mark) mark.classList.remove('is-awake');
  }

  function setCallout(index, visible) {
    var dim = DIMS[index];
    if (visible) {
      nameEl.textContent = dim.name;
      tagEl.textContent = dim.tag;
      dotEl.style.background = dim.color;
      callout.classList.add('is-in');
    } else {
      callout.classList.remove('is-in');
    }
  }

  function lift(index) {
    wedges.forEach(function (group, i) {
      if (i === index) {
        var u = unit(i * 45 + 22.5);
        group.classList.add('is-lifted');
        group.classList.remove('is-soft');
        group.style.transform = 'translate(' + (u[0] * LIFT) + 'px, ' + (u[1] * LIFT) + 'px) scale(1.012)';
      } else {
        group.classList.remove('is-lifted');
        group.classList.add('is-soft');
        group.style.transform = 'translate(0, 0) scale(.996)';
      }
    });
    if (mark) mark.classList.add('is-awake');
  }

  function run(step) {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var index = ARRIVAL[step % ARRIVAL.length];
    var rotateDuration = step === 0 ? FIRST_ROTATE_MS : ROTATE_MS;

    if (reduced) {
      setCallout(index, true);
      later(function () { setCallout(index, false); }, 3000);
      later(function () { run(step + 1); }, 3800);
      return;
    }

    clearActive();
    setCallout(index, false);

    wheel.style.transition = 'transform ' + rotateDuration + 'ms cubic-bezier(.12,.72,.08,1)';
    wheel.style.transform = 'rotate(' + (22.5 - 45 * step) + 'deg)';

    later(function () {
      wedges[index].style.transform = 'scale(.992)';
    }, rotateDuration + SETTLE_MS);

    later(function () {
      lift(index);
    }, rotateDuration + SETTLE_MS + ANTICIPATE_MS);

    later(function () {
      setCallout(index, true);
    }, rotateDuration + SETTLE_MS + ANTICIPATE_MS + 130);

    later(function () {
      setCallout(index, false);
      clearActive();
    }, rotateDuration + SETTLE_MS + ANTICIPATE_MS + HOLD_MS);

    later(function () {
      run(step + 1);
    }, rotateDuration + SETTLE_MS + ANTICIPATE_MS + HOLD_MS + RETRACT_MS + GAP_MS);
  }

  drawWheel();
  later(function () { run(0); }, 600);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearTimers();
    } else {
      clearActive();
      later(function () { run(0); }, 400);
    }
  });
})();
