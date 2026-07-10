/* =========================================================================
   BookArt — illustration library for "Will and the Missing Highland Cow"
   digital picture-book edition.

   Conventions (BINDING for every scene):
   - Spread canvas: viewBox "0 0 1600 800" (two square pages, gutter x=800).
     Keep faces, horns and Will's phone out of x = 750..850.
   - Every character is drawn with FEET AT LOCAL (0,0), centred on x=0,
     FACING RIGHT. Place with BookArt.put(x, y, scale, flip, svg).
   - Palette anchors come from the character design brief and are
     non-negotiable: Rocky #B9772F · Freddie #7A4530 · Cleo #C99A4B ·
     collar blue #2E5FA3 (the single cool accent) · Will's tee/hair #2B2520 ·
     landscape green #55703F.
   - Canon: Will is the stillest figure in every scene, phone on lanyard as
     part of his silhouette (never spotlighted, nobody reacts to it),
     clean-shaven, head slightly tilted. Rocky: wild fringe, ONE crooked
     horn (his right / viewer's left), leads with his chest. Freddie:
     rounder, heavier, darker, tidy fringe, calm eyes VISIBLE. Cleo: blue
     collar + round tag always visible. Neighbour and extras stay muted.
   - World: green hill, dirt track, timber fencing, muddy paddock, dam.
     NO coastline, NO landmarks, NO signage. Epilepsy-safe: nothing flashes.
   ========================================================================= */

