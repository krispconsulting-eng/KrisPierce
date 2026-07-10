// Batch C — spreads 9–11: the dam reveal, the flapping crowd, the fear beat.
window.Scenes = window.Scenes || {};

(() => {
  const A = BookArt, C = A.C;

  // Water surface drawn OVER stuck-Rocky so he reads belly-deep.
  // (cx, cy, w, h) must match the dam() call and its placement; wl = canvas y
  // of the waterline; rx0 = ripple-ring centre x (Rocky's x). Everything is
  // clipped to the dam's water ellipse so the banks stay untouched.
  const waterOver = (cx, cy, w, h, wl, rx0, o = {}) => {
    const rx = w / 2, ry = h / 2, clip = A.id('wl');
    const bottom = cy + ry;
    let rings = '';
    const n = o.rings ?? 2;
    for (let i = 0; i < n; i++) {
      rings += `<ellipse cx="${rx0}" cy="${wl + 13 + i * 7}" rx="${(o.r0 ?? 105) + i * 64}" ry="${14 + i * 8}" fill="none" stroke="${C.damEdge}" stroke-width="4.5" opacity="${(0.78 - i * 0.18).toFixed(2)}"/>`;
    }
    return `<defs><clipPath id="${clip}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath></defs>
      <g clip-path="url(#${clip})">
        <rect x="${cx - rx - 4}" y="${wl}" width="${w + 8}" height="${bottom - wl + 8}" fill="${C.dam}"/>
        <ellipse cx="${cx - rx * 0.12}" cy="${(wl + bottom) / 2 + 10}" rx="${rx * 0.6}" ry="${(bottom - wl) * 0.28}" fill="${C.damDeep}" opacity="${o.deepOp ?? 0.5}"/>
        <line x1="${cx - rx}" y1="${wl + 2}" x2="${cx + rx}" y2="${wl + 2}" stroke="${C.damEdge}" stroke-width="4" opacity="0.85"/>
        ${rings}
        <path d="M${cx - rx * 0.72} ${wl + 40} q26 8 52 0 M${cx + rx * 0.4} ${wl + 52} q24 7 48 0" stroke="${C.damEdge}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.55"/>
      </g>`;
  };

  /* ---- Spread 9 — THE DAM REVEAL ------------------------------------
     Left page: the arrivals, calm (Will "I knew it", Freddie deadpan,
     Cleo foreman at the edge). Right page: the dam, Rocky belly-deep,
     deflated, weed on the crooked horn, fringe plastered.
     Quiet text zone: sky top-right above the dam. */
  window.Scenes.s09 = () => `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.dayTop, C.dayBottom)}
    ${A.sun(235, 120, 46)}
    ${A.put(470, 158, 1, false, A.cloudPuff(0.9, 0.8))}
    ${A.birds(560, 208)}
    ${A.hills([{ y: 470, color: C.paddockPale, bulge: 60 }, { y: 520, color: C.paddockLight, bulge: 85 }])}
    ${A.ground(600, C.paddock)}
    ${A.dirtTrack(250, 845, 610, 330, 64)}
    ${A.put(690, 700, 1, false, A.hoofprints(4, 56, 14, 8, 0.5))}
    ${A.put(1180, 655, 1, false, A.dam(620, 190))}
    ${A.put(925, 566, 1, false, A.reeds(4, 84))}
    ${A.put(1436, 572, 0.9, false, A.reeds(3, 56))}
    ${A.put(985, 758, 1, false, A.mudPatch(280, 50))}
    ${A.put(1360, 778, 1, false, A.mudPatch(300, 54))}
    ${A.put(1000, 748, 1, false, A.hoofprints(3, 46, 6, 38, 0.45))}
    ${A.put(1300, 780, 1, false, A.hoofprints(3, -50, 4, -24, 0.4))}
    ${A.mudSplats([[962, 740, 6], [1024, 760, 4], [1392, 748, 6], [1318, 772, 4], [1452, 714, 5]])}
    ${A.put(540, 702, 0.92, false, A.cow('freddie', 'stand', { mood: 'calm' }))}
    ${A.put(272, 708, 1.05, false, A.will('stand', 'focus'))}
    ${A.put(1245, 706, 0.98, true, A.cow('rocky', 'stuck', { mood: 'deflated', wet: true, weed: true }))}
    ${waterOver(1180, 655, 620, 190, 653, 1245)}
    ${A.put(905, 782, 1, false, A.cleo('sit'))}
    ${A.put(1508, 700, 1.05, false, A.reeds(3, 62))}
    ${A.put(120, 790, 1.4, false, A.grassTuft(1))}
    ${A.put(205, 798, 1.05, false, A.grassTuft(1))}
    ${A.put(655, 792, 1.2, false, A.grassTuft(1))}
    ${A.put(420, 794, 1, false, A.flowers(4, 130))}
  </svg>`;

  /* ---- Spread 10 — everyone tries the wrong thing -------------------
     Busy left/centre edge: Cleo barks, Freddie moos, two muted
     neighbours flap and point. Rocky sunk deeper than spread 9.
     Will apart on the right, the only still figure, watching Rocky.
     Quiet text zone: top-left sky. */
  window.Scenes.s10 = () => `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.dayTop, C.dayBottom)}
    ${A.sun(1335, 118, 44)}
    ${A.put(1170, 190, 1, false, A.cloudPuff(0.75, 0.7))}
    ${A.hills([{ y: 470, color: C.paddockPale, bulge: 60 }, { y: 520, color: C.paddockLight, bulge: 85 }])}
    ${A.ground(600, C.paddock)}
    ${A.put(1140, 660, 1, false, A.dam(640, 200))}
    ${A.put(880, 574, 1, false, A.reeds(4, 80))}
    ${A.put(1400, 578, 0.9, false, A.reeds(3, 54))}
    ${A.put(985, 774, 1, false, A.mudPatch(300, 52))}
    ${A.put(1310, 790, 1, false, A.mudPatch(260, 46))}
    ${A.put(940, 756, 1, false, A.hoofprints(3, 44, 8, 30, 0.4))}
    ${A.mudSplats([[1000, 742, 5], [1360, 756, 5], [1240, 780, 4]])}
    ${A.put(566, 650, 0.84, false, A.neighbour('point'))}
    ${A.put(692, 664, 0.88, false, A.neighbour('flap'))}
    ${A.put(352, 714, 0.95, false, A.cow('freddie', 'moo'))}
    ${A.put(604, 720, 1.05, false, A.cleo('bark'))}
    ${A.put(1195, 724, 0.98, true, A.cow('rocky', 'stuck', { mood: 'deflated', wet: true, weed: true }))}
    ${waterOver(1140, 660, 640, 200, 653, 1195, { rings: 3, r0: 95 })}
    ${A.put(1452, 706, 1, false, A.reeds(3, 58))}
    ${A.put(1540, 730, 1, true, A.will('stand', 'focus'))}
    ${A.put(95, 792, 1.3, false, A.grassTuft(1))}
    ${A.put(168, 798, 1, false, A.grassTuft(1))}
    ${A.put(255, 790, 1.15, false, A.grassTuft(1))}
  </svg>`;

  /* ---- Spread 11 — Will notices (the fear beat) ----------------------
     Intimate: crowd gone, camera close. Will left, still; Rocky right,
     stuck and SCARED — the wide white eyes. Tense water, never dark.
     Quiet text zone: upper-left sky, generous. */
  window.Scenes.s11 = () => `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.dayTop, C.dayBottom)}
    ${A.put(1300, 150, 1, false, A.cloudPuff(0.8, 0.55))}
    ${A.put(1120, 214, 1, false, A.cloudPuff(0.55, 0.45))}
    ${A.hills([{ y: 485, color: C.paddockPale, bulge: 50 }, { y: 535, color: C.paddockLight, bulge: 70 }])}
    ${A.ground(615, C.paddock)}
    ${A.put(1120, 700, 1, false, A.dam(880, 260))}
    ${A.put(742, 616, 1.15, false, A.reeds(4, 90))}
    ${A.put(1470, 606, 1, false, A.reeds(3, 60))}
    ${A.put(880, 804, 1, false, A.mudPatch(320, 56))}
    ${A.put(1400, 796, 1, false, A.mudPatch(300, 50))}
    ${A.mudSplats([[930, 786, 6], [1340, 778, 5]])}
    ${A.put(600, 770, 1.32, false, A.will('stand', 'focus'))}
    ${A.put(1160, 750, 1.32, true, A.cow('rocky', 'stuck', { mood: 'scared', wet: true, weed: true }))}
    ${waterOver(1120, 700, 880, 260, 660, 1160, { rings: 3, r0: 120, deepOp: 0.55 })}
    ${A.put(1548, 716, 1.2, false, A.reeds(3, 56))}
    ${A.put(135, 794, 1.5, false, A.grassTuft(1))}
    ${A.put(75, 788, 1.1, false, A.grassTuft(1))}
    ${A.put(700, 796, 1.3, false, A.grassTuft(1))}
  </svg>`;
})();
