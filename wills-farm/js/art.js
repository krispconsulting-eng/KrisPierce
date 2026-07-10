/* =========================================================================
   Art — storybook SVG builders for the cast and props.
   Every character is drawn with feet at local (0,0), centred on x=0,
   facing RIGHT. The engine flips with scaleX(-1) to face left.

   Canon rules honoured here:
   - Will: Queen-spirit tee (small gold crown — private build), olive shorts,
     tan boots, hands in pockets, slight head tilt, phone on a lanyard.
   - Rocky: golden, wild fringe, one crooked horn, smug.
   - Freddie: russet, tidier fringe, calm visible eyes, rounder and heavier.
   - Cleo: honey-gold cocker spaniel, blue collar with round tag, in charge.
   - Pearl: soft white, slate wings, banksia-yellow bill.
   - Ella: charcoal + slate activewear, coral accent in every pose,
     honey-brown hair tied back, headphones round neck, shaker bottle,
     Will's head tilt.
   ========================================================================= */

const Art = (() => {
  const C = {
    paper: '#FBF3E4', paddock: '#8FB98B', paddockDeep: '#7CA878',
    oat: '#E8D9BD', sandstone: '#E3CBA4', sky: '#BFD9E2', apricot: '#F2C29B',
    sea: '#7FB5AE', seaDeep: '#6AA39C',
    rocky: '#D9A441', rockyDark: '#B8863B', rockyLight: '#E8C27A',
    freddie: '#9A6B4F', freddieDark: '#7E543D', freddieLight: '#B5876A',
    cleo: '#DDB25E', cleoDark: '#C29A45', cleoBlue: '#4A7BA6',
    pearl: '#F2EDE2', slate: '#6E7B86', slateDark: '#59646E', banksia: '#E0A93E',
    charcoal: '#3D4248', olive: '#7A7D4E', tan: '#B98A5A', tanDark: '#9A7048',
    coral: '#E8896A', night: '#39465C', ink: '#4A3C2C',
    skin: '#E9B98D', hairWill: '#6B4E31', hairElla: '#A9784A',
    wood: '#A9805A', woodDark: '#8A6746', leaf: '#6E9668', leafDark: '#5B8156',
    appleRed: '#C96F5B', stone: '#B9AF9C', mud: '#8A6F55',
  };

  /* ---------------- characters ---------------- */

  // Highland cow. kind: 'rocky' | 'freddie'
  function cow(kind) {
    const isRocky = kind === 'rocky';
    const body = isRocky ? C.rocky : C.freddie;
    const dark = isRocky ? C.rockyDark : C.freddieDark;
    const light = isRocky ? C.rockyLight : C.freddieLight;
    const w = isRocky ? 1 : 1.1;             // Freddie is rounder and heavier
    // shaggy bottom edge of the coat
    let shag = '';
    for (let i = 0; i < 8; i++) {
      const x = -108 * w + i * (27 * w);
      shag += `<path d="M${x} -78 q${10 * w} 26 ${24 * w} 2 Z" style="fill:${body}"/>`;
    }
    const fringe = isRocky
      // wild fringe: jagged strands every which way
      ? `<g class="fringe">
           <path d="M56 -196 q-14 -26 8 -34 q20 -10 34 6 q16 -12 30 2 q16 -10 26 6 q12 16 -4 26 q6 18 -12 22 q-40 12 -82 -28Z" style="fill:${dark}"/>
           <path d="M66 -186 q4 22 -8 30 M92 -190 q8 20 -2 32 M118 -184 q10 16 2 28"
                 style="stroke:${dark};stroke-width:9;fill:none;stroke-linecap:round"/>
         </g>`
      // tidy fringe: neat curtain, calm eyes visible below
      : `<g class="fringe">
           <path d="M60 -200 q42 -26 88 -2 q10 20 -6 28 q-38 14 -76 0 q-14 -10 -6 -26Z" style="fill:${dark}"/>
           <path d="M74 -180 q4 14 -2 22 M96 -178 q4 14 0 22 M118 -178 q4 12 -2 20"
                 style="stroke:${dark};stroke-width:8;fill:none;stroke-linecap:round"/>
         </g>`;
    const eyes = isRocky
      ? `` // Rocky's eyes hide under the wild fringe (classic highland)
      : `<circle cx="82" cy="-152" r="6" style="fill:${C.ink}"/>
         <circle cx="116" cy="-152" r="6" style="fill:${C.ink}"/>`;
    // classic highland horns: sweep out from the head, then curve up to a tip
    const hornL = `M66 -192 C 30 -196, 8 -212, 6 -244 C 6 -252, 14 -254, 20 -248 C 32 -226, 48 -212, 74 -208 Z`;
    const hornR = `M128 -192 C 164 -196, 186 -212, 188 -244 C 188 -252, 180 -254, 174 -248 C 162 -226, 146 -212, 120 -208 Z`;
    const horns = isRocky
      // one crooked horn (his right, our left) — canon
      ? `<path d="${hornL}" style="fill:${C.oat};stroke:${C.tanDark};stroke-width:3" transform="rotate(-22 66 -192)"/>
         <path d="${hornR}" style="fill:${C.oat};stroke:${C.tanDark};stroke-width:3"/>`
      : `<path d="${hornL}" style="fill:${C.oat};stroke:${C.tanDark};stroke-width:3"/>
         <path d="${hornR}" style="fill:${C.oat};stroke:${C.tanDark};stroke-width:3"/>`;
    const ears = `
      <ellipse cx="52" cy="-186" rx="16" ry="10" style="fill:${dark}" transform="rotate(-34 52 -186)"/>
      <ellipse cx="142" cy="-186" rx="16" ry="10" style="fill:${dark}" transform="rotate(34 142 -186)"/>`;
    const mouth = isRocky
      ? `<path d="M88 -108 q12 9 24 0" style="stroke:${C.ink};stroke-width:4;fill:none;stroke-linecap:round"/>` // smug
      : `<path d="M90 -106 q10 7 20 0" style="stroke:${C.ink};stroke-width:4;fill:none;stroke-linecap:round"/>`;
    return `
      <g class="rocker">
        <ellipse class="select-ring" cx="0" cy="-4" rx="${135 * w}" ry="26"/>
        <ellipse class="shimmer-halo" cx="0" cy="-110" rx="${150 * w}" ry="120"
                 style="fill:none;stroke:${C.coral};stroke-width:14" />
        <!-- legs -->
        <rect x="${-96 * w}" y="-74" width="26" height="76" rx="12" style="fill:${dark}"/>
        <rect x="${-46 * w}" y="-74" width="26" height="76" rx="12" style="fill:${dark}"/>
        <rect x="${28 * w}" y="-74" width="26" height="76" rx="12" style="fill:${dark}"/>
        <rect x="${74 * w}" y="-74" width="26" height="76" rx="12" style="fill:${dark}"/>
        <!-- tail -->
        <g class="tail">
          <path d="M${-112 * w} -150 q-34 20 -26 62" style="stroke:${dark};stroke-width:12;fill:none;stroke-linecap:round"/>
          <circle cx="${-140 * w}" cy="-84" r="16" style="fill:${dark}"/>
        </g>
        <!-- shaggy body -->
        <g class="breathes">
          <ellipse cx="0" cy="-138" rx="${118 * w}" ry="70" style="fill:${body}"/>
          <path d="M${-110 * w} -170 q${40 * w} -34 ${110 * w} -30 q${70 * w} -6 ${104 * w} 28"
                style="fill:none;stroke:${light};stroke-width:12;stroke-linecap:round"/>
          ${shag}
        </g>
        <!-- head -->
        <g class="head">
          ${horns}
          ${ears}
          <circle cx="97" cy="-158" r="52" style="fill:${body}"/>
          <ellipse cx="100" cy="-120" rx="34" ry="23" style="fill:${light}"/>
          <!-- nostrils -->
          <ellipse cx="88" cy="-124" rx="4" ry="6" style="fill:${dark}"/>
          <ellipse cx="114" cy="-124" rx="4" ry="6" style="fill:${dark}"/>
          ${mouth}
          ${eyes}
          ${fringe}
        </g>
      </g>`;
  }

  // Cleo the cocker spaniel — honey gold, blue collar, in charge of everyone
  function cleo() {
    return `
      <g class="rocker">
        <ellipse class="select-ring" cx="0" cy="-2" rx="86" ry="18"/>
        <ellipse class="shimmer-halo" cx="0" cy="-58" rx="95" ry="70"
                 style="fill:none;stroke:${C.coral};stroke-width:12"/>
        <!-- tail: proud flag -->
        <g class="tail">
          <path d="M-62 -78 q-30 -22 -24 -46" style="stroke:${C.cleoDark};stroke-width:13;fill:none;stroke-linecap:round"/>
        </g>
        <!-- legs with feathering -->
        <path d="M-46 -50 q-6 30 -2 48 l16 0 q4 -22 0 -46 Z" style="fill:${C.cleo}"/>
        <path d="M26 -50 q-6 30 -2 48 l16 0 q4 -22 0 -46 Z" style="fill:${C.cleo}"/>
        <!-- body -->
        <g class="breathes">
          <ellipse cx="-8" cy="-62" rx="62" ry="36" style="fill:${C.cleo}"/>
          <path d="M-56 -46 q-10 18 -2 34 M-36 -42 q-8 18 -2 32 M40 -44 q8 16 4 30"
                style="stroke:${C.cleoDark};stroke-width:7;fill:none;stroke-linecap:round"/>
        </g>
        <!-- head, held high -->
        <g class="head">
          <circle cx="48" cy="-104" r="32" style="fill:${C.cleo}"/>
          <!-- long wavy spaniel ear -->
          <path d="M24 -116 q-22 4 -24 40 q-2 26 12 34 q14 6 18 -12 q4 -30 2 -56Z" style="fill:${C.cleoDark}"/>
          <!-- muzzle -->
          <ellipse cx="74" cy="-94" rx="18" ry="13" style="fill:${C.rockyLight}"/>
          <ellipse cx="84" cy="-98" rx="7" ry="6" style="fill:${C.ink}"/>
          <circle cx="52" cy="-112" r="5" style="fill:${C.ink}"/>
          <path d="M66 -86 q8 6 16 1" style="stroke:${C.ink};stroke-width:3.5;fill:none;stroke-linecap:round"/>
          <!-- collar: blue, round gold tag, always visible -->
          <path d="M22 -84 q26 14 52 2" style="stroke:${C.cleoBlue};stroke-width:10;fill:none;stroke-linecap:round"/>
          <circle cx="50" cy="-72" r="8" style="fill:${C.banksia};stroke:${C.tanDark};stroke-width:2"/>
        </g>
      </g>`;
  }

  // Will — the boy who notices things. Feet at 0,0. ~185 tall.
  function will() {
    return `
      <g class="rocker">
        <ellipse class="select-ring" cx="0" cy="-2" rx="62" ry="15"/>
        <ellipse class="shimmer-halo" cx="0" cy="-95" rx="70" ry="105"
                 style="fill:none;stroke:${C.coral};stroke-width:12"/>
        <!-- boots -->
        <path d="M-24 -26 l0 18 q0 8 10 8 l12 0 0 -26Z" style="fill:${C.tan}"/>
        <path d="M4 -26 l0 18 q0 8 10 8 l12 0 0 -26Z" style="fill:${C.tan}"/>
        <!-- legs -->
        <rect x="-22" y="-66" width="18" height="44" rx="8" style="fill:${C.skin}"/>
        <rect x="6" y="-66" width="18" height="44" rx="8" style="fill:${C.skin}"/>
        <!-- olive shorts -->
        <path d="M-26 -104 l54 0 0 30 q0 8 -8 8 l-12 0 -6 -18 -6 18 -14 0 q-8 0 -8 -8Z" style="fill:${C.olive}"/>
        <!-- black tee, arms relaxed, hands in pockets -->
        <g class="torso">
          <path d="M-26 -156 q26 -12 52 0 l6 54 -64 0Z" style="fill:${C.charcoal}"/>
          <!-- arms down into pockets -->
          <path d="M-26 -150 q-16 24 -8 52 q2 8 10 6" style="stroke:${C.charcoal};stroke-width:15;fill:none;stroke-linecap:round"/>
          <path d="M26 -150 q16 24 8 52 q-2 8 -10 6" style="stroke:${C.charcoal};stroke-width:15;fill:none;stroke-linecap:round"/>
          <!-- small gold crown on the tee (the band tee, Queen-spirit) -->
          <path d="M-9 -136 l3 -8 4 6 4 -9 4 9 4 -6 3 8 q-11 5 -22 0Z" style="fill:${C.banksia}"/>
          <!-- lanyard + phone: part of his silhouette, never remarked on -->
          <path d="M-12 -158 q12 10 24 0 l-8 22 -8 0Z" style="fill:none;stroke:${C.slateDark};stroke-width:4"/>
          <g class="phone">
            <rect x="-11" y="-128" width="22" height="32" rx="5" style="fill:${C.slateDark}"/>
            <rect x="-7.5" y="-124" width="15" height="22" rx="3" style="fill:${C.paper}"/>
          </g>
        </g>
        <!-- head with the slight, characteristic tilt -->
        <g class="head" transform="rotate(-6 0 -172)">
          <circle cx="0" cy="-180" r="26" style="fill:${C.skin}"/>
          <path d="M-26 -184 q2 -24 26 -24 q24 0 26 24 q-12 -12 -26 -10 q-14 -2 -26 10Z" style="fill:${C.hairWill}"/>
          <circle cx="-8" cy="-180" r="3.2" style="fill:${C.ink}"/>
          <circle cx="9" cy="-180" r="3.2" style="fill:${C.ink}"/>
          <path d="M-6 -166 q6 5 13 0" style="stroke:${C.ink};stroke-width:3;fill:none;stroke-linecap:round"/>
        </g>
      </g>`;
  }

  // Ella — the twin who lifts things. pose: 'stand' | 'jog' | 'lift'
  function ella(pose = 'stand') {
    const arms = pose === 'lift'
      ? `<path d="M-20 -150 q-14 -30 -6 -58" style="stroke:${C.charcoal};stroke-width:14;fill:none;stroke-linecap:round"/>
         <path d="M20 -150 q14 -30 6 -58" style="stroke:${C.charcoal};stroke-width:14;fill:none;stroke-linecap:round"/>`
      : pose === 'jog'
      ? `<path d="M-20 -148 q-20 10 -16 34" style="stroke:${C.charcoal};stroke-width:14;fill:none;stroke-linecap:round"/>
         <path d="M20 -148 q22 4 20 -26" style="stroke:${C.charcoal};stroke-width:14;fill:none;stroke-linecap:round"/>`
      : `<path d="M-21 -148 q-14 26 -8 50" style="stroke:${C.charcoal};stroke-width:14;fill:none;stroke-linecap:round"/>
         <path d="M21 -148 q14 26 8 50" style="stroke:${C.charcoal};stroke-width:14;fill:none;stroke-linecap:round"/>`;
    const legs = pose === 'jog'
      ? `<path d="M-12 -66 q-16 20 -14 40 l14 6 q8 -20 10 -44Z" style="fill:${C.slate}"/>
         <path d="M12 -66 q14 16 26 22 l-4 14 q-22 -4 -34 -22Z" style="fill:${C.slate}"/>`
      : `<rect x="-21" y="-70" width="18" height="50" rx="8" style="fill:${C.slate}"/>
         <rect x="4" y="-70" width="18" height="50" rx="8" style="fill:${C.slate}"/>`;
    const shoes = pose === 'jog'
      ? `<g><path d="M-30 -22 l22 4 0 12 -24 0Z" style="fill:${C.pearl}"/><rect x="-30" y="-12" width="22" height="4" rx="2" style="fill:${C.coral}"/>
         <path d="M30 -34 l8 20 -22 0 2 -16Z" style="fill:${C.pearl}"/><rect x="16" y="-18" width="20" height="4" rx="2" style="fill:${C.coral}" transform="rotate(14 26 -16)"/></g>`
      : `<g><path d="M-24 -22 l0 14 q0 8 10 8 l12 0 0 -22Z" style="fill:${C.pearl}"/><rect x="-24" y="-8" width="22" height="5" rx="2.5" style="fill:${C.coral}"/>
         <path d="M4 -22 l0 14 q0 8 10 8 l12 0 0 -22Z" style="fill:${C.pearl}"/><rect x="4" y="-8" width="22" height="5" rx="2.5" style="fill:${C.coral}"/></g>`;
    return `
      <g class="rocker">
        <ellipse class="select-ring" cx="0" cy="-2" rx="62" ry="15"/>
        <ellipse class="shimmer-halo" cx="0" cy="-100" rx="70" ry="108"
                 style="fill:none;stroke:${C.coral};stroke-width:12"/>
        ${shoes}
        ${legs}
        <!-- slate shorts over leggings -->
        <path d="M-24 -104 l48 0 0 28 q0 8 -8 8 l-10 0 -6 -16 -6 16 -10 0 q-8 0 -8 -8Z" style="fill:${C.slateDark}"/>
        <!-- charcoal tank, strong shoulders -->
        <g class="torso">
          <path d="M-25 -158 q25 -14 50 0 l5 54 -60 0Z" style="fill:${C.charcoal}"/>
          ${arms}
          <!-- headphones resting round her neck -->
          <path d="M-16 -152 q16 14 32 0" style="stroke:${C.slateDark};stroke-width:8;fill:none;stroke-linecap:round"/>
          <circle cx="-17" cy="-150" r="7" style="fill:${C.slateDark}"/>
          <circle cx="17" cy="-150" r="7" style="fill:${C.slateDark}"/>
          <!-- shaker bottle clipped at the waist -->
          <rect x="20" y="-112" width="14" height="24" rx="5" style="fill:${C.pearl};stroke:${C.slateDark};stroke-width:2.5"/>
          <rect x="22" y="-116" width="10" height="6" rx="2" style="fill:${C.coral}"/>
        </g>
        <!-- head: Will's tilt, honey-brown hair tied back with a coral tie -->
        <g class="head" transform="rotate(-6 0 -174)">
          <circle cx="0" cy="-182" r="25" style="fill:${C.skin}"/>
          <path d="M-25 -186 q2 -23 25 -23 q23 0 25 23 q-11 -11 -25 -9 q-14 -2 -25 9Z" style="fill:${C.hairElla}"/>
          <path d="M-22 -196 q-16 8 -14 34 q-2 16 8 22 q6 -22 4 -40Z" style="fill:${C.hairElla}"/>
          <circle cx="-24" cy="-176" r="4.5" style="fill:${C.coral}"/>
          <circle cx="-8" cy="-182" r="3.2" style="fill:${C.ink}"/>
          <circle cx="9" cy="-182" r="3.2" style="fill:${C.ink}"/>
          <path d="M-6 -168 q6 5 13 0" style="stroke:${C.ink};stroke-width:3;fill:none;stroke-linecap:round"/>
        </g>
      </g>`;
  }

  // Pearl the pelican. pose: 'stand' | 'fly'
  function pearl(pose = 'stand') {
    if (pose === 'fly') {
      return `
        <g class="rocker">
          <ellipse class="select-ring" cx="0" cy="10" rx="100" ry="18"/>
          <ellipse class="shimmer-halo" cx="0" cy="-30" rx="120" ry="70"
                   style="fill:none;stroke:${C.coral};stroke-width:12"/>
          <ellipse cx="0" cy="-24" rx="52" ry="26" style="fill:${C.pearl}"/>
          <path d="M-30 -34 q-70 -46 -118 -28 q34 40 96 42Z" style="fill:${C.slate}"/>
          <path d="M18 -34 q56 -50 104 -40 q-22 44 -84 52Z" style="fill:${C.slate}"/>
          <circle cx="52" cy="-44" r="20" style="fill:${C.pearl}"/>
          <circle cx="58" cy="-48" r="3.6" style="fill:${C.ink}"/>
          <path d="M66 -44 l58 8 q4 4 -2 8 l-56 -4 q-8 -4 0 -12Z" style="fill:${C.banksia}"/>
        </g>`;
    }
    return `
      <g class="rocker">
        <ellipse class="select-ring" cx="0" cy="-2" rx="70" ry="15"/>
        <ellipse class="shimmer-halo" cx="0" cy="-72" rx="82" ry="82"
                 style="fill:none;stroke:${C.coral};stroke-width:12"/>
        <!-- legs -->
        <path d="M-12 -34 l-2 30 m-8 0 l18 0" style="stroke:${C.banksia};stroke-width:6;fill:none;stroke-linecap:round"/>
        <path d="M14 -34 l2 30 m-8 0 l18 0" style="stroke:${C.banksia};stroke-width:6;fill:none;stroke-linecap:round"/>
        <!-- body -->
        <g class="breathes">
          <path d="M-52 -66 q-4 -46 44 -50 q22 -2 30 12 q10 26 4 48 q-8 26 -44 24 q-32 -2 -34 -34Z" style="fill:${C.pearl}"/>
          <!-- folded slate wing -->
          <path d="M-46 -74 q30 -22 66 -8 q-4 30 -34 34 q-28 2 -32 -26Z" style="fill:${C.slate}"/>
          <!-- tail -->
          <path d="M-52 -60 q-18 2 -26 14 q14 8 28 2Z" style="fill:${C.slate}"/>
        </g>
        <!-- neck + head -->
        <g class="head">
          <path d="M10 -102 q-4 -26 10 -38" style="stroke:${C.pearl};stroke-width:20;fill:none;stroke-linecap:round"/>
          <circle cx="22" cy="-142" r="19" style="fill:${C.pearl}"/>
          <circle cx="28" cy="-146" r="3.6" style="fill:${C.ink}"/>
          <!-- the famous bill, banksia yellow, with pouch -->
          <g class="bill">
            <path d="M36 -142 l66 10 q5 3 -1 7 l-64 -5 q-8 -5 -1 -12Z" style="fill:${C.banksia}"/>
            <path d="M37 -130 l62 5 q-16 22 -44 12 q-16 -5 -18 -17Z" style="fill:#D89C64"/>
          </g>
        </g>
      </g>`;
  }

  /* ---------------- props ---------------- */

  function fence(width = 420, leanLastPanel = false) {
    const posts = [];
    const n = Math.round(width / 105);
    for (let i = 0; i <= n; i++) {
      const x = i * (width / n);
      const lean = (leanLastPanel && i === n) ? ` transform="rotate(14 ${x} 0)"` : '';
      posts.push(`<rect x="${x - 8}" y="-92" width="16" height="94" rx="6" style="fill:${C.wood}"${lean}/>`);
    }
    return `
      <g>
        <rect x="0" y="-74" width="${width}" height="12" rx="6" style="fill:${C.woodDark}"/>
        <rect x="0" y="-40" width="${width}" height="12" rx="6" style="fill:${C.woodDark}"/>
        ${posts.join('')}
      </g>`;
  }

  // a gate that swings open (class .gate-leaf rotates around the left hinge)
  function gate() {
    return `
      <g>
        <rect x="-14" y="-104" width="18" height="106" rx="7" style="fill:${C.woodDark}"/>
        <g class="gate-leaf" style="transform-box:fill-box;transform-origin:0% 50%;transition:transform 1.6s ease">
          <rect x="6" y="-86" width="132" height="11" rx="5" style="fill:${C.wood}"/>
          <rect x="6" y="-52" width="132" height="11" rx="5" style="fill:${C.wood}"/>
          <rect x="6" y="-92" width="12" height="92" rx="5" style="fill:${C.wood}"/>
          <rect x="126" y="-92" width="12" height="92" rx="5" style="fill:${C.wood}"/>
          <path d="M12 -84 L130 -50 M12 -50 L130 -84" style="stroke:${C.wood};stroke-width:8;stroke-linecap:round"/>
        </g>
        <rect x="140" y="-104" width="18" height="106" rx="7" style="fill:${C.woodDark}"/>
      </g>`;
  }

  function hoofprints(n = 3, dx = 52, dy = -8, rot = 0) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = i * dx, y = i * dy;
      s += `<g transform="translate(${x} ${y}) rotate(${rot})" style="opacity:0.55">
              <path d="M-8 0 a7 9 0 1 0 0.1 0Z M8 0 a7 9 0 1 0 0.1 0Z" style="fill:${C.mud}"/>
            </g>`;
    }
    return `<g>${s}</g>`;
  }

  function bush(scale = 1) {
    return `
      <g transform="scale(${scale})">
        <ellipse cx="0" cy="-34" rx="64" ry="40" style="fill:${C.leaf}"/>
        <ellipse cx="-38" cy="-22" rx="36" ry="26" style="fill:${C.leafDark}"/>
        <ellipse cx="40" cy="-24" rx="34" ry="25" style="fill:${C.leafDark}"/>
        <circle cx="-12" cy="-52" r="6" style="fill:${C.coral};opacity:0.85"/>
        <circle cx="22" cy="-40" r="5" style="fill:${C.coral};opacity:0.7"/>
      </g>`;
  }

  function gumTree(scale = 1, withApples = false) {
    const apples = withApples
      ? `<g class="apples">
           <circle class="apple" cx="-52" cy="-208" r="12" style="fill:${C.appleRed}"/>
           <circle class="apple" cx="8" cy="-232" r="12" style="fill:${C.appleRed}"/>
           <circle class="apple" cx="58" cy="-198" r="12" style="fill:${C.appleRed}"/>
           <circle class="apple" cx="-14" cy="-186" r="11" style="fill:${C.appleRed}"/>
         </g>`
      : '';
    return `
      <g transform="scale(${scale})">
        <path d="M-12 0 q-8 -80 -4 -150 l32 0 q6 70 -4 150Z" style="fill:${C.wood}"/>
        <path d="M0 -140 q-30 -20 -66 -14 M4 -150 q30 -24 68 -16" style="stroke:${C.wood};stroke-width:14;fill:none;stroke-linecap:round"/>
        <g class="sways">
          <ellipse cx="-58" cy="-196" rx="58" ry="44" style="fill:${C.leaf}"/>
          <ellipse cx="52" cy="-206" rx="62" ry="48" style="fill:${C.leafDark}"/>
          <ellipse cx="-4" cy="-238" rx="66" ry="48" style="fill:${C.leaf}"/>
          ${apples}
        </g>
        <g class="birds">
          <path class="bird" d="M-30 -260 q6 -8 12 0 q6 -8 12 0" style="stroke:${C.slateDark};stroke-width:3.5;fill:none;stroke-linecap:round"/>
          <path class="bird" d="M26 -276 q6 -8 12 0 q6 -8 12 0" style="stroke:${C.slateDark};stroke-width:3.5;fill:none;stroke-linecap:round"/>
        </g>
      </g>`;
  }

  function cloud(scale = 1) {
    return `
      <g transform="scale(${scale})" style="opacity:0.9">
        <ellipse cx="0" cy="0" rx="66" ry="26" style="fill:${C.paper}"/>
        <ellipse cx="-34" cy="-14" rx="34" ry="20" style="fill:${C.paper}"/>
        <ellipse cx="28" cy="-16" rx="40" ry="22" style="fill:${C.paper}"/>
      </g>`;
  }

  function butterfly() {
    return `
      <g class="flutters">
        <g transform="scale(1.7)">
          <ellipse cx="-8" cy="-2" rx="10" ry="13" style="fill:${C.coral}" transform="rotate(-24 -8 -2)"/>
          <ellipse cx="8" cy="-2" rx="10" ry="13" style="fill:${C.coral};opacity:0.8" transform="rotate(24 8 -2)"/>
          <rect x="-2.5" y="-10" width="5" height="20" rx="2.5" style="fill:${C.ink}"/>
          <path d="M-3 -10 q-5 -8 -9 -9 M3 -10 q5 -8 9 -9" style="stroke:${C.ink};stroke-width:2;fill:none;stroke-linecap:round"/>
        </g>
      </g>`;
  }

  function steppingStone(rx = 42) {
    return `<ellipse cx="0" cy="0" rx="${rx}" ry="${rx * 0.42}" style="fill:${C.stone};stroke:${C.slateDark};stroke-width:3;opacity:0.95"/>`;
  }

  function gumBranch() {
    return `
      <g>
        <path d="M-130 -10 q60 -34 260 -14 q30 4 20 20 q-140 22 -270 6 q-16 -6 -10 -12Z" style="fill:${C.woodDark}"/>
        <path d="M-60 -22 q-16 -26 -4 -44 M60 -22 q20 -22 12 -44 M140 -14 q22 -14 24 -34"
              style="stroke:${C.woodDark};stroke-width:11;fill:none;stroke-linecap:round"/>
        <ellipse cx="-64" cy="-62" rx="22" ry="12" style="fill:${C.leafDark}" transform="rotate(-30 -64 -62)"/>
        <ellipse cx="76" cy="-62" rx="22" ry="12" style="fill:${C.leaf}" transform="rotate(24 76 -62)"/>
        <ellipse cx="168" cy="-46" rx="20" ry="11" style="fill:${C.leafDark}" transform="rotate(30 168 -46)"/>
      </g>`;
  }

  function flowers(n = 5, spread = 150) {
    let s = '';
    const colors = [C.coral, C.banksia, C.pearl];
    for (let i = 0; i < n; i++) {
      const x = -spread / 2 + (spread / (n - 1)) * i;
      const y = -6 - (i % 2) * 10;
      const col = colors[i % 3];
      // NOTE: the animated .sways group must not carry its own transform
      // attribute (the CSS animation would override it) — so wrap it.
      s += `<g transform="translate(${x} ${y})"><g class="sways">
              <line x1="0" y1="0" x2="0" y2="-22" style="stroke:${C.leafDark};stroke-width:3.5"/>
              <circle cx="0" cy="-27" r="9" style="fill:${col}"/>
              <circle cx="0" cy="-27" r="3.5" style="fill:${C.paper}"/>
            </g></g>`;
    }
    return `<g>${s}</g>`;
  }

  function grassTuft() {
    return `
      <g class="sways">
        <path d="M0 0 q-8 -18 -4 -34 M0 0 q2 -20 10 -30 M0 0 q-14 -10 -22 -22"
              style="stroke:${C.paddockDeep};stroke-width:5;fill:none;stroke-linecap:round"/>
      </g>`;
  }

  function verandaHouse() {
    return `
      <g>
        <rect x="0" y="-200" width="330" height="200" rx="6" style="fill:${C.oat}"/>
        <path d="M-24 -200 L165 -292 L354 -200 Z" style="fill:${C.freddie}"/>
        <rect x="36" y="-140" width="70" height="140" rx="4" style="fill:${C.woodDark}"/>
        <rect x="150" y="-150" width="80" height="72" rx="6" style="fill:${C.sky};stroke:${C.woodDark};stroke-width:6"/>
        <path d="M150 -114 l80 0 M190 -150 l0 72" style="stroke:${C.woodDark};stroke-width:5"/>
        <rect x="-24" y="-208" width="378" height="14" rx="7" style="fill:${C.wood}"/>
        <rect x="-14" y="-196" width="12" height="196" rx="5" style="fill:${C.wood}"/>
        <rect x="346" y="-196" width="12" height="196" rx="5" style="fill:${C.wood}"/>
      </g>`;
  }

  function sunGlow(cx, cy, r, color) {
    return `
      <g>
        <circle cx="${cx}" cy="${cy}" r="${r * 1.7}" style="fill:${color};opacity:0.25"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${color};opacity:0.85"/>
      </g>`;
  }

  function hill(x, y, rx, ry, color) {
    return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" style="fill:${color}"/>`;
  }

  // simple outdoor gym for Ella's corner
  function gym() {
    return `
      <g>
        <rect x="-90" y="-14" width="180" height="14" rx="7" style="fill:${C.woodDark}"/>
        <circle cx="-78" cy="-22" r="17" style="fill:${C.slateDark}"/>
        <circle cx="78" cy="-22" r="17" style="fill:${C.slateDark}"/>
        <rect x="-64" y="-26" width="128" height="9" rx="4.5" style="fill:${C.slate}"/>
        <rect x="120" y="-70" width="12" height="70" rx="5" style="fill:${C.wood}"/>
        <rect x="180" y="-70" width="12" height="70" rx="5" style="fill:${C.wood}"/>
        <rect x="112" y="-74" width="88" height="10" rx="5" style="fill:${C.coral}"/>
      </g>`;
  }

  function hayBale() {
    return `
      <g>
        <ellipse cx="0" cy="-30" rx="34" ry="30" style="fill:${C.banksia}"/>
        <ellipse cx="0" cy="-30" rx="20" ry="17" style="fill:none;stroke:${C.tanDark};stroke-width:4"/>
        <ellipse cx="0" cy="-30" rx="8" ry="7" style="fill:none;stroke:${C.tanDark};stroke-width:3"/>
      </g>`;
  }

  function pumpkin() {
    return `
      <g>
        <ellipse cx="0" cy="-18" rx="26" ry="18" style="fill:${C.coral}"/>
        <path d="M-10 -34 q0 16 0 16 M10 -34 q0 16 0 16" style="stroke:${C.tanDark};stroke-width:3;fill:none"/>
        <rect x="-3" y="-42" width="6" height="10" rx="3" style="fill:${C.leafDark}"/>
      </g>`;
  }

  /* ---------------- AAC symbols & bill-pictures & stickers ---------------- */

  const symbols = {
    go: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="#8FB98B"/><path d="M20 30 h16 m-7 -9 l9 9 -9 9" stroke="#FBF3E4" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    look: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="#4A7BA6"/><ellipse cx="30" cy="30" rx="16" ry="10" fill="#FBF3E4"/><circle cx="30" cy="30" r="5.5" fill="#3D4248"/></svg>`,
    open: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="#B98A5A"/><rect x="18" y="20" width="10" height="22" rx="2" fill="#FBF3E4"/><rect x="31" y="18" width="10" height="22" rx="2" fill="#FBF3E4" transform="rotate(18 31 18)"/></svg>`,
    found: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="#E8896A"/><path d="M30 42 C14 32 18 16 30 24 C42 16 46 32 30 42Z" fill="#FBF3E4"/></svg>`,
    home: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="#7A7D4E"/><path d="M16 32 L30 18 L44 32" stroke="#FBF3E4" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="22" y="32" width="16" height="12" rx="2" fill="#FBF3E4"/></svg>`,
    more: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="#DDB25E"/><path d="M30 18 v24 M18 30 h24" stroke="#FBF3E4" stroke-width="6" stroke-linecap="round"/></svg>`,
    help: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="#6E7B86"/><path d="M22 26 q0 -10 9 -9 q8 1 7 9 q-1 6 -8 9 l0 4" stroke="#FBF3E4" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="30" cy="45" r="3" fill="#FBF3E4"/></svg>`,
  };
  const symbolWords = {
    go: 'go', look: 'look', open: 'open', found: 'found you',
    home: 'home', more: 'more', help: 'help',
  };

  // Pearl's bill-pictures — little visual news bulletins
  const billPictures = {
    // a golden tail disappearing over the dune
    tailOverDune: `<svg viewBox="0 0 160 108">
      <rect x="0" y="0" width="160" height="108" rx="10" fill="#BFD9E2"/>
      <ellipse cx="80" cy="112" rx="110" ry="46" fill="#E3CBA4"/>
      <path d="M96 62 q18 -18 8 -34 q22 8 12 36 q-6 10 -20 -2Z" fill="#D9A441"/>
      <circle cx="118" cy="34" r="7" fill="#D9A441"/>
      <path d="M20 84 q10 -6 20 0 M48 90 q10 -6 20 0" stroke="#B98A5A" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`,
    // a smug golden shape on the beach below
    rockyOnBeach: `<svg viewBox="0 0 160 108">
      <rect x="0" y="0" width="160" height="108" rx="10" fill="#BFD9E2"/>
      <rect x="0" y="56" width="160" height="30" fill="#7FB5AE"/>
      <rect x="0" y="80" width="160" height="28" fill="#E3CBA4"/>
      <ellipse cx="80" cy="72" rx="30" ry="16" fill="#D9A441"/>
      <circle cx="104" cy="62" r="12" fill="#D9A441"/>
      <path d="M96 52 q-4 -8 4 -10 M112 52 q4 -8 -4 -10" stroke="#B8863B" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M100 66 q5 4 10 0" stroke="#4A3C2C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </svg>`,
  };

  // stickers — found things
  const stickers = {
    fluff: {
      label: 'A tuft of golden fluff from the fence wire',
      svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="26" fill="#E8C27A"/><path d="M30 40 q-12 -10 -6 -22 q12 2 14 14 M52 30 q0 -14 12 -18 q6 12 -4 20 M70 44 q12 -8 22 0 q-6 12 -18 8" fill="#D9A441"/></svg>`,
    },
    feather: {
      label: "One of Pearl's soft feathers",
      svg: `<svg viewBox="0 0 100 100"><path d="M50 88 q-26 -34 -8 -66 q10 -16 22 -6 q14 14 -2 44 q-6 16 -12 28Z" fill="#F2EDE2" stroke="#6E7B86" stroke-width="3"/><path d="M50 84 q2 -34 8 -58" stroke="#6E7B86" stroke-width="3" fill="none"/></svg>`,
    },
    apple: {
      label: 'The one apple the birds missed',
      svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="58" r="28" fill="#C96F5B"/><path d="M50 32 q-2 -12 6 -16" stroke="#8A6746" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="62" cy="24" rx="10" ry="6" fill="#6E9668" transform="rotate(24 62 24)"/></svg>`,
    },
    hairtie: {
      label: "Ella's spare hair tie",
      svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="26" fill="none" stroke="#E8896A" stroke-width="12"/><circle cx="50" cy="50" r="26" fill="none" stroke="#D9764F" stroke-width="12" stroke-dasharray="14 20"/></svg>`,
    },
    shell: {
      label: 'A shell from the beach where Rocky was found',
      svg: `<svg viewBox="0 0 100 100"><path d="M50 84 L22 46 q28 -32 56 0 Z" fill="#E3CBA4" stroke="#B98A5A" stroke-width="3"/><path d="M50 82 L36 48 M50 82 L50 44 M50 82 L64 48" stroke="#B98A5A" stroke-width="3" fill="none"/></svg>`,
    },
  };

  // title art: Rocky peeking over a fence
  function titleArt() {
    return `<svg viewBox="0 0 400 290" aria-hidden="true">
      <ellipse cx="200" cy="278" rx="190" ry="22" fill="#8FB98B"/>
      <g transform="translate(200 268) scale(0.86)">${cow('rocky')}</g>
      <g transform="translate(10 282)">${fence(380, false)}</g>
      <g transform="translate(48 40)">${butterfly()}</g>
    </svg>`;
  }

  return {
    C, cow, cleo, will, ella, pearl,
    fence, gate, hoofprints, bush, gumTree, cloud, butterfly, steppingStone,
    gumBranch, flowers, grassTuft, verandaHouse, sunGlow, hill, gym, hayBale, pumpkin,
    symbols, symbolWords, billPictures, stickers, titleArt,
  };
})();
