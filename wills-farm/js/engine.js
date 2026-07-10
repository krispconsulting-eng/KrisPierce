/* =========================================================================
   Engine — the two-tap grammar and the world's plumbing.

   The whole game runs on one sentence: WHO, then WHAT.
   - One tap always gets a response (a character reacts in place).
   - Two taps make things happen in the world.
   - Nothing requires dragging, gestures, speed, precision or holding.
   - There is no way to do any of it wrong.
   ========================================================================= */

const Engine = (() => {
  const SVGNS = 'http://www.w3.org/2000/svg';
  const stage = () => document.getElementById('stage');
  const layerCurrent = () => document.getElementById('scene-current');
  const layerOld = () => document.getElementById('scene-old');

  /* ---------------- save state ---------------- */

  const SAVE_KEY = 'wills-farm-save-v1';
  let save = {
    sceneIndex: 0,          // progress through the story
    storyDone: false,
    stickers: [],
    visited: ['farm'],
    settings: { ambient: 55, effects: 80, motion: 100, bigShimmer: false },
  };
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) save = Object.assign(save, JSON.parse(raw));
  } catch (e) {}

  function persist() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {}
  }

  /* ---------------- runtime state ---------------- */

  const state = {
    selected: null,        // currently chosen character id
    chars: {},             // id -> record
    props: {},             // id -> record
    pairs: {},             // 'who>what' -> async handler
    busy: false,           // a scripted beat is playing
    sceneId: null,
    hintIds: [],           // scene's suggested shimmer order
  };

  /* ---------------- helpers ---------------- */

  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  function gEl(cls, transform) {
    const g = document.createElementNS(SVGNS, 'g');
    if (cls) g.setAttribute('class', cls);
    if (transform) g.setAttribute('transform', transform);
    return g;
  }

  // play a one-shot CSS animation class on a node, remove it after
  function animOnce(node, cls, dur = 1000) {
    if (!node) return Promise.resolve();
    node.classList.remove(cls);
    void node.getBoundingClientRect(); // restart animation
    node.classList.add(cls);
    return wait(dur).then(() => node.classList.remove(cls));
  }

  // svg world point -> screen px (for HTML bubbles)
  function toScreen(x, y) {
    const s = stage();
    const pt = s.createSVGPoint();
    pt.x = x; pt.y = y;
    const m = s.getScreenCTM();
    if (!m) return { x: 0, y: 0 };
    const sp = pt.matrixTransform(m);
    return { x: sp.x, y: sp.y };
  }

  /* ---------------- entities ---------------- */

  // Adds a character. svg faces RIGHT at scale 1, feet on (0,0).
  function addChar(id, opts) {
    const { svg, x, y, scale = 1, facing = 1, label, reactions = [] } = opts;
    const outer = gEl('char-outer char-move tappable', `translate(${x} ${y})`);
    outer.dataset.id = id;
    outer.setAttribute('role', 'button');
    outer.setAttribute('tabindex', '0');
    outer.setAttribute('aria-label', label);
    const flip = gEl('flip');
    flip.setAttribute('transform', `scale(${scale * facing} ${scale})`);
    flip.innerHTML = svg;
    outer.appendChild(flip);
    layerCurrent().appendChild(outer);
    // forgiving hit area: the sprite's own bounds, generously padded —
    // big enough to be easy (>= 75pt), tight enough not to steal a
    // neighbour's tap
    const bb = measureSprite(flip);
    const pad = 18;
    const rx = Math.max(65, bb.width / 2 + pad);
    const ry = Math.max(65, bb.height / 2 + pad);
    const hit = document.createElementNS(SVGNS, 'ellipse');
    hit.setAttribute('cx', bb.x + bb.width / 2);
    hit.setAttribute('cy', bb.y + bb.height / 2);
    hit.setAttribute('rx', rx); hit.setAttribute('ry', ry);
    hit.setAttribute('style', 'fill:transparent');
    flip.appendChild(hit);
    const ring = document.createElementNS(SVGNS, 'ellipse');
    ring.setAttribute('class', 'hitring');
    ring.setAttribute('cx', bb.x + bb.width / 2);
    ring.setAttribute('cy', bb.y + bb.height / 2);
    ring.setAttribute('rx', rx - 8); ring.setAttribute('ry', ry - 8);
    flip.appendChild(ring);

    const rec = { id, el: outer, flip, x, y, scale, facing, label, reactions, reactIx: 0,
                  hitEl: hit, ringEl: ring };
    state.chars[id] = rec;
    bindTap(outer, () => onCharTap(id));
    return rec;
  }

  // measure a sprite's bounds ignoring its decorative rings/halos, which
  // are not part of the visible silhouette
  function measureSprite(node) {
    const deco = node.querySelectorAll('.shimmer-halo, .select-ring, .hitring');
    deco.forEach(d => { d.style.display = 'none'; });
    const bb = node.getBBox();
    deco.forEach(d => { d.style.display = ''; });
    return bb;
  }

  // Swap a character's pose (its .rocker group) and resize the hit area
  // to the new silhouette — a landed pelican must not keep her flying
  // wingspan's tap target.
  function setPose(rec, svg) {
    const rocker = rec.flip.querySelector('.rocker');
    if (rocker) rocker.outerHTML = svg;
    const fresh = rec.flip.querySelector('.rocker');
    if (!fresh || !rec.hitEl) return;
    const bb = measureSprite(fresh);
    const pad = 18;
    const rx = Math.max(65, bb.width / 2 + pad);
    const ry = Math.max(65, bb.height / 2 + pad);
    for (const [el, shrink] of [[rec.hitEl, 0], [rec.ringEl, 8]]) {
      el.setAttribute('cx', bb.x + bb.width / 2);
      el.setAttribute('cy', bb.y + bb.height / 2);
      el.setAttribute('rx', rx - shrink); el.setAttribute('ry', ry - shrink);
    }
  }

  function addProp(id, opts) {
    const { svg, x, y, scale = 1, label, tappable = false, onTap = null, hitR = 90, layer = null } = opts;
    const outer = gEl(tappable ? 'prop tappable' : 'prop', `translate(${x} ${y}) scale(${scale})`);
    outer.dataset.id = id;
    outer.innerHTML = svg;
    if (tappable) {
      outer.setAttribute('role', 'button');
      outer.setAttribute('tabindex', '0');
      outer.setAttribute('aria-label', label || id);
      const hit = document.createElementNS(SVGNS, 'circle');
      hit.setAttribute('cx', 0); hit.setAttribute('cy', -hitR * 0.5);
      hit.setAttribute('r', hitR);
      hit.setAttribute('style', 'fill:transparent');
      outer.appendChild(hit);
      const halo = document.createElementNS(SVGNS, 'circle');
      halo.setAttribute('class', 'shimmer-halo');
      halo.setAttribute('cx', 0); halo.setAttribute('cy', -hitR * 0.5);
      halo.setAttribute('r', hitR * 0.85);
      halo.setAttribute('style', `fill:none;stroke:${Art.C.coral};stroke-width:12`);
      outer.appendChild(halo);
      bindTap(outer, () => onPropTap(id));
    }
    (layer || layerCurrent()).appendChild(outer);
    const rec = { id, el: outer, x, y, scale, label, onTap };
    state.props[id] = rec;
    return rec;
  }

  function bindTap(el, fn) {
    el.addEventListener('pointerdown', (e) => { e.stopPropagation(); noteActivity(); fn(); });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); noteActivity(); fn(); }
    });
  }

  /* ---------------- the two-tap grammar ---------------- */

  function selectChar(id) {
    if (state.selected && state.chars[state.selected]) {
      state.chars[state.selected].el.classList.remove('selected');
    }
    state.selected = id;
    if (id && state.chars[id]) state.chars[id].el.classList.add('selected');
  }

  async function onCharTap(id) {
    if (state.busy) return;
    const rec = state.chars[id];
    if (!rec) return;

    // who-then-WHO: a selected friend can act on another friend
    if (state.selected && state.selected !== id) {
      const key = `${state.selected}>${id}`;
      if (state.pairs[key]) {
        state.busy = true;
        try { await state.pairs[key](); } finally { state.busy = false; }
        return;
      }
    }
    selectChar(id);
    // one tap always responds: cycle through randomised in-place reactions
    if (rec.reactions.length) {
      const ix = Math.floor(Math.random() * rec.reactions.length);
      const r = rec.reactions[ix === rec.reactIx && rec.reactions.length > 1
        ? (ix + 1) % rec.reactions.length : ix];
      rec.reactIx = ix;
      try { await r(rec); } catch (e) {}
    }
  }

  async function onPropTap(id) {
    if (state.busy) return;
    const rec = state.props[id];
    if (!rec) return;
    if (state.selected) {
      const key = `${state.selected}>${id}`;
      if (state.pairs[key]) {
        state.busy = true;
        try { await state.pairs[key](); } finally { state.busy = false; }
        return;
      }
    }
    // prop touched on its own always responds too
    if (rec.onTap) { try { await rec.onTap(rec); } catch (e) {} }
    else animOnce(rec.el, 'wiggle-once', 900);
  }

  function pair(key, fn) { state.pairs[key] = fn; }

  /* ---------------- movement ---------------- */

  function faceToward(rec, tx) {
    const dir = tx >= rec.x ? 1 : -1;
    if (dir !== rec.facing) {
      rec.facing = dir;
      rec.flip.setAttribute('transform', `scale(${rec.scale * dir} ${rec.scale})`);
    }
  }

  function walkTo(rec, tx, ty, dur = null) {
    faceToward(rec, tx);
    const dist = Math.hypot(tx - rec.x, ty - rec.y);
    const t = dur || Math.max(0.9, Math.min(3.4, dist / 260));
    rec.el.classList.add('walking');
    rec.el.style.transitionDuration = `${t}s`;
    rec.el.setAttribute('transform', `translate(${tx} ${ty})`);
    rec.x = tx; rec.y = ty;
    return wait(t * 1000 + 60).then(() => rec.el.classList.remove('walking'));
  }

  function placeAt(rec, tx, ty) {
    rec.el.style.transitionDuration = '0s';
    rec.el.setAttribute('transform', `translate(${tx} ${ty})`);
    rec.x = tx; rec.y = ty;
    void rec.el.getBoundingClientRect();
    rec.el.style.transitionDuration = '';
  }

  /* ---------------- bubbles: symbols and bill-pictures ---------------- */

  function showBubble(worldX, worldY, html, { word = null, dur = 2600, picture = false } = {}) {
    const layer = document.getElementById('bubble-layer');
    const p = toScreen(worldX, worldY);
    const b = document.createElement('div');
    b.className = 'bubble' + (picture ? ' picture' : '');
    b.innerHTML = html + (word ? `<span class="bubble-word">${word}</span>` : '');
    b.style.left = `${p.x - (picture ? 95 : 59)}px`;
    b.style.top = `${p.y - (picture ? 170 : 150)}px`;
    layer.appendChild(b);
    requestAnimationFrame(() => b.classList.add('shown'));
    return wait(dur).then(() => {
      b.classList.add('leaving');
      return wait(700).then(() => b.remove());
    });
  }

  // Will speaks: soft click, symbol floats up from the phone, gentle voice
  function willSays(symbolKey) {
    const w = state.chars.will;
    if (!w) return Promise.resolve();
    GameAudio.play('phoneClick');
    const word = Art.symbolWords[symbolKey] || symbolKey;
    GameAudio.say(word);
    const phone = w.el.querySelector('.phone');
    if (phone) animOnce(phone, 'hop-once', 700);
    return showBubble(w.x, w.y - 190 * w.scale, Art.symbols[symbolKey], { word });
  }

  // Pearl delivers news: bill opens, a small picture floats out
  function pearlShows(pictureKey) {
    const p = state.chars.pearl;
    if (!p) return Promise.resolve();
    GameAudio.play('billClap');
    const bill = p.el.querySelector('.bill');
    if (bill) animOnce(bill, 'wiggle-once', 900);
    return showBubble(p.x, p.y - 160 * p.scale, Art.billPictures[pictureKey], { dur: 3600, picture: true });
  }

  /* ---------------- stickers ---------------- */

  function hasSticker(key) { return save.stickers.includes(key); }

  async function awardSticker(key, worldX, worldY) {
    if (hasSticker(key)) return;
    save.stickers.push(key);
    persist();
    GameAudio.play('found');
    const st = Art.stickers[key];
    await showBubble(worldX, worldY, st.svg, { dur: 2200 });
    document.getElementById('btn-stickers').hidden = false;
  }

  /* ---------------- idle shimmer (never nags) ---------------- */

  let idleTimer = null;
  let shimmerNode = null;

  function noteActivity() {
    if (shimmerNode) { shimmerNode.classList.remove('shimmering'); shimmerNode = null; }
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(idleShimmer, 10000);
  }

  function idleShimmer() {
    if (state.busy) { noteActivity(); return; }
    // prefer the scene's own gentle hint, else any tappable thing
    let target = null;
    for (const id of state.hintIds) {
      const r = state.props[id] || state.chars[id];
      if (r && r.el.isConnected) { target = r.el; break; }
    }
    if (!target) {
      const all = [...Object.values(state.chars), ...Object.values(state.props)]
        .filter(r => r.el.classList.contains('tappable') && r.el.isConnected);
      if (all.length) target = all[Math.floor(Math.random() * all.length)].el;
    }
    if (target) {
      shimmerNode = target;
      target.classList.add('shimmering');
      setTimeout(() => { if (shimmerNode === target) target.classList.remove('shimmering'); }, 6000);
    }
    idleTimer = setTimeout(idleShimmer, 14000);
  }

  /* ---------------- scenes ---------------- */

  const sceneRegistry = {};
  function registerScene(id, def) { sceneRegistry[id] = def; }

  async function loadScene(id, params = {}) {
    const def = sceneRegistry[id];
    if (!def) return;
    state.busy = true;

    // slow cross-fade, >= 1s — a hard rule
    const oldLayer = layerOld();
    const curLayer = layerCurrent();
    oldLayer.innerHTML = '';
    while (curLayer.firstChild) oldLayer.appendChild(curLayer.firstChild);
    oldLayer.classList.remove('scene-hidden');
    curLayer.classList.add('scene-hidden');

    // reset registries
    state.chars = {}; state.props = {}; state.pairs = {}; state.hintIds = [];
    selectChar(null);
    state.sceneId = id;
    document.getElementById('bubble-layer').innerHTML = '';

    if (!save.visited.includes(id)) { save.visited.push(id); persist(); }

    await def.build(params);      // scene builds into layerCurrent

    requestAnimationFrame(() => {
      curLayer.classList.remove('scene-hidden');
      oldLayer.classList.add('scene-hidden');
    });
    await wait(1350);
    oldLayer.innerHTML = '';
    state.busy = false;
    noteActivity();
    if (def.ambient) GameAudio.startAmbient(def.ambient);
    if (def.intro) { state.busy = true; try { await def.intro(params); } finally { state.busy = false; } }
  }

  function setHints(ids) { state.hintIds = ids; }

  function background(svgString) {
    const g = gEl('scene-bg');
    g.innerHTML = svgString;
    layerCurrent().appendChild(g);
    return g;
  }

  return {
    save, persist, state, wait, animOnce, toScreen,
    addChar, addProp, setPose, pair, selectChar, walkTo, placeAt, faceToward,
    showBubble, willSays, pearlShows, awardSticker, hasSticker,
    registerScene, loadScene, setHints, background, noteActivity,
    gEl,
  };
})();
