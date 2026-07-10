// Batch D — spreads 12–14: the rescue, the shake-and-sorry, home at night.
window.Scenes = window.Scenes || {};

/* ---------- Spread 12 — the rescue (the hush page) ---------- */
window.Scenes.s12 = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.dayTop, C.dayBottom)}
    ${A.put(260, 315, 0.8, false, A.cloudPuff(1, 0.45))}
    ${A.put(1370, 300, 0.9, false, A.cloudPuff(1, 0.4))}
    ${A.hills([{ y: 440, color: C.paddockPale, bulge: 60 }, { y: 500, color: C.paddockLight, bulge: 80 }])}
    ${A.ground(555, C.paddock)}

    <!-- distant fence behind the pulled-back crowd -->
    ${A.put(-30, 596, 0.55, false, A.fence(560))}

    <!-- the dam, right page -->
    ${A.put(1150, 705, 1, false, A.dam(720, 170))}
    ${A.put(1495, 762, 0.9, false, A.reeds(4, 90))}
    ${A.put(905, 786, 0.85, false, A.reeds(4, 100))}
    ${A.put(985, 792, 1, false, A.mudPatch(280, 42))}
    ${A.put(690, 782, 1, false, A.hoofprints(3, 56, -4, 0, 0.35))}

    <!-- the crowd, small and still on the left edge -->
    ${A.put(75, 648, 0.6, false, A.neighbour('stand'))}
    <g opacity="0.9">${A.put(145, 640, 0.55, false, A.neighbour('stand'))}</g>
    ${A.put(270, 656, 0.6, false, A.cow('freddie', 'stand', { mood: 'calm' }))}
    ${A.put(400, 662, 0.58, false, A.cleo('sit'))}

    <!-- Will, the offered hay, and the held breath -->
    ${A.put(555, 715, 1.05, false, A.will('offer', 'calm'))}

    <!-- Rocky, mid-emergence: front rising toward the hay, rear still deep -->
    <g transform="rotate(8 1160 728)">
      ${A.put(1160, 728, 0.98, true, A.cow('rocky', 'stuck', { mood: 'calm', wet: true, weed: true }))}
    </g>
    <!-- wet mud line on his flank -->
    <ellipse cx="1220" cy="668" rx="70" ry="14" fill="${C.mudWet}" opacity="0.4"/>
    <ellipse cx="1150" cy="690" rx="55" ry="11" fill="${C.mudWet}" opacity="0.35"/>
    <!-- mud + water drawn OVER only his lowest part -->
    <ellipse cx="1330" cy="692" rx="200" ry="42" fill="${C.dam}"/>
    <ellipse cx="1360" cy="698" rx="120" ry="24" fill="${C.damDeep}" opacity="0.6"/>
    <ellipse cx="1010" cy="722" rx="175" ry="27" fill="${C.dam}"/>
    <ellipse cx="1150" cy="718" rx="130" ry="22" fill="${C.dam}"/>
    <path d="M930 708 q42 10 84 2 M1250 682 q42 9 84 1 M1030 734 q34 8 68 1 M1130 704 q30 8 60 1"
          stroke="${C.damEdge}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/>
    <ellipse cx="965" cy="742" rx="90" ry="15" fill="${C.mudWet}" opacity="0.55"/>
    <!-- one heavy hoof at a time: the front leg out of the water, onto the bank -->
    <path d="M1010 734 q-8 -42 -26 -42 q-18 0 -18 38" stroke="${C.rockyDark}" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path d="M946 728 q22 10 44 3 M990 738 q20 8 40 2" stroke="${C.damEdge}" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.85"/>
    ${A.mudSplats([[1032, 706, 6], [1235, 672, 5], [1290, 690, 5]])}

    <!-- foreground -->
    ${A.put(120, 792, 1.2, false, A.grassTuft(1))}
    ${A.put(470, 796, 1.05, false, A.grassTuft(1))}
    ${A.put(1560, 794, 1.1, false, A.grassTuft(1))}
  </svg>`;
};

/* ---------- Spread 13 — the shake and the sorry (golden hour) ---------- */
window.Scenes.s13 = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.goldTop, C.goldBottom)}
    ${A.sun(165, 150, 56)}
    ${A.hills([{ y: 445, color: C.paddockPale, bulge: 70 }, { y: 505, color: C.paddockLight, bulge: 85 }])}
    ${A.ground(555, C.paddock)}
    ${A.dirtTrack(640, 1230, 568, 300, 40)}
    ${A.birds(1250, 195)}

    <!-- RIGHT beat: the sorry, small down the track -->
    ${A.put(1445, 638, 0.58, true, A.neighbour('hips'))}
    ${A.put(1450, 705, 0.58, false, A.lettucePatch(3, 6, [1]))}
    ${A.put(1230, 632, 0.62, false, A.will('walk', 'calm'))}
    ${A.put(1055, 640, 0.6, false, A.cow('rocky', 'walk', { mood: 'smug', weed: true }))}

    <!-- LEFT beat: the shake -->
    <ellipse cx="365" cy="716" rx="140" ry="16" fill="${C.grassDark}" opacity="0.14"/>
    <ellipse cx="640" cy="710" rx="46" ry="11" fill="${C.grassDark}" opacity="0.14"/>
    <ellipse cx="115" cy="704" rx="42" ry="10" fill="${C.grassDark}" opacity="0.14"/>
    ${A.put(115, 700, 0.9, false, A.neighbour('flap'))}
    ${A.put(365, 712, 1, false, A.cow('rocky', 'shake', { mood: 'smug', wet: true, weed: true, mudSpots: true }))}
    ${A.put(640, 706, 1, true, A.will('stand', 'amused'))}
    <!-- one mud dot on the tee, never distressed -->
    <circle cx="652" cy="578" r="5" fill="${C.mud}"/>
    <circle cx="630" cy="548" r="3.5" fill="${C.mud}"/>
    <!-- a splat caught on the neighbour's shielded hat -->
    <circle cx="122" cy="522" r="5" fill="${C.mud}"/>

    <!-- Cleo springing away, foreground -->
    <ellipse cx="485" cy="796" rx="58" ry="10" fill="${C.grassDark}" opacity="0.14"/>
    ${A.put(480, 792, 0.95, false, A.cleo('run'))}

    <!-- extra mud flying, plus what already landed -->
    ${A.mudSplats([[175, 505, 7], [240, 468, 6], [330, 440, 6], [470, 452, 7], [560, 505, 6], [608, 574, 5], [140, 583, 6], [660, 645, 4]])}
    ${A.mudSplats([[212, 748, 9], [305, 762, 11], [432, 754, 9], [545, 744, 7]])}

    ${A.put(60, 790, 1.2, false, A.grassTuft(1))}
    ${A.put(730, 796, 1.05, false, A.grassTuft(1))}
    ${A.put(1565, 792, 1.1, false, A.grassTuft(1))}
  </svg>`;
};