const BookArt = (() => {
  const C = {
    // paper & ink
    paper: '#FDFAF4', ink: '#2B2520', muted: '#8A7B66',
    // the four coats
    rocky: '#B9772F', rockyDark: '#8E5620', rockyLight: '#D79A52',
    freddie: '#7A4530', freddieDark: '#5A3122', freddieLight: '#99604A',
    cleo: '#C99A4B', cleoDark: '#A87A33', cleoLight: '#E2BF83',
    collar: '#2E5FA3', tag: '#D9A93E',
    // Will
    tee: '#2B2520', hair: '#2B2520', skin: '#E9B98D', skinDark: '#D6A176',
    olive: '#7A7D4E', boot: '#A9805A', bootDark: '#8A6746',
    lanyard: '#C0392B', phone: '#4A4440', phoneFace: '#EDE4D3',
    // landscape
    green: '#55703F', paddock: '#7E9A5E', paddockLight: '#95AF74',
    paddockPale: '#AFC48D', grassDark: '#647F4B',
    track: '#C4A176', trackDark: '#A9825C',
    wood: '#9C7350', woodDark: '#7C5A3E', wire: '#8B8175',
    mud: '#7C5F43', mudDeep: '#61472F', mudWet: '#8A6C4D',
    dam: '#7E8E72', damDeep: '#68785D', damEdge: '#94A184',
    weed: '#5E7A4A', weedDark: '#4C6539',
    horn: '#E8DBC2', hornStroke: '#8E7350',
    hay: '#D9B961', hayDark: '#C0A143',
    leaf: '#6E8F5B', leafDark: '#597848', leafLight: '#86A46F',
    // skies (scenes may build their own gradients with sky())
    dayTop: '#BBD4DE', dayBottom: '#E4E9D8',
    mornTop: '#C9D8DC', mornBottom: '#F2E3C8',
    goldTop: '#D9C39A', goldBottom: '#F2D9AE',
    nightTop: '#2E3A50', nightBottom: '#4A5670', star: '#F2E8C9',
    cloud: '#FDFAF4',
    // neighbour (deliberately quieter than the core four)
    nb1: '#A79582', nb2: '#8F7F6C', nbHat: '#D6BE8E', nbSkin: '#E4B78E',
    lettuce: '#8FAE62', lettuceDark: '#6E9448',
  };

  let uid = 0;
  const id = (p) => `${p}-${++uid}`;

  /* ---------- placement helpers ---------- */

  // Place a character/prop: x,y = where its local (0,0) lands on the canvas.
  function put(x, y, scale = 1, flip = false, svg = '') {
    const f = flip ? ' scale(-1,1)' : '';
    return `<g transform="translate(${x} ${y}) scale(${scale})${f}">${svg}</g>`;
  }

  // Vertical sky gradient covering the whole spread.
  function sky(top, bottom, h = 560) {
    const g = id('sky');
    return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/>
      </linearGradient></defs>
      <rect x="0" y="0" width="1600" height="${h}" fill="url(#${g})"/>`;
  }

  function sun(x, y, r = 52, color = '#F2DFA7') {
    return `<circle cx="${x}" cy="${y}" r="${r * 1.9}" fill="${color}" opacity="0.28"/>
            <circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="0.95"/>`;
  }

  function moon(x, y, r = 42) {
    return `<circle cx="${x}" cy="${y}" r="${r * 1.8}" fill="${C.star}" opacity="0.12"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="${C.star}"/>
      <circle cx="${x + r * 0.42}" cy="${y - r * 0.18}" r="${r * 0.82}" fill="${C.nightTop}" opacity="0.92"/>`;
  }

  function stars(n = 26, x0 = 0, x1 = 1600, y0 = 20, y1 = 300, seed = 7) {
    let s = seed, out = '';
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < n; i++) {
      const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0);
      const r = 1.4 + rnd() * 1.8;
      out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${C.star}" opacity="${(0.5 + rnd() * 0.5).toFixed(2)}"/>`;
    }
    return out;
  }

  // Rolling paddock: layered hill bands. bands = [{y, color, bulge}]
  function hills(bands) {
    return bands.map(b => {
      const bulge = b.bulge ?? 90;
      return `<path d="M0 ${b.y + 40} Q 400 ${b.y - bulge} 800 ${b.y} T 1600 ${b.y - bulge * 0.4} L1600 800 L0 800 Z" fill="${b.color}"/>`;
    }).join('');
  }

  // Flat ground band from y to bottom.
  function ground(y, color) {
    return `<rect x="0" y="${y}" width="1600" height="${800 - y}" fill="${color}"/>`;
  }

  // A winding dirt track. from/to are x positions at bottom/horizon.
  function dirtTrack(xBottom = 500, xHorizon = 900, yHorizon = 470, wBottom = 340, wTop = 36) {
    const midX = (xBottom + xHorizon) / 2 + 90, midY = (800 + yHorizon) / 2;
    return `<path d="M${xBottom - wBottom / 2} 800
        Q ${midX - wBottom / 3} ${midY} ${xHorizon - wTop / 2} ${yHorizon}
        L ${xHorizon + wTop / 2} ${yHorizon}
        Q ${midX + wBottom / 3} ${midY} ${xBottom + wBottom / 2} 800 Z" fill="${C.track}"/>
      <path d="M${xBottom - wBottom * 0.16} 800 Q ${midX} ${midY + 30} ${xHorizon - 2} ${yHorizon + 14}" stroke="${C.trackDark}" stroke-width="7" fill="none" opacity="0.5" stroke-linecap="round" stroke-dasharray="26 34"/>
      <path d="M${xBottom + wBottom * 0.16} 800 Q ${midX + 40} ${midY + 40} ${xHorizon + 6} ${yHorizon + 16}" stroke="${C.trackDark}" stroke-width="7" fill="none" opacity="0.4" stroke-linecap="round" stroke-dasharray="20 40"/>`;
  }

  /* ---------- the cast ---------- */

  // WILL — the boy who notices things. ~206 tall. Feet at (0,0), faces right.
  // pose: 'stand' | 'walk' | 'type' | 'point' | 'offer' | 'reach'
  // mood: 'calm' | 'focus' | 'amused'
  function will(pose = 'stand', mood = 'calm') {
    const mouth = mood === 'focus'
      ? `<path d="M-5 -166 l11 0" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`
      : mood === 'amused'
        ? `<path d="M-6 -167 q7 6 14 -1" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`
        : `<path d="M-6 -166 q6 5 13 0" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;

    const head = `
      <g transform="rotate(-6 0 -172)">
        <circle cx="0" cy="-180" r="26" fill="${C.skin}"/>
        <path d="M-26 -184 q2 -24 26 -24 q24 0 26 24 q-12 -12 -26 -10 q-14 -2 -26 10Z" fill="${C.hair}"/>
        <circle cx="-8" cy="-180" r="3.2" fill="${C.ink}"/>
        <circle cx="9" cy="-180" r="3.2" fill="${C.ink}"/>
        ${mouth}
      </g>`;

    // lanyard + phone: part of his silhouette in EVERY pose
    const lanyardHang = `
      <path d="M-12 -158 q12 10 24 0 l-9 38 -6 0Z" fill="none" stroke="${C.lanyard}" stroke-width="4"/>
      <rect x="-11" y="-121" width="22" height="30" rx="5" fill="${C.phone}"/>
      <rect x="-7.5" y="-117" width="15" height="20" rx="3" fill="${C.phoneFace}"/>`;
    // phone held in both hands at chest (typing / reading)
    const lanyardHeld = `
      <path d="M-12 -158 q12 8 24 0 l-6 16 -10 0Z" fill="none" stroke="${C.lanyard}" stroke-width="4"/>
      <rect x="-13" y="-142" width="26" height="34" rx="5" fill="${C.phone}" transform="rotate(-14 0 -125)"/>
      <rect x="-9" y="-138" width="18" height="24" rx="3" fill="${C.phoneFace}" transform="rotate(-14 0 -125)"/>`;

    const legsStand = `
      <path d="M-24 -26 l0 18 q0 8 10 8 l12 0 0 -26Z" fill="${C.boot}"/>
      <path d="M4 -26 l0 18 q0 8 10 8 l12 0 0 -26Z" fill="${C.boot}"/>
      <rect x="-22" y="-66" width="18" height="44" rx="8" fill="${C.skin}"/>
      <rect x="6" y="-66" width="18" height="44" rx="8" fill="${C.skin}"/>`;
    const legsWalk = `
      <path d="M-36 -22 l0 14 q0 8 10 8 l12 0 0 -22Z" fill="${C.boot}"/>
      <path d="M16 -30 l0 22 q0 8 10 8 l12 0 0 -26Z" fill="${C.boot}"/>
      <rect x="-34" y="-64" width="18" height="46" rx="8" fill="${C.skin}" transform="rotate(9 -25 -42)"/>
      <rect x="16" y="-66" width="18" height="42" rx="8" fill="${C.skin}" transform="rotate(-10 25 -44)"/>`;

    const shorts = `<path d="M-26 -104 l54 0 0 30 q0 8 -8 8 l-12 0 -6 -18 -6 18 -14 0 q-8 0 -8 -8Z" fill="${C.olive}"/>`;
    const crown = `<path d="M-11 -132 l3.5 -9 4.5 7 4.5 -10 4.5 10 4.5 -7 3.5 9 q-12.5 6 -25 0Z" fill="${C.tag}" transform="translate(0 -6)"/>`;
    const torsoBase = `<path d="M-26 -156 q26 -12 52 0 l6 54 -64 0Z" fill="${C.tee}"/>`;

    let arms, lanyard = lanyardHang;
    switch (pose) {
      case 'type':
        arms = `<path d="M-26 -150 q-14 16 -4 30 q6 8 16 4" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>
                <path d="M26 -150 q14 16 4 30 q-6 8 -16 4" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>
                <circle cx="-12" cy="-118" r="7" fill="${C.skin}"/>
                <circle cx="12" cy="-118" r="7" fill="${C.skin}"/>`;
        lanyard = lanyardHeld;
        break;
      case 'point':
        arms = `<path d="M-26 -150 q-16 24 -8 52 q2 8 10 6" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>
                <path d="M22 -148 q28 -4 52 -14" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>
                <circle cx="78" cy="-164" r="8" fill="${C.skin}"/>
                <path d="M80 -166 l16 -5" stroke="${C.skin}" stroke-width="7" stroke-linecap="round"/>`;
        break;
      case 'offer':
        arms = `<path d="M-26 -150 q-16 24 -8 52 q2 8 10 6" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>
                <path d="M22 -144 q30 6 54 2" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>
                <circle cx="80" cy="-142" r="9" fill="${C.skin}"/>
                <g transform="translate(84 -148)">
                  <path d="M-14 4 l10 -16 M-6 6 l6 -18 M2 6 l10 -16 M8 4 l14 -10" stroke="${C.hay}" stroke-width="4" stroke-linecap="round"/>
                  <path d="M-10 2 l8 -12 M6 4 l10 -12" stroke="${C.hayDark}" stroke-width="3" stroke-linecap="round"/>
                </g>`;
        break;
      case 'reach': // hand resting outward, low (on a shoulder, a rail)
        arms = `<path d="M-26 -150 q-16 24 -8 52 q2 8 10 6" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>
                <path d="M22 -144 q26 14 44 34" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>
                <circle cx="70" cy="-108" r="9" fill="${C.skin}"/>`;
        break;
      case 'walk':
        arms = `<path d="M-26 -148 q-18 18 -14 42" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>
                <path d="M26 -148 q18 20 10 46" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>
                <circle cx="-38" cy="-104" r="8" fill="${C.skin}"/>
                <circle cx="34" cy="-100" r="8" fill="${C.skin}"/>`;
        break;
      default: // stand — hands in pockets, the canon silhouette
        arms = `<path d="M-26 -150 q-16 24 -8 52 q2 8 10 6" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>
                <path d="M26 -150 q16 24 8 52 q-2 8 -10 6" stroke="${C.tee}" stroke-width="15" fill="none" stroke-linecap="round"/>`;
    }

    return `<g>
      ${pose === 'walk' ? legsWalk : legsStand}
      ${shorts}
      <g>${torsoBase}${arms}${crown}${lanyard}</g>
      ${head}
    </g>`;
  }

  // HIGHLAND COW — kind: 'rocky' | 'freddie'
  // pose: 'stand' | 'walk' | 'graze' | 'moo' | 'stuck' | 'shake' | 'lean'
  // opts: { mood: 'smug'|'deflated'|'scared'|'calm', weed: bool, wet: bool, mudSpots: bool }
  function cow(kind, pose = 'stand', opts = {}) {
    const isRocky = kind === 'rocky';
    const body = isRocky ? C.rocky : C.freddie;
    const dark = isRocky ? C.rockyDark : C.freddieDark;
    const light = isRocky ? C.rockyLight : C.freddieLight;
    const w = isRocky ? 1 : 1.12;          // Freddie rounder and heavier
    const mood = opts.mood || (isRocky ? 'smug' : 'calm');
    const wet = !!opts.wet;

    // shaggy bottom edge
    let shag = '';
    for (let i = 0; i < 8; i++) {
      const x = -108 * w + i * (27 * w);
      shag += `<path d="M${x} -78 q${10 * w} 26 ${24 * w} 2 Z" fill="${body}"/>`;
    }

    // fringes: Rocky wild (dry) / plastered (wet); Freddie tidy curtain
    const fringe = isRocky
      ? (wet
        ? `<path d="M58 -194 q40 -18 92 -6 q6 16 -8 22 q-40 12 -80 2 q-12 -8 -4 -18Z" fill="${dark}"/>
           <path d="M70 -180 q2 18 -4 26 M94 -178 q2 18 -2 26 M116 -176 q4 16 0 24" stroke="${dark}" stroke-width="8" fill="none" stroke-linecap="round"/>`
        : `<path d="M56 -196 q-14 -26 8 -34 q20 -10 34 6 q16 -12 30 2 q16 -10 26 6 q12 16 -4 26 q6 18 -12 22 q-40 12 -82 -28Z" fill="${dark}"/>
           <path d="M66 -186 q4 22 -8 30 M92 -190 q8 20 -2 32 M118 -184 q10 16 2 28" stroke="${dark}" stroke-width="9" fill="none" stroke-linecap="round"/>`)
      : `<path d="M60 -200 q42 -26 88 -2 q10 20 -6 28 q-38 14 -76 0 q-14 -10 -6 -26Z" fill="${dark}"/>
         <path d="M74 -180 q4 14 -2 22 M96 -178 q4 14 0 22 M118 -178 q4 12 -2 20" stroke="${dark}" stroke-width="8" fill="none" stroke-linecap="round"/>`;

    // eyes — Rocky's hide under the fringe UNLESS the story needs them
    let eyes = '';
    if (!isRocky) {
      eyes = `<circle cx="82" cy="-152" r="6" fill="${C.ink}"/>
              <circle cx="116" cy="-152" r="6" fill="${C.ink}"/>`;
    } else if (mood === 'scared') {
      eyes = `<circle cx="82" cy="-154" r="11" fill="${C.paper}"/>
              <circle cx="116" cy="-154" r="11" fill="${C.paper}"/>
              <circle cx="84" cy="-153" r="4.5" fill="${C.ink}"/>
              <circle cx="114" cy="-153" r="4.5" fill="${C.ink}"/>`;
    } else if (mood === 'deflated') {
      eyes = `<circle cx="84" cy="-152" r="6.5" fill="${C.ink}"/>
              <circle cx="114" cy="-152" r="6.5" fill="${C.ink}"/>
              <path d="M74 -160 l20 -3 M104 -163 l20 3" stroke="${dark}" stroke-width="5" stroke-linecap="round"/>`;
    }

    const mouths = {
      smug: `<path d="M88 -108 q12 9 24 0" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
      calm: `<path d="M90 -106 q10 7 20 0" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
      deflated: `<path d="M90 -104 q10 -6 20 0" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
      scared: `<ellipse cx="100" cy="-104" rx="8" ry="10" fill="${dark}"/>`,
      moo: `<ellipse cx="102" cy="-102" rx="11" ry="13" fill="${dark}"/>`,
    };
    const mouth = mouths[pose === 'moo' ? 'moo' : mood] || mouths.calm;

    // horns — Rocky's right horn (viewer's left) crooked, ALWAYS
    const hornL = `M66 -192 C 30 -196, 8 -212, 6 -244 C 6 -252, 14 -254, 20 -248 C 32 -226, 48 -212, 74 -208 Z`;
    const hornR = `M128 -192 C 164 -196, 186 -212, 188 -244 C 188 -252, 180 -254, 174 -248 C 162 -226, 146 -212, 120 -208 Z`;
    const horns = isRocky
      ? `<path d="${hornL}" fill="${C.horn}" stroke="${C.hornStroke}" stroke-width="3" transform="rotate(-22 66 -192)"/>
         <path d="${hornR}" fill="${C.horn}" stroke="${C.hornStroke}" stroke-width="3"/>`
      : `<path d="${hornL}" fill="${C.horn}" stroke="${C.hornStroke}" stroke-width="3"/>
         <path d="${hornR}" fill="${C.horn}" stroke="${C.hornStroke}" stroke-width="3"/>`;

    // waterweed draped off the crooked horn — Rocky's souvenir from the dam
    const weed = opts.weed
      ? `<g transform="rotate(-22 66 -192)">
           <path d="M20 -246 q-10 18 -4 40 q-8 -4 -12 -20 M20 -246 q8 22 2 44" stroke="${C.weed}" stroke-width="7" fill="none" stroke-linecap="round"/>
           <path d="M18 -240 q-14 14 -12 34" stroke="${C.weedDark}" stroke-width="5" fill="none" stroke-linecap="round"/>
         </g>`
      : '';

    const ears = `
      <ellipse cx="52" cy="-186" rx="16" ry="10" fill="${dark}" transform="rotate(-34 52 -186)"/>
      <ellipse cx="142" cy="-186" rx="16" ry="10" fill="${dark}" transform="rotate(34 142 -186)"/>`;

    const mudSpots = opts.mudSpots
      ? `<ellipse cx="${-60 * w}" cy="-120" rx="20" ry="12" fill="${C.mud}" opacity="0.55"/>
         <ellipse cx="${20 * w}" cy="-96" rx="16" ry="9" fill="${C.mud}" opacity="0.5"/>
         <ellipse cx="${70 * w}" cy="-140" rx="13" ry="8" fill="${C.mud}" opacity="0.45"/>`
      : '';

    const headInner = `${horns}${weed}${ears}
      <circle cx="97" cy="-158" r="52" fill="${body}"/>
      <ellipse cx="100" cy="-120" rx="34" ry="23" fill="${light}"/>
      <ellipse cx="88" cy="-124" rx="4" ry="6" fill="${dark}"/>
      <ellipse cx="114" cy="-124" rx="4" ry="6" fill="${dark}"/>
      ${mouth}${eyes}${fringe}`;

    // STUCK — belly-deep: no legs, sunken posture, head lower. The scene
    // draws the mud/water surface OVER the bottom of the body (y > -60).
    if (pose === 'stuck') {
      return `<g>
        <g transform="translate(0 24)">
          <ellipse cx="0" cy="-120" rx="${118 * w}" ry="66" fill="${body}"/>
          <path d="M${-110 * w} -150 q${40 * w} -30 ${110 * w} -26 q${70 * w} -6 ${104 * w} 26" fill="none" stroke="${light}" stroke-width="12" stroke-linecap="round"/>
          ${mudSpots}
          <g transform="translate(6 34)">${headInner}</g>
        </g>
      </g>`;
    }

    const legsStand = `
      <rect x="${-96 * w}" y="-74" width="26" height="76" rx="12" fill="${dark}"/>
      <rect x="${-46 * w}" y="-74" width="26" height="76" rx="12" fill="${dark}"/>
      <rect x="${28 * w}" y="-74" width="26" height="76" rx="12" fill="${dark}"/>
      <rect x="${74 * w}" y="-74" width="26" height="76" rx="12" fill="${dark}"/>`;
    const legsWalk = `
      <rect x="${-100 * w}" y="-74" width="26" height="76" rx="12" fill="${dark}" transform="rotate(10 ${-87 * w} -36)"/>
      <rect x="${-42 * w}" y="-74" width="26" height="76" rx="12" fill="${dark}" transform="rotate(-8 ${-29 * w} -36)"/>
      <rect x="${24 * w}" y="-74" width="26" height="76" rx="12" fill="${dark}" transform="rotate(9 ${37 * w} -36)"/>
      <rect x="${78 * w}" y="-74" width="26" height="76" rx="12" fill="${dark}" transform="rotate(-10 ${91 * w} -36)"/>`;

    const tail = pose === 'shake'
      ? `<path d="M${-112 * w} -150 q-40 6 -44 42" stroke="${dark}" stroke-width="12" fill="none" stroke-linecap="round"/>
         <circle cx="${-152 * w}" cy="-104" r="16" fill="${dark}"/>`
      : `<path d="M${-112 * w} -150 q-34 20 -26 62" stroke="${dark}" stroke-width="12" fill="none" stroke-linecap="round"/>
         <circle cx="${-140 * w}" cy="-84" r="16" fill="${dark}"/>`;

    // head placement per pose
    let headWrap = `<g>${headInner}</g>`;
    if (pose === 'graze') headWrap = `<g transform="translate(28 74) rotate(24)">${headInner}</g>`;
    if (pose === 'lean') headWrap = `<g transform="translate(16 18) rotate(8)">${headInner}</g>`;
    if (pose === 'shake') headWrap = `<g transform="rotate(-8 97 -158)">${headInner}</g>`;

    const chest = (isRocky && (pose === 'stand' || pose === 'lean'))
      ? `<ellipse cx="${74 * w}" cy="-120" rx="42" ry="46" fill="${body}"/>` // leads with his chest
      : '';

    const shakeSpray = pose === 'shake'
      ? `<g opacity="0.85">
           <circle cx="${-150 * w}" cy="-190" r="7" fill="${C.mud}"/><circle cx="${-96 * w}" cy="-232" r="6" fill="${C.mud}"/>
           <circle cx="${-20 * w}" cy="-252" r="7" fill="${C.mud}"/><circle cx="${52 * w}" cy="-246" r="6" fill="${C.mud}"/>
           <circle cx="${132 * w}" cy="-224" r="7" fill="${C.mud}"/><circle cx="${168 * w}" cy="-170" r="6" fill="${C.mud}"/>
           <circle cx="${-170 * w}" cy="-130" r="5" fill="${C.mud}"/><circle cx="${182 * w}" cy="-110" r="5" fill="${C.mud}"/>
         </g>`
      : '';

    return `<g>
      ${pose === 'walk' ? legsWalk : legsStand}
      ${tail}
      <g ${pose === 'shake' ? 'transform="rotate(-4)"' : ''}>
        <ellipse cx="0" cy="-138" rx="${118 * w}" ry="70" fill="${body}"/>
        <path d="M${-110 * w} -170 q${40 * w} -34 ${110 * w} -30 q${70 * w} -6 ${104 * w} 28" fill="none" stroke="${light}" stroke-width="12" stroke-linecap="round"/>
        ${chest}${shag}${mudSpots}
      </g>
      ${headWrap}
      ${shakeSpray}
    </g>`;
  }

  // CLEO — golden cocker spaniel, blue collar + round tag ALWAYS visible.
  // pose: 'sit' | 'stand' | 'point' | 'run' | 'bark' | 'flop'
  function cleo(pose = 'sit') {
    const collar = (cx, cy, rot = 0) => `
      <g transform="rotate(${rot} ${cx} ${cy})">
        <path d="M${cx - 26} ${cy} q26 14 52 2" stroke="${C.collar}" stroke-width="10" fill="none" stroke-linecap="round"/>
        <circle cx="${cx + 2}" cy="${cy + 12}" r="8" fill="${C.tag}" stroke="${C.hornStroke}" stroke-width="2"/>
      </g>`;
    const ear = (x, y, droop = 0) => `
      <path d="M${x} ${y} q-22 ${4 + droop} -24 ${40 + droop} q-2 26 12 34 q14 6 18 -12 q4 -30 -6 -62Z" fill="${C.cleoDark}"/>`;
    const earFly = (x, y) => `
      <path d="M${x} ${y} q-34 -18 -62 -14 q-6 12 6 20 q26 12 56 6Z" fill="${C.cleoDark}"/>`;

    if (pose === 'run') {
      // full extension, ears horizontal, all four feet off the ground
      return `<g>
        <g transform="translate(0 -34)">
          <ellipse cx="-6" cy="-46" rx="66" ry="30" fill="${C.cleo}"/>
          <path d="M-58 -60 q-26 -10 -38 -2 q10 14 30 12Z" fill="${C.cleoDark}"/>
          <path d="M-62 -34 q-24 12 -50 10" stroke="${C.cleo}" stroke-width="14" fill="none" stroke-linecap="round"/>
          <path d="M-44 -28 q-16 18 -36 22" stroke="${C.cleo}" stroke-width="13" fill="none" stroke-linecap="round"/>
          <path d="M40 -34 q22 10 42 6" stroke="${C.cleo}" stroke-width="14" fill="none" stroke-linecap="round"/>
          <path d="M50 -44 q26 -2 40 -14" stroke="${C.cleo}" stroke-width="13" fill="none" stroke-linecap="round"/>
          <circle cx="52" cy="-72" r="30" fill="${C.cleo}"/>
          ${earFly(34, -84)}
          <ellipse cx="78" cy="-64" rx="17" ry="12" fill="${C.cleoLight}"/>
          <ellipse cx="88" cy="-68" rx="6.5" ry="5.5" fill="${C.ink}"/>
          <circle cx="56" cy="-80" r="5" fill="${C.ink}"/>
          <path d="M70 -56 q8 6 16 1" stroke="${C.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          ${collar(28, -54, -12)}
        </g>
      </g>`;
    }

    if (pose === 'point') {
      // the pointing nose: body stretched level, tail straight back, one paw up
      return `<g>
        <path d="M-40 -46 q-4 26 0 44 l14 0 q4 -20 0 -44Z" fill="${C.cleo}"/>
        <path d="M30 -48 q-2 20 6 30 q8 6 14 -2" stroke="${C.cleo}" stroke-width="13" fill="none" stroke-linecap="round"/>
        <path d="M-66 -64 q-34 -4 -52 -12" stroke="${C.cleoDark}" stroke-width="12" fill="none" stroke-linecap="round"/>
        <ellipse cx="-6" cy="-60" rx="62" ry="28" fill="${C.cleo}"/>
        <circle cx="58" cy="-74" r="29" fill="${C.cleo}"/>
        ${ear(38, -86, -10)}
        <ellipse cx="86" cy="-70" rx="18" ry="12" fill="${C.cleoLight}"/>
        <ellipse cx="98" cy="-73" rx="7" ry="6" fill="${C.ink}"/>
        <circle cx="62" cy="-82" r="5" fill="${C.ink}"/>
        ${collar(34, -56, -8)}
      </g>`;
    }

    if (pose === 'flop') {
      // instantly boneless: sprawled flat, chin on the ground, done for the day
      return `<g>
        <ellipse cx="0" cy="-24" rx="70" ry="24" fill="${C.cleo}"/>
        <path d="M-58 -30 q-22 14 -38 10" stroke="${C.cleoDark}" stroke-width="11" fill="none" stroke-linecap="round"/>
        <path d="M34 -12 q18 4 34 2 M-30 -8 q-18 6 -34 4" stroke="${C.cleo}" stroke-width="12" fill="none" stroke-linecap="round"/>
        <circle cx="62" cy="-30" r="27" fill="${C.cleo}"/>
        ${ear(44, -40, 6)}
        <ellipse cx="86" cy="-22" rx="16" ry="11" fill="${C.cleoLight}"/>
        <ellipse cx="96" cy="-26" rx="6.5" ry="5.5" fill="${C.ink}"/>
        <path d="M62 -40 a5 5 0 0 1 10 0" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M76 -14 q8 5 16 0" stroke="${C.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        ${collar(40, -16, 10)}
      </g>`;
    }

    if (pose === 'stand' || pose === 'bark') {
      const mouthB = pose === 'bark'
        ? `<path d="M92 -96 q10 2 12 10 q-8 6 -16 0Z" fill="${C.cleoDark}"/>`
        : `<path d="M66 -86 q8 6 16 1" stroke="${C.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
      return `<g>
        <path d="M-46 -50 q-6 30 -2 48 l16 0 q4 -22 0 -46Z" fill="${C.cleo}"/>
        <path d="M26 -50 q-6 30 -2 48 l16 0 q4 -22 0 -46Z" fill="${C.cleo}"/>
        <path d="M-62 -78 q-30 -22 -24 -46" stroke="${C.cleoDark}" stroke-width="13" fill="none" stroke-linecap="round"/>
        <ellipse cx="-8" cy="-62" rx="62" ry="36" fill="${C.cleo}"/>
        <path d="M-56 -46 q-10 18 -2 34 M-36 -42 q-8 18 -2 32 M40 -44 q8 16 4 30" stroke="${C.cleoDark}" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="48" cy="-104" r="32" fill="${C.cleo}"/>
        ${ear(24, -116)}
        <ellipse cx="74" cy="-94" rx="18" ry="13" fill="${C.cleoLight}"/>
        <ellipse cx="84" cy="-98" rx="7" ry="6" fill="${C.ink}"/>
        <circle cx="52" cy="-112" r="5" fill="${C.ink}"/>
        ${mouthB}
        ${collar(22, -88)}
      </g>`;
    }

    // default: the foreman sit — chest up, head high, supervising
    return `<g>
      <path d="M-38 0 q-14 -46 8 -74 q20 -24 44 -14 q20 10 18 40 q-2 30 -10 48Z" fill="${C.cleo}"/>
      <path d="M-40 -18 q-12 10 -10 18 l52 0 q2 -10 -6 -18Z" fill="${C.cleoDark}" opacity="0.4"/>
      <path d="M8 -46 q-4 26 2 46 l14 0 q4 -24 0 -46Z" fill="${C.cleo}"/>
      <path d="M-52 -10 q-26 -8 -30 -30" stroke="${C.cleoDark}" stroke-width="12" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="-118" r="31" fill="${C.cleo}"/>
      ${ear(0, -130)}
      <ellipse cx="48" cy="-108" rx="17" ry="12" fill="${C.cleoLight}"/>
      <ellipse cx="58" cy="-112" rx="6.5" ry="5.5" fill="${C.ink}"/>
      <circle cx="26" cy="-126" r="5" fill="${C.ink}"/>
      <path d="M40 -100 q8 6 16 1" stroke="${C.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      ${collar(-2, -100, -6)}
    </g>`;
  }

  // THE NEIGHBOUR — generic, kind, deliberately quieter than the core four.
  // pose: 'stand' | 'point' | 'flap' | 'hips'
  function neighbour(pose = 'stand') {
    const head = `
      <circle cx="0" cy="-176" r="24" fill="${C.nbSkin}"/>
      <path d="M-24 -180 q4 -20 24 -20 q20 0 24 20 q-10 -8 -24 -7 q-14 -1 -24 7Z" fill="#B7A78F"/>
      <ellipse cx="0" cy="-198" rx="34" ry="9" fill="${C.nbHat}"/>
      <path d="M-16 -198 q2 -18 16 -18 q14 0 16 18Z" fill="${C.nbHat}"/>
      <circle cx="-7" cy="-176" r="3" fill="${C.ink}"/>
      <circle cx="8" cy="-176" r="3" fill="${C.ink}"/>
      <path d="M-5 -163 q5 4 11 0" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    let arms;
    if (pose === 'point') {
      arms = `<path d="M-22 -144 q-14 22 -8 46" stroke="${C.nb2}" stroke-width="14" fill="none" stroke-linecap="round"/>
              <path d="M20 -142 q26 -8 48 -22" stroke="${C.nb2}" stroke-width="14" fill="none" stroke-linecap="round"/>
              <circle cx="72" cy="-166" r="7.5" fill="${C.nbSkin}"/>
              <path d="M74 -168 l15 -6" stroke="${C.nbSkin}" stroke-width="6" stroke-linecap="round"/>`;
    } else if (pose === 'flap') {
      arms = `<path d="M-22 -146 q-24 -18 -30 -44" stroke="${C.nb2}" stroke-width="14" fill="none" stroke-linecap="round"/>
              <path d="M22 -146 q24 -20 28 -46" stroke="${C.nb2}" stroke-width="14" fill="none" stroke-linecap="round"/>
              <circle cx="-54" cy="-192" r="7.5" fill="${C.nbSkin}"/>
              <circle cx="52" cy="-194" r="7.5" fill="${C.nbSkin}"/>`;
    } else if (pose === 'hips') {
      arms = `<path d="M-22 -144 q-20 10 -12 34 l12 6" stroke="${C.nb2}" stroke-width="13" fill="none" stroke-linecap="round"/>
              <path d="M22 -144 q20 10 12 34 l-12 6" stroke="${C.nb2}" stroke-width="13" fill="none" stroke-linecap="round"/>`;
    } else {
      arms = `<path d="M-22 -144 q-12 24 -6 48" stroke="${C.nb2}" stroke-width="14" fill="none" stroke-linecap="round"/>
              <path d="M22 -144 q12 24 6 48" stroke="${C.nb2}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
    }
    return `<g>
      <rect x="-15" y="-52" width="12" height="38" rx="5" fill="${C.nb2}"/>
      <rect x="7" y="-52" width="12" height="38" rx="5" fill="${C.nb2}"/>
      <path d="M-16 -20 l0 12 q0 8 9 8 l10 0 0 -20Z" fill="${C.bootDark}"/>
      <path d="M8 -20 l0 12 q0 8 9 8 l10 0 0 -20Z" fill="${C.bootDark}"/>
      <path d="M-26 -150 q26 -12 52 0 l10 96 q-36 14 -72 0Z" fill="${C.nb1}"/>
      <path d="M-30 -96 q30 12 60 0 l4 40 q-34 12 -68 0Z" fill="${C.nb2}"/>
      ${arms}
      ${head}
    </g>`;
  }

  /* ---------- scenery & props ---------- */

  function fence(width = 420, opts = {}) {
    const posts = [];
    const n = Math.max(2, Math.round(width / 105));
    for (let i = 0; i <= n; i++) {
      const x = i * (width / n);
      const lean = (opts.leanLast && i === n) ? ` transform="rotate(14 ${x} 0)"` : '';
      posts.push(`<rect x="${x - 8}" y="-92" width="16" height="94" rx="6" fill="${C.wood}"${lean}/>`);
    }
    // a Rocky-sized hole: rails snapped outward between two posts
    const rails = opts.hole
      ? `<rect x="0" y="-74" width="${width * 0.32}" height="12" rx="6" fill="${C.woodDark}"/>
         <rect x="${width * 0.68}" y="-74" width="${width * 0.32}" height="12" rx="6" fill="${C.woodDark}"/>
         <rect x="0" y="-40" width="${width * 0.3}" height="12" rx="6" fill="${C.woodDark}"/>
         <rect x="${width * 0.66}" y="-40" width="${width * 0.34}" height="12" rx="6" fill="${C.woodDark}"/>
         <rect x="${width * 0.30}" y="-76" width="86" height="12" rx="6" fill="${C.woodDark}" transform="rotate(28 ${width * 0.32} -70)"/>
         <rect x="${width * 0.56}" y="-42" width="80" height="12" rx="6" fill="${C.woodDark}" transform="rotate(-24 ${width * 0.6} -36)"/>`
      : `<rect x="0" y="-74" width="${width}" height="12" rx="6" fill="${C.woodDark}"/>
         <rect x="0" y="-40" width="${width}" height="12" rx="6" fill="${C.woodDark}"/>`;
    return `<g>${rails}${posts.join('')}</g>`;
  }

  // gate; openAngle 0 = shut, ~18 = "swinging just a little", 70 = wide
  function gate(openAngle = 0) {
    return `<g>
      <rect x="-14" y="-104" width="18" height="106" rx="7" fill="${C.woodDark}"/>
      <g transform="rotate(${-Math.min(12, openAngle * 0.6)} 6 -48) translate(${Math.min(10, openAngle * 0.4)} 0)">
        <rect x="6" y="-86" width="132" height="11" rx="5" fill="${C.wood}"/>
        <rect x="6" y="-52" width="132" height="11" rx="5" fill="${C.wood}"/>
        <rect x="6" y="-92" width="12" height="92" rx="5" fill="${C.wood}"/>
        <rect x="126" y="-92" width="12" height="92" rx="5" fill="${C.wood}"/>
        <path d="M12 -84 L130 -50 M12 -50 L130 -84" stroke="${C.wood}" stroke-width="8" stroke-linecap="round"/>
      </g>
      <rect x="140" y="-104" width="18" height="106" rx="7" fill="${C.woodDark}"/>
    </g>`;
  }

  function hoofprints(n = 3, dx = 52, dy = -8, rot = 0, opacity = 0.55) {
    let s = '';
    for (let i = 0; i < n; i++) {
      s += `<g transform="translate(${i * dx} ${i * dy}) rotate(${rot})" opacity="${opacity}">
              <path d="M-8 0 a7 9 0 1 0 0.1 0Z M8 0 a7 9 0 1 0 0.1 0Z" fill="${C.mud}"/>
            </g>`;
    }
    return `<g>${s}</g>`;
  }

  function gumTree(scale = 1) {
    return `<g transform="scale(${scale})">
      <path d="M-12 0 q-8 -80 -4 -150 l32 0 q6 70 -4 150Z" fill="${C.wood}"/>
      <path d="M0 -140 q-30 -20 -66 -14 M4 -150 q30 -24 68 -16" stroke="${C.wood}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <ellipse cx="-58" cy="-196" rx="58" ry="44" fill="${C.leaf}"/>
      <ellipse cx="52" cy="-206" rx="62" ry="48" fill="${C.leafDark}"/>
      <ellipse cx="-4" cy="-238" rx="66" ry="48" fill="${C.leaf}"/>
    </g>`;
  }

  // THE big old tree — spread 7's landmark. Wide, spreading, older than everyone.
  function bigOldTree(scale = 1) {
    return `<g transform="scale(${scale})">
      <path d="M-26 0 q-16 -90 -10 -170 q-30 -16 -44 -44 q22 4 40 20 q-4 -40 8 -66 q12 22 12 56 q10 -30 34 -42 q-6 34 -26 58 q4 40 -2 74 q26 -22 56 -24 q-16 30 -48 44 q-4 50 4 94Z" fill="${C.woodDark}"/>
      <ellipse cx="-96" cy="-232" rx="76" ry="52" fill="${C.leafDark}"/>
      <ellipse cx="18" cy="-286" rx="96" ry="62" fill="${C.leaf}"/>
      <ellipse cx="118" cy="-234" rx="72" ry="50" fill="${C.leafLight}"/>
      <ellipse cx="8" cy="-216" rx="86" ry="48" fill="${C.leafDark}" opacity="0.85"/>
      <ellipse cx="0" cy="6" rx="130" ry="20" fill="${C.grassDark}" opacity="0.35"/>
    </g>`;
  }

  // corrugated water tank on a timber stand, with a dripping tap
  function waterTank(scale = 1) {
    let ribs = '';
    for (let i = 0; i < 7; i++) ribs += `<line x1="${-74 + i * 25}" y1="-160" x2="${-74 + i * 25}" y2="-24" stroke="#8FA1A8" stroke-width="4" opacity="0.6"/>`;
    return `<g transform="scale(${scale})">
      <rect x="-84" y="-24" width="168" height="24" fill="${C.woodDark}"/>
      <rect x="-88" y="-166" width="176" height="146" rx="10" fill="#AEBFC6"/>
      ${ribs}
      <ellipse cx="0" cy="-166" rx="88" ry="16" fill="#93A6AE"/>
      <ellipse cx="0" cy="-170" rx="80" ry="12" fill="#BECCD2"/>
      <path d="M84 -60 l22 0 0 16 -10 0" stroke="#7A8B92" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="96" cy="-30" r="4" fill="${C.dam}"/>
      <ellipse cx="96" cy="-8" rx="14" ry="5" fill="${C.dam}" opacity="0.7"/>
    </g>`;
  }

  // the dam: muddy water, churned banks, reeds. w×h is the water ellipse.
  function dam(w = 560, h = 130) {
    return `<g>
      <ellipse cx="0" cy="0" rx="${w / 2 + 46}" ry="${h / 2 + 26}" fill="${C.mudWet}"/>
      <ellipse cx="0" cy="0" rx="${w / 2 + 20}" ry="${h / 2 + 12}" fill="${C.mud}"/>
      <ellipse cx="0" cy="0" rx="${w / 2}" ry="${h / 2}" fill="${C.dam}"/>
      <ellipse cx="${-w * 0.14}" cy="${-h * 0.1}" rx="${w * 0.3}" ry="${h * 0.26}" fill="${C.damDeep}" opacity="0.8"/>
      <path d="M${-w * 0.34} ${h * 0.12} q ${w * 0.1} 8 ${w * 0.2} 0 M${w * 0.08} ${h * 0.2} q ${w * 0.09} 7 ${w * 0.18} 0" stroke="${C.damEdge}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/>
    </g>`;
  }

  function reeds(n = 5, spread = 110) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = -spread / 2 + (spread / Math.max(1, n - 1)) * i;
      const hh = 46 + (i % 3) * 16;
      s += `<g transform="translate(${x} 0)">
        <path d="M0 0 q-3 -${hh * 0.6} 2 -${hh}" stroke="${C.weedDark}" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse cx="2" cy="${-hh - 8}" rx="5" ry="13" fill="${C.freddieDark}"/>
      </g>`;
    }
    return `<g>${s}</g>`;
  }

  // churned mud patch (around the dam, or a wallow)
  function mudPatch(w = 240, h = 44) {
    return `<g>
      <ellipse cx="0" cy="0" rx="${w / 2}" ry="${h / 2}" fill="${C.mud}"/>
      <ellipse cx="${-w * 0.16}" cy="${-h * 0.1}" rx="${w * 0.2}" ry="${h * 0.2}" fill="${C.mudDeep}" opacity="0.6"/>
      <ellipse cx="${w * 0.2}" cy="${h * 0.08}" rx="${w * 0.14}" ry="${h * 0.16}" fill="${C.mudWet}" opacity="0.8"/>
    </g>`;
  }

  // the neighbour's lettuce patch; eaten = indexes of rows with bitten gaps
  function lettucePatch(rows = 3, cols = 6, eaten = [1]) {
    let s = '';
    for (let r = 0; r < rows; r++) {
      s += `<rect x="${-cols * 34}" y="${-r * 44 - 8}" width="${cols * 68}" height="14" rx="7" fill="${C.mudWet}" opacity="0.7"/>`;
      for (let c = 0; c < cols; c++) {
        const x = -cols * 34 + 34 + c * 68, y = -r * 44 - 12;
        const gone = eaten.includes(r) && c % 2 === 0;
        s += gone
          ? `<ellipse cx="${x}" cy="${y}" rx="14" ry="5" fill="${C.mudDeep}" opacity="0.6"/>
             <path d="M${x - 8} ${y - 2} q3 -8 8 -3 M${x + 2} ${y - 1} q4 -6 8 -2" stroke="${C.lettuceDark}" stroke-width="3" fill="none" stroke-linecap="round"/>`
          : `<circle cx="${x}" cy="${y - 8}" r="16" fill="${C.lettuce}"/>
             <path d="M${x - 12} ${y - 10} q6 -12 12 -2 q6 -12 12 2" stroke="${C.lettuceDark}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      }
    }
    return `<g>${s}</g>`;
  }

  function farmhouse(scale = 1) {
    return `<g transform="scale(${scale})">
      <rect x="0" y="-200" width="330" height="200" rx="6" fill="#E4D6BC"/>
      <path d="M-24 -200 L165 -292 L354 -200 Z" fill="${C.freddie}"/>
      <rect x="36" y="-140" width="70" height="140" rx="4" fill="${C.woodDark}"/>
      <rect x="150" y="-150" width="80" height="72" rx="6" fill="#C7D8DE" stroke="${C.woodDark}" stroke-width="6"/>
      <path d="M150 -114 l80 0 M190 -150 l0 72" stroke="${C.woodDark}" stroke-width="5"/>
      <rect x="-24" y="-208" width="378" height="14" rx="7" fill="${C.wood}"/>
      <rect x="-14" y="-196" width="12" height="196" rx="5" fill="${C.wood}"/>
      <rect x="346" y="-196" width="12" height="196" rx="5" fill="${C.wood}"/>
    </g>`;
  }

  // farmhouse at night: warm windows, everything else settled
  function farmhouseNight(scale = 1) {
    return `<g transform="scale(${scale})">
      <rect x="0" y="-200" width="330" height="200" rx="6" fill="#6B6250"/>
      <path d="M-24 -200 L165 -292 L354 -200 Z" fill="#4E3A30"/>
      <rect x="36" y="-140" width="70" height="140" rx="4" fill="#3E3428"/>
      <rect x="150" y="-150" width="80" height="72" rx="6" fill="#F2D9A0" stroke="#3E3428" stroke-width="6"/>
      <path d="M150 -114 l80 0 M190 -150 l0 72" stroke="#3E3428" stroke-width="5"/>
      <rect x="250" y="-146" width="56" height="64" rx="6" fill="#F2D9A0" stroke="#3E3428" stroke-width="6"/>
      <rect x="-24" y="-208" width="378" height="14" rx="7" fill="#5A4A3A"/>
      <rect x="-14" y="-196" width="12" height="196" rx="5" fill="#5A4A3A"/>
      <rect x="346" y="-196" width="12" height="196" rx="5" fill="#5A4A3A"/>
    </g>`;
  }

  function cloudPuff(scale = 1, opacity = 0.9) {
    return `<g transform="scale(${scale})" opacity="${opacity}">
      <ellipse cx="0" cy="0" rx="66" ry="26" fill="${C.cloud}"/>
      <ellipse cx="-34" cy="-14" rx="34" ry="20" fill="${C.cloud}"/>
      <ellipse cx="28" cy="-16" rx="40" ry="22" fill="${C.cloud}"/>
    </g>`;
  }

  function birds(x = 0, y = 0) {
    return `<g transform="translate(${x} ${y})">
      <path d="M0 0 q6 -8 12 0 q6 -8 12 0" stroke="#6B5F4E" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M44 -18 q6 -8 12 0 q6 -8 12 0" stroke="#6B5F4E" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    </g>`;
  }

  function grassTuft(scale = 1) {
    return `<g transform="scale(${scale})">
      <path d="M0 0 q-8 -18 -4 -34 M0 0 q2 -20 10 -30 M0 0 q-14 -10 -22 -22"
            stroke="${C.grassDark}" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>`;
  }

  function flowers(n = 5, spread = 150) {
    let s = '';
    const colors = ['#D98B66', C.tag, '#E9E2CF'];
    for (let i = 0; i < n; i++) {
      const x = -spread / 2 + (spread / Math.max(1, n - 1)) * i;
      const y = -6 - (i % 2) * 10;
      s += `<g transform="translate(${x} ${y})">
        <line x1="0" y1="0" x2="0" y2="-22" stroke="${C.leafDark}" stroke-width="3.5"/>
        <circle cx="0" cy="-27" r="9" fill="${colors[i % 3]}"/>
        <circle cx="0" cy="-27" r="3.5" fill="${C.paper}"/>
      </g>`;
    }
    return `<g>${s}</g>`;
  }

  function hayBale(scale = 1) {
    return `<g transform="scale(${scale})">
      <ellipse cx="0" cy="-30" rx="34" ry="30" fill="${C.hay}"/>
      <ellipse cx="0" cy="-30" rx="20" ry="17" fill="none" stroke="${C.hayDark}" stroke-width="4"/>
      <ellipse cx="0" cy="-30" rx="8" ry="7" fill="none" stroke="${C.hayDark}" stroke-width="3"/>
    </g>`;
  }

  function butterfly(scale = 1) {
    return `<g transform="scale(${scale})">
      <ellipse cx="-8" cy="-2" rx="10" ry="13" fill="#D98B66" transform="rotate(-24 -8 -2)"/>
      <ellipse cx="8" cy="-2" rx="10" ry="13" fill="#D98B66" opacity="0.8" transform="rotate(24 8 -2)"/>
      <rect x="-2.5" y="-10" width="5" height="20" rx="2.5" fill="${C.ink}"/>
      <path d="M-3 -10 q-5 -8 -9 -9 M3 -10 q5 -8 9 -9" stroke="${C.ink}" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>`;
  }

  // little mud splats on the ground / flying (spread 13)
  function mudSplats(list) {
    return list.map(([x, y, r]) =>
      `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.mud}" opacity="0.8"/>`).join('');
  }

  return {
    C, id, put, sky, sun, moon, stars, hills, ground, dirtTrack,
    will, cow, cleo, neighbour,
    fence, gate, hoofprints, gumTree, bigOldTree, waterTank, dam, reeds,
    mudPatch, lettucePatch, farmhouse, farmhouseNight, cloudPuff, birds,
    grassTuft, flowers, hayBale, butterfly, mudSplats,
  };
})();

if (typeof module !== 'undefined') module.exports = BookArt;
