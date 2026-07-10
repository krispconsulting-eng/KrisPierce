/* =========================================================================
   Main — title screen, HUD, overlays, settings. No menus in play.
   ========================================================================= */

(() => {
  const E = Engine;
  const $ = (id) => document.getElementById(id);

  /* ---------------- title ---------------- */

  $('title-art').innerHTML = Art.titleArt();

  $('btn-play').addEventListener('pointerdown', async () => {
    GameAudio.resume();                       // audio may only start on a gesture
    applySettings();
    $('title-screen').classList.add('fading');
    $('stage-wrap').hidden = false;
    setTimeout(() => { $('title-screen').remove(); }, 1300);

    if (E.save.stickers.length) $('btn-stickers').hidden = false;
    if (E.save.storyDone) $('btn-map').hidden = false;

    // resume where the story left off; a finished story opens the farm
    const startId = E.save.storyDone
      ? 'farm'
      : Scenes.ORDER[Math.min(E.save.sceneIndex, Scenes.ORDER.length - 1)];
    await E.loadScene(startId, E.save.storyDone ? { mode: 'freeplay' } : {});
  }, { once: true });

  /* ---------------- settings ---------------- */

  function applySettings() {
    const s = E.save.settings;
    GameAudio.setAmbientLevel(s.ambient / 100);
    GameAudio.setEffectsLevel(s.effects / 100);
    document.body.classList.toggle('motion-minimal', s.motion <= 33);
    document.body.classList.toggle('motion-gentle', s.motion > 33 && s.motion <= 66);
    document.body.classList.toggle('big-shimmer', !!s.bigShimmer);
    $('set-ambient').value = s.ambient;
    $('set-effects').value = s.effects;
    $('set-motion').value = s.motion;
    $('set-shimmer').checked = !!s.bigShimmer;
  }

  $('set-ambient').addEventListener('input', (e) => {
    E.save.settings.ambient = +e.target.value; E.persist();
    GameAudio.setAmbientLevel(+e.target.value / 100);
  });
  $('set-effects').addEventListener('input', (e) => {
    E.save.settings.effects = +e.target.value; E.persist();
    GameAudio.setEffectsLevel(+e.target.value / 100);
  });
  $('set-motion').addEventListener('input', (e) => {
    E.save.settings.motion = +e.target.value; E.persist();
    applySettings();
  });
  $('set-shimmer').addEventListener('change', (e) => {
    E.save.settings.bigShimmer = e.target.checked; E.persist();
    applySettings();
  });

  $('btn-restart').addEventListener('click', async () => {
    E.save.sceneIndex = 0;
    E.save.storyDone = false;
    E.persist();
    closeOverlay('grownups-overlay');
    $('btn-map').hidden = true;
    await E.loadScene('farm', { mode: 'opening' });
  });

  /* ---------------- overlays ---------------- */

  function openOverlay(id) {
    GameAudio.play('page');
    $(id).hidden = false;
  }
  function closeOverlay(id) { $(id).hidden = true; }

  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => closeOverlay(btn.dataset.close));
  });
  document.querySelectorAll('.overlay').forEach(ov => {
    ov.addEventListener('pointerdown', (e) => { if (e.target === ov) ov.hidden = true; });
  });

  /* ---------------- sticker book ---------------- */

  const STICKER_ORDER = ['fluff', 'feather', 'apple', 'hairtie', 'shell'];

  $('btn-stickers').addEventListener('click', () => {
    const grid = $('sticker-grid');
    grid.innerHTML = '';
    STICKER_ORDER.forEach(key => {
      const btn = document.createElement('button');
      const have = E.hasSticker(key);
      btn.className = 'sticker-slot' + (have ? '' : ' empty');
      btn.setAttribute('aria-label', have ? Art.stickers[key].label : 'Not found yet');
      btn.innerHTML = have ? Art.stickers[key].svg : '<span class="slot-dash"></span>';
      if (have) {
        btn.addEventListener('click', () => { GameAudio.play('found'); });
      }
      grid.appendChild(btn);
    });
    openOverlay('stickers-overlay');
  });

  /* ---------------- farm map (free play) ---------------- */

  $('btn-map').addEventListener('click', () => {
    const grid = $('map-grid');
    grid.innerHTML = '';
    Scenes.ORDER.forEach(id => {
      const visited = E.save.visited.includes(id) || E.save.storyDone;
      const tile = document.createElement('button');
      tile.className = 'map-tile' + (visited ? '' : ' locked');
      tile.setAttribute('aria-label', Scenes.SCENE_NAMES[id]);
      tile.innerHTML = Scenes.THUMBS[id];
      if (visited) {
        tile.addEventListener('click', async () => {
          closeOverlay('map-overlay');
          await E.loadScene(id, id === 'farm' ? { mode: 'freeplay' } : {});
        });
      }
      grid.appendChild(tile);
    });
    openOverlay('map-overlay');
  });

  /* ---------------- grown-ups gate: press and hold ---------------- */

  let holdTimer = null;
  const gu = $('btn-grownups');
  gu.addEventListener('pointerdown', () => {
    holdTimer = setTimeout(() => openOverlay('grownups-overlay'), 1400);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev =>
    gu.addEventListener(ev, () => clearTimeout(holdTimer)));
  // keyboard users shouldn't be locked out of settings
  gu.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') openOverlay('grownups-overlay');
  });

  /* ---------------- global activity for the idle shimmer ---------------- */

  document.addEventListener('pointerdown', () => E.noteActivity(), { passive: true });
})();