/* ---------- Spread 14 — home (night) ---------- */
window.Scenes.s14 = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.nightTop, C.nightBottom)}
    ${A.stars(24, 830, 1560, 30, 200, 11)}
    ${A.stars(7, 70, 660, 55, 195, 5)}
    ${A.moon(965, 115, 42)}
    ${A.hills([{ y: 450, color: '#3D5034', bulge: 70 }, { y: 515, color: '#455C3C', bulge: 90 }])}
    ${A.ground(585, '#506A42')}
    <g opacity="0.5">${A.dirtTrack(500, 1200, 505, 300, 34)}</g>

    <!-- the farmhouse, warm windows -->
    ${A.put(1125, 470, 0.85, false, A.farmhouseNight(1))}
    <ellipse cx="1288" cy="372" rx="58" ry="40" fill="#F2D9A0" opacity="0.12"/>
    <ellipse cx="1360" cy="374" rx="44" ry="34" fill="#F2D9A0" opacity="0.11"/>
    <ellipse cx="1300" cy="490" rx="110" ry="15" fill="#F2D9A0" opacity="0.08"/>

    <!-- the night count -->
    <ellipse cx="360" cy="718" rx="86" ry="12" fill="#2F4028" opacity="0.35"/>
    <ellipse cx="450" cy="714" rx="46" ry="11" fill="#2F4028" opacity="0.35"/>
    <ellipse cx="1050" cy="730" rx="130" ry="15" fill="#2F4028" opacity="0.35"/>
    <ellipse cx="1445" cy="750" rx="130" ry="15" fill="#2F4028" opacity="0.35"/>
    ${A.put(338, 714, 1, false, A.cleo('flop'))}
    ${A.put(436, 712, 1.05, false, A.will('type', 'calm'))}
    ${A.put(1045, 726, 0.92, true, A.cow('rocky', 'stand', { mood: 'smug', weed: true }))}
    ${A.put(1445, 748, 0.9, true, A.cow('freddie', 'graze', { mood: 'calm' }))}

    <g opacity="0.55">
      ${A.put(150, 790, 1.15, false, A.grassTuft(1))}
      ${A.put(700, 795, 1, false, A.grassTuft(1))}
      ${A.put(1540, 790, 1.1, false, A.grassTuft(1))}
    </g>
  </svg>`;
};
