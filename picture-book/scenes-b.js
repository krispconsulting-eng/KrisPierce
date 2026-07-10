// Batch B — spreads 5–8: the noticing, setting off, the trail, the neighbour.
// Light arc: clear midday (dayTop/dayBottom) throughout.
window.Scenes = window.Scenes || {};

// ---- Spread 5 — the boy who notices things ------------------------------
// Three clues at a glance: gate ajar, hoofprinted mud, Cleo pointing.
// Quiet area: top-left sky.
window.Scenes.s05 = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.dayTop, C.dayBottom, 620)}
    ${A.sun(1270, 112, 48)}
    ${A.put(1060, 205, 0.85, false, A.cloudPuff(1, 0.75))}
    ${A.birds(1380, 250)}
    ${A.hills([{ y: 480, color: C.paddockPale, bulge: 60 }, { y: 540, color: C.paddockLight, bulge: 85 }])}
    ${A.ground(610, C.paddock)}

    <!-- fence line with the gate swinging just a little (clue 1) -->
    ${A.put(0, 622, 1, false, A.fence(520))}
    ${A.put(575, 622, 1, false, A.gate(18))}

    <!-- hoofprinted mud leading right (clue 2) -->
    ${A.put(915, 702, 1, false, A.mudPatch(300, 66))}
    <g fill="${C.mudDeep}" opacity="0.75">
      <ellipse cx="852" cy="696" rx="7" ry="9"/><ellipse cx="868" cy="696" rx="7" ry="9"/>
      <ellipse cx="912" cy="710" rx="7" ry="9"/><ellipse cx="928" cy="710" rx="7" ry="9"/>
      <ellipse cx="964" cy="694" rx="7" ry="9"/><ellipse cx="980" cy="694" rx="7" ry="9"/>
    </g>
    ${A.put(700, 688, 1, false, A.hoofprints(3, 56, 6, 8, 0.6))}
    ${A.put(1075, 712, 1, false, A.hoofprints(4, 64, 2, 2, 0.55))}

    <!-- Freddie half a beat behind Will -->
    ${A.put(150, 722, 0.92, false, A.cow('freddie', 'stand'))}
    <!-- Will: still, reading the whole scene -->
    ${A.put(408, 738, 1.05, false, A.will('stand', 'focus'))}
    <!-- Cleo at full stretch, already pointing across the paddock (clue 3) -->
    ${A.put(1265, 716, 1.05, false, A.cleo('point'))}

    ${A.put(70, 785, 1.2, false, A.grassTuft(1))}
    ${A.put(620, 792, 1.1, false, A.grassTuft(1))}
    ${A.put(1490, 780, 1.3, false, A.grassTuft(1))}
    ${A.put(1120, 788, 1, false, A.flowers(3, 90))}
  </svg>`;
};

// ---- Spread 6 — setting off ---------------------------------------------
// Momentum page: everything moves RIGHT. Cleo flat-out ahead, Will pointing,
// Freddie close behind, hoofprint trail underfoot. Quiet area: top-right sky.
window.Scenes.s06 = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.dayTop, C.dayBottom, 620)}
    ${A.sun(245, 115, 48)}
    ${A.put(520, 195, 0.8, false, A.cloudPuff(1, 0.7))}
    ${A.birds(120, 260)}
    ${A.hills([{ y: 470, color: C.paddockPale, bulge: 70 }, { y: 535, color: C.paddockLight, bulge: 95 }])}
    ${A.ground(605, C.paddock)}

    <!-- last of the home fence at the left edge -->
    ${A.put(-60, 600, 0.85, false, A.fence(240))}

    <!-- hoofprint trail underfoot, running right across both pages -->
    ${A.put(120, 762, 1, false, A.hoofprints(4, 62, -6, 6, 0.55))}
    ${A.put(430, 742, 1, false, A.hoofprints(4, 64, -4, 4, 0.55))}
    ${A.put(880, 726, 1, false, A.hoofprints(4, 66, -3, 2, 0.5))}
    ${A.put(1300, 712, 1, false, A.hoofprints(4, 68, -3, 2, 0.45))}

    <!-- Freddie came too, half a beat behind -->
    ${A.put(345, 718, 0.95, false, A.cow('freddie', 'walk'))}
    <!-- Will: the plan, pointing the way -->
    ${A.put(615, 722, 1, false, A.will('point', 'calm'))}
    <!-- Cleo flat-out in front, all four feet off the ground -->
    ${A.put(1160, 706, 1.05, false, A.cleo('run'))}

    ${A.put(90, 790, 1.2, false, A.grassTuft(1))}
    ${A.put(760, 794, 1.1, false, A.grassTuft(1))}
    ${A.put(1450, 788, 1.25, false, A.grassTuft(1))}
    ${A.put(990, 790, 1, false, A.flowers(3, 100))}
  </svg>`;
};

