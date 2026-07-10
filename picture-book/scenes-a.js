// Batch A — COVER + spreads 1–4 for "Will and the Missing Highland Cow".
// All characters/scenery via BookArt; scene-local details stay in-world.
window.Scenes = window.Scenes || {};

/* COVER — morning gold, whole cast on the hill. Title zone: top ~300px calm.
   Rocky front-and-centre-right mid-lean on the fence (scene stealer);
   Will beside Freddie, hand at his shoulder; Cleo foreman-sat ahead. */
window.Scenes.cover = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.mornTop, C.goldBottom, 620)}
    ${A.sun(1360, 408, 46)}
    ${A.put(240, 352, 0.8, false, A.cloudPuff(1, 0.85))}
    ${A.put(1060, 336, 0.6, false, A.cloudPuff(1, 0.75))}
    ${A.birds(640, 352)}
    ${A.hills([{ y: 445, color: C.paddockPale, bulge: 60 }, { y: 505, color: C.paddockLight, bulge: 95 }])}
    ${A.ground(600, C.paddock)}
    ${A.put(872, 744, 1.15, false, A.fence(130))}
    ${A.put(430, 715, 1, false, A.cow('freddie', 'stand'))}
    ${A.put(655, 720, 1, true, A.will('reach', 'calm'))}
    ${A.put(1030, 722, 1.05, false, A.cow('rocky', 'lean', { mood: 'smug' }))}
    ${A.put(880, 748, 1.15, false, A.fence(470))}
    ${A.put(560, 780, 1, false, A.cleo('sit'))}
    ${A.put(648, 602, 1.1, false, A.butterfly(1))}
    ${A.put(190, 788, 1, false, A.flowers(6, 220))}
    ${A.put(90, 792, 1.3, false, A.grassTuft(1))}
    ${A.put(1240, 790, 1.2, false, A.grassTuft(1))}
    ${A.put(1500, 792, 0.9, false, A.hayBale(1))}
    ${A.put(1565, 784, 1.4, false, A.grassTuft(1))}
  </svg>`;
};

/* SPREAD 1 — establishing vista. Cast small on the hill (left page),
   farmhouse on the right crest, long winding track. Quiet: top-left sky. */
window.Scenes.s01 = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.mornTop, C.mornBottom)}
    ${A.sun(1230, 200, 46)}
    ${A.put(1140, 120, 0.7, false, A.cloudPuff(1, 0.8))}
    ${A.put(730, 320, 0.5, false, A.cloudPuff(1, 0.7))}
    ${A.birds(770, 300)}
    ${A.birds(370, 330)}
    ${A.hills([{ y: 400, color: C.paddockPale, bulge: 60 }, { y: 455, color: C.paddockLight, bulge: 100 }])}
    ${A.ground(560, C.paddock)}
    ${A.put(1090, 470, 0.5, false, A.farmhouse(1))}
    ${A.put(170, 548, 0.72, false, A.gumTree(1))}
    ${A.dirtTrack(430, 1130, 482, 330, 30)}
    ${A.put(990, 662, 0.5, false, A.cow('rocky', 'lean', { mood: 'smug' }))}
    ${A.put(860, 666, 0.5, false, A.fence(560))}
    ${A.put(615, 650, 0.52, true, A.cow('freddie', 'stand'))}
    ${A.put(490, 645, 0.55, false, A.will('stand', 'calm'))}
    ${A.put(540, 674, 0.5, false, A.cleo('sit'))}
    ${A.put(120, 786, 1.4, false, A.grassTuft(1))}
    ${A.put(320, 770, 1, false, A.grassTuft(1))}
    ${A.put(1330, 786, 1, false, A.flowers(5, 160))}
    ${A.put(1510, 780, 1.3, false, A.grassTuft(1))}
  </svg>`;
};

/* SPREAD 2 — meet the cattle, THE pair-test page. Freddie big LEFT, planted
   with daisies; Rocky big RIGHT mid-boundary-test at the gate; Cleo
   supervising centre-front. Quiet: top band of sky. */
