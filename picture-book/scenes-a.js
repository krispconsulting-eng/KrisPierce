// TEMP smoke test — will be replaced by batch A agent.
window.Scenes = window.Scenes || {};
window.Scenes.smoke = () => {
  const A = BookArt, C = A.C;
  return `<svg viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
    ${A.sky(C.mornTop, C.mornBottom)}
    ${A.sun(1380, 130, 54)}
    ${A.hills([{y: 500, color: C.paddockPale, bulge: 70}, {y: 560, color: C.paddockLight, bulge: 90}])}
    ${A.ground(620, C.paddock)}
    ${A.put(240, 700, 1, false, A.will('stand', 'calm'))}
    ${A.put(430, 700, 1, false, A.will('type', 'focus'))}
    ${A.put(660, 720, 0.9, false, A.cow('freddie', 'stand'))}
    ${A.put(1080, 720, 0.9, false, A.cow('rocky', 'stand', {mood: 'smug'}))}
    ${A.put(1330, 700, 1, false, A.cleo('sit'))}
    ${A.put(1470, 700, 1, false, A.cleo('run'))}
    ${A.put(100, 780, 1, false, A.cleo('point'))}
    ${A.put(560, 780, 0.8, false, A.neighbour('point'))}
    ${A.put(900, 790, 0.7, false, A.cow('rocky', 'stuck', {mood: 'scared', wet: true, weed: true}))}
  </svg>`;
};