// ---- Spread 7 — the trail -----------------------------------------------
// Journey page, three landmarks left→right: big old tree, water tank,
// the neighbour's fence with a Rocky-sized hole (plus golden hairs).
// Trio small, mid-journey. Quiet area: sky, upper-centre.
window.Scenes.s07 = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.dayTop, C.dayBottom, 600)}
    ${A.sun(1440, 108, 44)}
    ${A.birds(1210, 220)}
    ${A.hills([{ y: 455, color: C.paddockPale, bulge: 60 }, { y: 520, color: C.paddockLight, bulge: 85 }])}
    ${A.ground(590, C.paddock)}

    <!-- landmark 1: the big old tree -->
    ${A.put(245, 655, 1.05, false, A.bigOldTree(1))}
    <!-- landmark 2: the water tank -->
    ${A.put(1090, 635, 0.95, false, A.waterTank(1))}
    <!-- landmark 3: the neighbour's fence, now with a Rocky-sized hole -->
    ${A.put(1225, 672, 1, false, A.fence(370, { hole: true }))}
    <!-- golden cow hairs caught on the snapped rails -->
    <g stroke="#B9772F" stroke-width="3.5" stroke-linecap="round" fill="none">
      <path d="M1352 606 q6 -10 14 -12"/>
      <path d="M1466 636 q8 -8 16 -8"/>
      <path d="M1448 642 q4 -12 12 -15"/>
    </g>

    <!-- hoofprint trail winding past all three -->
    ${A.put(110, 758, 1, false, A.hoofprints(4, 64, -10, 10, 0.55))}
    ${A.put(400, 712, 1, false, A.hoofprints(4, 62, -8, 8, 0.5))}
    ${A.put(690, 678, 0.9, false, A.hoofprints(4, 60, -5, 5, 0.45))}
    ${A.put(950, 656, 0.8, false, A.hoofprints(4, 58, -2, 2, 0.4))}
    ${A.put(1230, 650, 0.75, false, A.hoofprints(4, 56, 0, 0, 0.4))}

    <!-- the trio, small, mid-journey between tree and tank -->
    ${A.put(500, 615, 0.55, false, A.cow('freddie', 'walk'))}
    ${A.put(650, 612, 0.6, false, A.will('walk', 'calm'))}
    ${A.put(895, 602, 0.55, false, A.cleo('run'))}

    ${A.put(60, 788, 1.35, false, A.grassTuft(1))}
    ${A.put(560, 794, 1.2, false, A.grassTuft(1))}
    ${A.put(880, 790, 1.15, false, A.grassTuft(1))}
    ${A.put(1560, 786, 1.3, false, A.grassTuft(1))}
    ${A.put(340, 786, 1, false, A.flowers(3, 90))}
  </svg>`;
};

// ---- Spread 8 — the neighbour -------------------------------------------
// Will + Cleo + Freddie left page; neighbour pointing down-track right;
// lettuce patch with eaten gaps foreground right. Quiet area: top-left sky.
window.Scenes.s08 = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.dayTop, C.dayBottom, 620)}
    ${A.sun(1345, 108, 46)}
    ${A.put(1120, 200, 0.8, false, A.cloudPuff(1, 0.7))}
    ${A.hills([{ y: 470, color: C.paddockPale, bulge: 65 }, { y: 535, color: C.paddockLight, bulge: 90 }])}
    ${A.ground(605, C.paddock)}

    <!-- the track the neighbour points down -->
    ${A.dirtTrack(560, 1230, 505, 300, 40)}

    <!-- a hoofprint or two skirting the lettuce beds -->
    ${A.put(1250, 764, 1, false, A.hoofprints(3, 60, -8, 6, 0.5))}

    <!-- left page: the expedition, polite and still -->
    ${A.put(170, 718, 0.95, false, A.cow('freddie', 'stand'))}
    ${A.put(475, 722, 1, false, A.will('stand', 'calm'))}
    ${A.put(560, 722, 1, false, A.cleo('sit'))}

    <!-- right page: the neighbour, kind but exasperated, pointing down-track -->
    ${A.put(1145, 732, 1.02, false, A.neighbour('point'))}

    <!-- her lettuce patch, half of it gone -->
    ${A.put(1400, 790, 1, false, A.lettucePatch(3, 5, [0, 1]))}

    ${A.put(70, 786, 1.25, false, A.grassTuft(1))}
    ${A.put(700, 792, 1.1, false, A.grassTuft(1))}
    ${A.put(300, 788, 1, false, A.flowers(3, 100))}
  </svg>`;
};