window.Scenes.s02 = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.mornTop, C.mornBottom)}
    ${A.sun(90, 338, 38)}
    ${A.put(1260, 305, 0.7, false, A.cloudPuff(1, 0.75))}
    ${A.put(640, 330, 0.5, false, A.cloudPuff(1, 0.7))}
    ${A.hills([{ y: 430, color: C.paddockPale, bulge: 70 }, { y: 490, color: C.paddockLight, bulge: 90 }])}
    ${A.ground(580, C.paddock)}
    ${A.put(930, 745, 1.3, false, A.fence(160))}
    ${A.put(360, 725, 1.25, false, A.cow('freddie', 'stand'))}
    ${A.put(330, 742, 1, false, A.flowers(4, 150))}
    ${A.put(1150, 725, 1.25, false, A.cow('rocky', 'lean', { mood: 'smug' }))}
    ${A.put(1280, 748, 1.4, false, A.gate(12))}
    <rect x="1292" y="650" width="34" height="98" rx="15" fill="${C.rockyDark}"/>
    ${A.put(640, 780, 1, false, A.cleo('bark'))}
    ${A.put(110, 790, 1.3, false, A.grassTuft(1))}
    ${A.put(880, 792, 1.1, false, A.grassTuft(1))}
    ${A.put(1560, 788, 1.3, false, A.grassTuft(1))}
  </svg>`;
};

/* SPREAD 3 — the counting ritual. Will types LEFT; roll call RIGHT:
   Cleo first (leaning to Will's leg), Freddie planted, Rocky mid-fidget
   wandering off. Low morning sun right. Quiet: top-left sky. */
window.Scenes.s03 = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.mornTop, C.mornBottom)}
    ${A.sun(1470, 250, 48)}
    ${A.birds(1000, 290)}
    ${A.put(620, 315, 0.5, false, A.cloudPuff(1, 0.7))}
    ${A.hills([{ y: 435, color: C.paddockPale, bulge: 70 }, { y: 492, color: C.paddockLight, bulge: 95 }])}
    ${A.ground(585, C.paddock)}
    ${A.put(-60, 566, 0.5, false, A.fence(3300))}
    ${A.put(400, 712, 1.05, false, A.will('type', 'calm'))}
    <g transform="rotate(-8 505 714)">${A.put(505, 714, 1, true, A.cleo('sit'))}</g>
    ${A.put(1080, 716, 1.05, true, A.cow('freddie', 'stand'))}
    ${A.put(1385, 722, 1.05, false, A.cow('rocky', 'walk', { mood: 'smug' }))}
    ${A.put(170, 786, 1, false, A.flowers(5, 170))}
    ${A.put(60, 782, 1.3, false, A.grassTuft(1))}
    ${A.put(720, 778, 0.9, false, A.grassTuft(1))}
    ${A.put(1540, 788, 1.2, false, A.grassTuft(1))}
  </svg>`;
};

/* SPREAD 4 — Tuesday: same staging as s03, minus Rocky. A flattened-grass
   Rocky-shaped gap where he stood; Cleo looks at it too. Will focus, calm.
   Quiet: top-right sky (sun swapped to the left). */
window.Scenes.s04 = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.mornTop, C.mornBottom)}
    ${A.sun(170, 250, 48)}
    ${A.birds(430, 300)}
    ${A.put(310, 330, 0.5, false, A.cloudPuff(1, 0.7))}
    ${A.hills([{ y: 435, color: C.paddockPale, bulge: 70 }, { y: 492, color: C.paddockLight, bulge: 95 }])}
    ${A.ground(585, C.paddock)}
    ${A.put(-60, 566, 0.5, false, A.fence(3300))}
    ${A.put(400, 712, 1.05, false, A.will('stand', 'focus'))}
    ${A.put(505, 714, 1, false, A.cleo('sit'))}
    ${A.put(1080, 716, 1.05, true, A.cow('freddie', 'stand'))}
    <g transform="translate(1385 712)">
      <ellipse cx="0" cy="0" rx="140" ry="26" fill="${C.grassDark}" opacity="0.5"/>
      <ellipse cx="0" cy="-2" rx="108" ry="17" fill="${C.paddockLight}" opacity="0.55"/>
      <path d="M-100 -6 q18 -7 36 -2 M-32 -13 q20 -6 38 0 M42 -10 q18 -8 36 -2 M-70 7 q16 6 34 4 M12 5 q18 6 36 3" stroke="${C.grassDark}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.75"/>
    </g>
    ${A.put(170, 786, 1, false, A.flowers(5, 170))}
    ${A.put(60, 782, 1.3, false, A.grassTuft(1))}
    ${A.put(720, 778, 0.9, false, A.grassTuft(1))}
    ${A.put(1540, 788, 1.2, false, A.grassTuft(1))}
  </svg>`;
};
