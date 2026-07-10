/* =========================================================================
   Scenes — the opening farm, the five-scene journey, and the open farm.

   Every scene keeps the promises of the design doc:
   - 5 to 9 interactive things, generously spaced.
   - One tap always answers. Two taps (who, then what) move the world.
   - Scenes complete when their small moment happens. Nothing can be
     done wrong, and nobody is ever hurried.
   ========================================================================= */

const Scenes = (() => {
  const E = Engine, A = Art, C = Art.C;
  const wait = E.wait;

  const ORDER = ['farm', 'paddock', 'creek', 'orchard', 'headland', 'beach'];

  const SCENE_NAMES = {
    farm: 'The farm', paddock: 'The paddock gate', creek: 'The creek',
    orchard: 'The orchard', headland: 'The headland', beach: 'The beach',
  };

  /* ---------------- shared bits ---------------- */

  function sky(top, bottom, groundColor, groundY = 640) {
    const id = 'g' + Math.random().toString(36).slice(2, 8);
    return `
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${top}"/>
          <stop offset="1" stop-color="${bottom}"/>
        </linearGradient>
      </defs>
      <rect x="-50" y="-50" width="1700" height="${groundY + 50}" fill="url(#${id})"/>
      <rect x="-50" y="${groundY}" width="1700" height="${1000 - groundY + 50}" style="fill:${groundColor}"/>`;
  }

  function clouds() {
    return `
      <g class="drifts"><g transform="translate(280 150)">${A.cloud(1.1)}</g></g>
      <g class="drifts" style="animation-duration:38s"><g transform="translate(1050 110)">${A.cloud(0.8)}</g></g>`;
  }

  // ---- standard reactions for the recurring cast ----

  function willReactions() {
    return [
      async (rec) => { await E.willSays('look'); },
      async (rec) => { // checks his phone, quietly pleased
        const ph = rec.el.querySelector('.phone');
        GameAudio.play('phoneClick');
        await E.animOnce(ph, 'hop-once', 700);
      },
      async (rec) => { // his quietly pleased smile — a gentle sway
        GameAudio.play('tinkle');
        await E.animOnce(rec.el.querySelector('.head'), 'wiggle-once', 900);
      },
    ];
  }

  function cleoReactions() {
    return [
      async (rec) => { // a wag
        GameAudio.play('wag');
        const tail = rec.el.querySelector('.tail');
        tail.classList.add('wagging');
        await wait(1400);
        tail.classList.remove('wagging');
      },
      async (rec) => { // a spin
        GameAudio.play('bark');
        await E.animOnce(rec.el.querySelector('.rocker'), 'spin-once', 1000);
      },
      async (rec) => { // an officious little bark at whoever is nearest
        GameAudio.play('barkBark');
        await E.animOnce(rec.el, 'hop-once', 700);
      },
    ];
  }

  function freddieReactions() {
    let brushed = 0;
    return [
      async (rec) => { // a calm, contented low
        GameAudio.play('cowLow');
        await E.animOnce(rec.el.querySelector('.head'), 'wiggle-once', 1100);
      },
      async (rec) => { // loves being brushed — taps grow blissful
        brushed++;
        GameAudio.play('brush');
        await E.animOnce(rec.el.querySelector('.fringe'), 'fringe-shake', 1000);
        if (brushed % 3 === 0) { GameAudio.play('cowLow'); }
      },
      async (rec) => { // tail swish
        GameAudio.play('step');
        await E.animOnce(rec.el.querySelector('.tail'), 'wiggle-once', 900);
      },
    ];
  }

  function rockyReactions() {
    return [
      async (rec) => { // the big unrepentant low
        GameAudio.play('cowLowBig');
        await E.animOnce(rec.el.querySelector('.head'), 'wiggle-once', 1200);
      },
      async (rec) => { // shakes his fringe
        GameAudio.play('brush');
        await E.animOnce(rec.el.querySelector('.fringe'), 'fringe-shake', 1000);
      },
      async (rec) => { // licks the screen — the signature moment
        GameAudio.play('splash');
        await lickScreen();
      },
    ];
  }

  function pearlReactions() {
    return [
      async (rec) => { GameAudio.play('billClap'); await E.animOnce(rec.el.querySelector('.bill'), 'wiggle-once', 900); },
      async (rec) => { GameAudio.play('wingbeat'); await E.animOnce(rec.el, 'hop-once', 700); },
      async (rec) => { await E.animOnce(rec.el.querySelector('.head'), 'wiggle-once', 900); },
    ];
  }

  // Rocky licks the screen: a big soft tongue sweeps up and away. Slow, silly.
  async function lickScreen() {
    const fx = document.getElementById('fx-layer');
    const g = E.gEl('');
    g.innerHTML = `<ellipse cx="800" cy="1400" rx="620" ry="480" style="fill:#E8A28A;opacity:0.92"/>
                   <ellipse cx="800" cy="1400" rx="420" ry="330" style="fill:#EFB4A0;opacity:0.9"/>`;
    g.style.transition = 'transform 1.1s ease-in-out';
    fx.appendChild(g);
    requestAnimationFrame(() => { g.style.transform = 'translateY(-720px)'; });
    await wait(1100);
    g.style.transition = 'transform 0.9s ease-in';
    g.style.transform = 'translateY(300px)';
    await wait(950);
    g.remove();
  }

  // Freddie is always half a beat behind Will
  function freddieFollows(delay = 900, offset = -230) {
    const f = E.state.chars.freddie, w = E.state.chars.will;
    if (!f || !w) return;
    setTimeout(() => {
      GameAudio.play('step');
      E.walkTo(f, w.x + offset, Math.min(w.y + 12, 960));
    }, delay);
  }

  // the way onward: a soft stone waymark; Cleo's look does the pointing
  function addWaymark(x, y, goNext) {
    const rec = E.addProp('waymark', {
      x, y, label: 'The path onward', tappable: true, hitR: 100,
      svg: `<ellipse cx="0" cy="0" rx="66" ry="26" style="fill:${C.sandstone};stroke:${C.tanDark};stroke-width:4"/>
            <ellipse cx="0" cy="-3" rx="42" ry="14" style="fill:${C.oat}"/>`,
      onTap: async () => { // tapping the path alone: Cleo shows the way
        const cleo = E.state.chars.cleo;
        if (cleo) {
          GameAudio.play('bark');
          await E.walkTo(cleo, x - 90, y - 6, 1.4);
          E.faceToward(cleo, -9999); // looks back: well, come on then
          GameAudio.play('barkBark');
        }
      },
    });
    E.pair('will>waymark', async () => {
      const w = E.state.chars.will;
      await E.willSays('go');
      await E.walkTo(w, x, y - 8);
      goNext();
    });
    E.setHints(['waymark']);
    return rec;
  }

  function advanceFrom(id) {
    const ix = ORDER.indexOf(id);
    const nextId = ORDER[(ix + 1) % ORDER.length];
    if (!E.save.storyDone) {
      E.save.sceneIndex = Math.max(E.save.sceneIndex, ix + 1);
      E.persist();
    }
    if (id === 'beach') {
      E.loadScene('farm', { mode: E.save.storyDone ? 'freeplay' : 'ending' });
    } else {
      E.loadScene(nextId);
    }
  }

  /* =========================================================
     SCENE: the farm — opening, ending and open-farm free play
     ========================================================= */

  E.registerScene('farm', {
    ambient: 'farm',
    async build(params) {
      const mode = params.mode
        || (E.save.storyDone ? 'freeplay' : 'opening');

      const apricot = mode === 'ending';
      E.background(
        sky(apricot ? '#E8B48C' : C.sky, apricot ? '#F2C29B' : '#D6E4DA', C.paddock, 620) +
        A.sunGlow(apricot ? 320 : 1310, 170, 70, apricot ? '#EFA76B' : '#F2DDA4') +
        clouds() +
        `<g transform="translate(120 620)">${A.verandaHouse()}</g>
         <g transform="translate(620 640)">${A.fence(560, !apricot && mode === 'opening')}</g>
         <g transform="translate(${mode === 'opening' ? 700 : 880} 780)">${A.flowers(5, 180)}</g>
         <g transform="translate(380 900)">${A.grassTuft()}</g>
         <g transform="translate(1380 940)">${A.grassTuft()}</g>`
      );

      // Rocky's spot by the fence — empty in the opening
      if (mode === 'opening') {
        E.background(`
          <ellipse cx="1010" cy="720" rx="120" ry="26" style="fill:${C.paddockDeep};opacity:0.7"/>
          <g transform="translate(1080 740)">${A.hoofprints(4, 58, 4, 10)}</g>`);
        E.addProp('hoofprints', {
          x: 1150, y: 760, label: 'Hoofprints leading through the fence', tappable: true, hitR: 110,
          svg: `<g style="opacity:0.001"><rect x="-100" y="-40" width="200" height="80"/></g>`,
          onTap: async () => { await E.willSays('look'); },
        });
        E.addProp('butterfly', {
          x: 1010, y: 660, label: 'A butterfly over Rocky’s empty spot', tappable: true, hitR: 80,
          svg: A.butterfly(),
          onTap: async (rec) => {
            GameAudio.play('tinkle');
            await E.animOnce(rec.el.querySelector('.flutters') || rec.el, 'hop-once', 700);
          },
        });
      }

      E.addProp('bush1', {
        x: mode === 'opening' ? 480 : 700, y: 860, label: 'A bush', tappable: true, hitR: 95,
        svg: A.bush(1),
        onTap: async (rec) => { GameAudio.play('brush'); await E.animOnce(rec.el, 'wiggle-once', 900); },
      });

      const will = E.addChar('will', {
        svg: A.will(), x: mode === 'opening' ? 430 : 510, y: 900, scale: 1.05,
        label: 'Will', reactions: willReactions(),
      });
      E.addChar('cleo', {
        svg: A.cleo(), x: 560, y: 920, scale: 0.95,
        label: 'Cleo the dog', reactions: cleoReactions(),
      });
      E.addChar('freddie', {
        svg: A.cow('freddie'), x: 820, y: 930, scale: 0.82, facing: -1,
        label: 'Freddie the highland cow', reactions: freddieReactions(),
      });

      if (mode !== 'opening') {
        // Rocky is home. All is well.
        E.addChar('rocky', {
          svg: A.cow('rocky'), x: 1120, y: 930, scale: 0.85, facing: -1,
          label: 'Rocky the highland cow', reactions: rockyReactions(),
        });
        // Ella's corner: the little outdoor gym near the barn
        E.background(`<g transform="translate(240 950)">${A.gym()}</g>`);
        E.addProp('haybale', {
          x: 90, y: 950, label: 'A hay bale', tappable: true, hitR: 80,
          svg: A.hayBale(),
          onTap: async (rec) => { GameAudio.play('thump'); await E.animOnce(rec.el, 'hop-once', 700); },
        });
        const ella = E.addChar('ella', {
          svg: A.ella('stand'), x: 300, y: 900, scale: 1.02, facing: -1,
          label: 'Ella', reactions: [
            async (rec) => { // flexes with a wink
              GameAudio.play('bump');
              await E.animOnce(rec.el.querySelector('.torso'), 'wiggle-once', 900);
            },
            async (rec) => { // offers Will a high-five; he returns it
              GameAudio.play('bump');
              await E.animOnce(rec.el, 'hop-once', 700);
              const w = E.state.chars.will;
              if (w) await E.animOnce(w.el, 'hop-once', 700);
            },
            async (rec) => { // a slow, serene overhead press of whatever is nearest
              E.setPose(rec, A.ella('lift'));
              const nearHay = Math.random() > 0.18;
              const lifted = E.gEl('');
              lifted.innerHTML = nearHay ? A.hayBale() : A.pumpkin();
              lifted.setAttribute('transform', 'translate(0 -215)');
              rec.flip.appendChild(lifted);
              GameAudio.play('thump');
              await wait(2600);
              lifted.remove();
              E.setPose(rec, A.ella('stand'));
              GameAudio.play('bump');
            },
          ],
        });
        // re-add ella hit bindings lost by outerHTML swaps? bindings are on outer group — safe.
      }

      // the gap in the fence — the call to adventure
      if (mode === 'opening') {
        E.addProp('gap', {
          x: 1330, y: 900, label: 'The gap in the fence where the hoofprints lead', tappable: true, hitR: 120,
          svg: `<g style="opacity:0.9">
                  <ellipse cx="0" cy="6" rx="80" ry="22" style="fill:${C.paddockDeep};opacity:0.6"/>
                  ${A.hoofprints(3, 46, -6, 8)}
                </g>`,
          onTap: async () => {
            const cleo = E.state.chars.cleo;
            if (cleo) {
              GameAudio.play('bark');
              await E.walkTo(cleo, 1240, 916, 1.4);
              E.faceToward(cleo, -9999);
              GameAudio.play('barkBark');
            }
          },
        });
        E.pair('will>gap', async () => {
          await E.willSays('go');
          await E.walkTo(will, 1310, 906);
          freddieFollows(300);
          await wait(700);
          advanceFrom('farm');
        });
        E.setHints(['gap']);
      } else {
        addWaymark(1440, 930, () => E.loadScene('paddock'));
      }

      // friendly pairs available everywhere the cast is together
      E.pair('freddie>will', async () => {
        const f = E.state.chars.freddie, w = E.state.chars.will;
        await E.walkTo(f, w.x - 150, w.y + 16);
        GameAudio.play('cowLow');
        await E.animOnce(f.el.querySelector('.rocker'), 'wiggle-once', 1100);
      });
      E.pair('cleo>bush1', async () => {
        const c = E.state.chars.cleo;
        await E.walkTo(c, E.state.props.bush1.x + 20, 890);
        GameAudio.play('brush');
        await E.animOnce(E.state.props.bush1.el, 'wiggle-once', 900);
        GameAudio.play('bark');
      });
    },

    async intro(params) {
      const mode = params.mode || (E.save.storyDone ? 'freeplay' : 'opening');
      if (mode === 'opening' && E.save.sceneIndex === 0) {
        // Cleo runs to the gap and looks back. That look is the whole call.
        await wait(700);
        const cleo = E.state.chars.cleo;
        GameAudio.play('bark');
        await E.walkTo(cleo, 1240, 916, 1.7);
        E.faceToward(cleo, -9999);
        GameAudio.play('barkBark');
      } else if (mode === 'ending') {
        // everyone walks home together as the light turns apricot
        const { will, cleo, freddie, rocky } = E.state.chars;
        E.placeAt(will, 1700, 900); E.placeAt(cleo, 1820, 920);
        E.placeAt(freddie, 1960, 930); if (rocky) E.placeAt(rocky, 2100, 930);
        await wait(400);
        E.walkTo(will, 600, 900, 4);
        setTimeout(() => E.walkTo(cleo, 520, 920, 4), 500);
        setTimeout(() => E.walkTo(freddie, 860, 930, 4.4), 900);
        if (rocky) setTimeout(() => E.walkTo(rocky, 1120, 930, 4.6), 1300);
        await wait(4600);
        await E.willSays('home');
        GameAudio.play('cowLowBig');
        if (!E.save.storyDone) {
          E.save.storyDone = true;
          E.persist();
          document.getElementById('btn-map').hidden = false;
        }
      }
    },
  });

  /* =========================================================
     SCENE 1: the paddock gate
     ========================================================= */

  E.registerScene('paddock', {
    ambient: 'farm',
    async build() {
      E.background(
        sky(C.sky, '#D6E4DA', C.paddock, 600) +
        A.sunGlow(1340, 150, 64, '#F2DDA4') +
        clouds() +
        A.hill(200, 620, 500, 110, C.paddockDeep) +
        A.hill(1400, 640, 560, 130, '#86AF82') +
        `<g transform="translate(360 700)">${A.fence(430)}</g>
         <g transform="translate(300 850)">${A.flowers(4, 130)}</g>
         <g transform="translate(1300 960)">${A.grassTuft()}</g>
         <g transform="translate(150 940)">${A.grassTuft()}</g>
         <g transform="translate(880 780)">${A.hoofprints(4, 66, 10, 14)}</g>`
      );

      // the gate
      const gateRec = E.addProp('gate', {
        x: 1020, y: 700, label: 'The paddock gate', tappable: true, hitR: 120,
        svg: A.gate(),
        onTap: async (rec) => { GameAudio.play('gate'); await E.animOnce(rec.el, 'wiggle-once', 900); },
      });

      // golden fluff caught on the wire — the first found thing
      E.addProp('fluff', {
        x: 950, y: 660, label: 'A tuft of golden fluff caught on the fence', tappable: true, hitR: 85,
        svg: `<g class="sways">
                <path d="M0 0 q-10 -14 -2 -26 q10 -8 18 2 q10 -6 12 8 q2 14 -12 16 q-12 4 -16 0Z" style="fill:${C.rockyLight};stroke:${C.rocky};stroke-width:3"/>
              </g>`,
        onTap: async (rec) => {
          if (!E.hasSticker('fluff')) {
            await E.willSays('found');
            await E.awardSticker('fluff', 950, 660);
            rec.el.style.transition = 'opacity 1s ease';
            rec.el.style.opacity = '0';
            setTimeout(() => rec.el.remove(), 1100);
            maybeOpenWay();
          } else {
            GameAudio.play('tinkle');
            await E.animOnce(rec.el, 'wiggle-once', 900);
          }
        },
      });

      E.addProp('bushP', {
        x: 210, y: 800, label: 'A bush', tappable: true, hitR: 95,
        svg: A.bush(0.9),
        onTap: async (rec) => { GameAudio.play('brush'); await E.animOnce(rec.el, 'wiggle-once', 900); },
      });

      const will = E.addChar('will', {
        svg: A.will(), x: 330, y: 920, scale: 1.05, label: 'Will', reactions: willReactions(),
      });
      E.addChar('cleo', {
        svg: A.cleo(), x: 480, y: 940, scale: 0.95, label: 'Cleo the dog', reactions: cleoReactions(),
      });
      E.addChar('freddie', {
        svg: A.cow('freddie'), x: 140, y: 950, scale: 0.85, label: 'Freddie the highland cow', reactions: freddieReactions(),
      });

      let gateOpen = false;
      const maybeOpenWay = () => {
        if (gateOpen && !E.state.props.waymark) {
          addWaymark(1420, 940, () => advanceFrom('paddock'));
        }
      };

      E.pair('will>gate', async () => {
        await E.walkTo(will, 900, 930);
        freddieFollows();
        await E.willSays('open');
        GameAudio.play('gate');
        const leaf = gateRec.el.querySelector('.gate-leaf');
        leaf.style.transform = 'rotate(-64deg)';
        gateOpen = true;
        await wait(1600);
        maybeOpenWay();
      });
      E.pair('cleo>gate', async () => {
        const c = E.state.chars.cleo;
        await E.walkTo(c, 960, 950, 1.5);
        GameAudio.play('barkBark');
        await E.animOnce(c.el, 'hop-once', 700);
      });
      E.pair('will>fluff', async () => {
        await E.walkTo(will, 880, 920);
        freddieFollows();
        await E.state.props.fluff.onTap(E.state.props.fluff);
      });
      E.pair('cleo>bushP', async () => {
        const c = E.state.chars.cleo;
        await E.walkTo(c, 260, 850, 1.4);
        GameAudio.play('brush');
        await E.animOnce(E.state.props.bushP.el, 'wiggle-once', 900);
        GameAudio.play('bark');
        // a clue flushed out: hoofprints appear
        E.background(`<g transform="translate(330 880)">${A.hoofprints(3, 60, 6, 10)}</g>`);
      });

      E.setHints(['fluff', 'gate']);
    },
  });

  /* =========================================================
     SCENE 2: the creek
     ========================================================= */

  E.registerScene('creek', {
    ambient: 'creek',
    async build() {
      E.background(
        sky(C.sky, '#D9E6DE', C.paddock, 560) +
        clouds() +
        A.hill(300, 580, 520, 100, C.paddockDeep) +
        // the creek: a soft teal band curving through
        `<path d="M-50 700 Q 400 640 800 700 T 1650 690 L1650 850 Q 1200 900 800 850 T -50 860 Z" style="fill:${C.sea}"/>
         <path d="M-50 730 Q 500 690 900 740 T 1650 730" style="fill:none;stroke:${C.paper};stroke-width:5;opacity:0.35"/>
         <g transform="translate(180 680)">${A.grassTuft()}</g>
         <g transform="translate(1430 970)">${A.grassTuft()}</g>
         <g transform="translate(1240 660)">${A.flowers(3, 90)}</g>`
      );

      // muddy evidence: Rocky stopped for a drink and a magnificent roll
      E.addProp('mud', {
        x: 320, y: 660, label: 'A muddy patch where somebody had a lovely roll', tappable: true, hitR: 110,
        svg: `<ellipse cx="0" cy="0" rx="105" ry="30" style="fill:${C.mud};opacity:0.85"/>
              ${A.hoofprints(3, 54, -4, -8)}`,
        onTap: async (rec) => {
          GameAudio.play('splash');
          await E.animOnce(rec.el, 'wiggle-once', 900);
          await E.willSays('look');
        },
      });

      // stepping stones
      const stoneXs = [560, 730, 900, 1070];
      stoneXs.forEach((sx, i) => {
        E.addProp(`stone${i}`, {
          x: sx, y: 790 - (i % 2) * 26, label: `Stepping stone ${i + 1}`, tappable: true, hitR: 85,
          svg: A.steppingStone(46),
          onTap: async (rec) => {
            GameAudio.play('stone');
            await E.animOnce(rec.el, 'hop-once', 700);
            await hopAcross(i);
          },
        });
      });

      const will = E.addChar('will', {
        svg: A.will(), x: 320, y: 940, scale: 1.05, label: 'Will', reactions: willReactions(),
      });
      E.addChar('cleo', {
        svg: A.cleo(), x: 430, y: 950, scale: 0.95, label: 'Cleo the dog', reactions: cleoReactions(),
      });
      E.addChar('freddie', {
        svg: A.cow('freddie'), x: 90, y: 960, scale: 0.85, label: 'Freddie the highland cow', reactions: freddieReactions(),
      });

      let hopped = -1, crossed = false;
      async function hopAcross(uptoIx) {
        if (crossed) return;
        // Will hops stone to stone — any tapped stone carries him that far
        for (let i = hopped + 1; i <= uptoIx; i++) {
          const s = E.state.props[`stone${i}`];
          GameAudio.play('stone');
          await E.walkTo(will, s.x, s.y + 40, 1.0);
          await E.animOnce(will.el.querySelector('.rocker'), 'hop-once', 700);
          hopped = i;
        }
        if (hopped === stoneXs.length - 1) {
          crossed = true;
          GameAudio.play('splash');
          await E.walkTo(will, 1260, 930, 1.4);
          // Cleo splashes straight across, Freddie wades with dignity
          const c = E.state.chars.cleo, f = E.state.chars.freddie;
          E.walkTo(c, 1180, 950, 2.2).then(() => GameAudio.play('bark'));
          setTimeout(() => { GameAudio.play('splash'); E.walkTo(f, 1050, 960, 3.2); }, 900);
          await wait(1300);
          await pearlArrives();
        }
      }

      E.pair('will>stone0', () => hopAcross(0));
      E.pair('will>stone1', () => hopAcross(1));
      E.pair('will>stone2', () => hopAcross(2));
      E.pair('will>stone3', () => hopAcross(3));
      E.pair('will>mud', async () => {
        await E.walkTo(will, 430, 700);
        await E.willSays('look');
        GameAudio.play('splash');
      });
      E.pair('cleo>mud', async () => {
        const c = E.state.chars.cleo;
        await E.walkTo(c, 400, 700, 1.4);
        GameAudio.play('splash');
        await E.animOnce(c.el.querySelector('.rocker'), 'spin-once', 1000);
        GameAudio.play('barkBark');
      });

      async function pearlArrives() {
        if (E.state.chars.pearl) return;
        // Pearl glides in with her first bill-picture of news
        const pearl = E.addChar('pearl', {
          svg: A.pearl('fly'), x: 1900, y: 300, scale: 0.9, facing: -1,
          label: 'Pearl the pelican', reactions: pearlReactions(),
        });
        GameAudio.play('wingbeat');
        await E.walkTo(pearl, 1380, 820, 2.6);
        E.setPose(pearl, A.pearl('stand'));
        GameAudio.play('billClap');
        await wait(400);
        await E.pearlShows('tailOverDune');
        // she leaves a soft feather behind
        if (!E.hasSticker('feather')) {
          E.addProp('featherDrop', {
            x: 1330, y: 890, label: 'A soft pelican feather', tappable: true, hitR: 85,
            svg: `<g class="sways"><path d="M0 0 q-14 -20 -4 -40 q8 -10 14 -2 q8 10 -2 28 q-4 8 -8 14Z"
                    style="fill:${C.pearl};stroke:${C.slate};stroke-width:3"/></g>`,
            onTap: async (rec) => {
              await E.awardSticker('feather', 1330, 890);
              rec.el.style.transition = 'opacity 1s ease'; rec.el.style.opacity = '0';
              setTimeout(() => rec.el.remove(), 1100);
            },
          });
        }
        addWaymark(1500, 960, () => advanceFrom('creek'));
      }

      E.setHints(['stone0', 'mud']);
    },
  });

  /* =========================================================
     SCENE 3: the orchard
     ========================================================= */

  E.registerScene('orchard', {
    ambient: 'farm',
    async build() {
      E.background(
        sky(C.sky, '#DCE7D9', C.paddock, 620) +
        clouds() +
        A.hill(1400, 650, 540, 120, '#86AF82') +
        // the trail leads toward the dunes: sand creeping in at right
        `<path d="M1250 1000 Q1350 880 1650 850 L1650 1000Z" style="fill:${C.sandstone}"/>
         <g transform="translate(1180 900)">${A.hoofprints(4, 62, 10, 18)}</g>
         <g transform="translate(240 970)">${A.grassTuft()}</g>`
      );

      // evidence: nibbled low branches — apple cores on the grass
      E.background(`
        <g transform="translate(560 900)" style="opacity:0.8">
          <path d="M-8 0 q-6 -18 8 -20 q12 2 8 20 q-4 8 -16 0Z" style="fill:${C.paper};stroke:${C.tanDark};stroke-width:2.5"/>
        </g>
        <g transform="translate(840 930)" style="opacity:0.8">
          <path d="M-8 0 q-6 -18 8 -20 q12 2 8 20 q-4 8 -16 0Z" style="fill:${C.paper};stroke:${C.tanDark};stroke-width:2.5"/>
        </g>`);

      const treeXs = [430, 780, 1120];
      let applesDropped = 0;
      treeXs.forEach((tx, i) => {
        E.addProp(`tree${i}`, {
          x: tx, y: 840, scale: 1.15, label: 'An apple tree', tappable: true, hitR: 150,
          svg: A.gumTree(1, true),
          onTap: async (rec) => {
            GameAudio.play('birds');
            // birds scatter
            rec.el.querySelectorAll('.bird').forEach((b, bi) => {
              b.style.transition = 'transform 2.4s ease, opacity 2.4s ease';
              b.style.transform = `translate(${(bi ? 1 : -1) * 260}px, -300px)`;
              b.style.opacity = '0';
              setTimeout(() => { b.style.transition = 'none'; b.style.transform = ''; b.style.opacity = ''; }, 6000);
            });
            await E.animOnce(rec.el.querySelector('.sways'), 'wiggle-once', 900);
            // fruit drops
            const apples = [...rec.el.querySelectorAll('.apple')].filter(a => !a.dataset.dropped);
            if (apples.length) {
              const a = apples[0];
              a.dataset.dropped = '1';
              a.style.transition = 'transform 1.2s cubic-bezier(0.3,0,0.7,1)';
              a.style.transform = `translateY(${(940 - 840) / 1.15 + 208}px)`;
              await wait(1200);
              GameAudio.play('plop');
              applesDropped++;
              // Cleo attempts management
              const c = E.state.chars.cleo;
              if (c && applesDropped % 2 === 1) {
                E.walkTo(c, tx + 90, 940, 1.6).then(() => GameAudio.play('barkBark'));
              }
              if (applesDropped >= 2 && !E.state.props.lostApple && !E.hasSticker('apple')) {
                E.addProp('lostApple', {
                  x: 660, y: 950, label: 'The one apple the birds missed', tappable: true, hitR: 80,
                  svg: `<circle cx="0" cy="-12" r="15" style="fill:${C.appleRed}"/>
                        <rect x="-2" y="-32" width="4" height="9" rx="2" style="fill:${C.woodDark}"/>`,
                  onTap: async (rec2) => {
                    await E.willSays('found');
                    await E.awardSticker('apple', 660, 950);
                    rec2.el.style.transition = 'opacity 1s ease'; rec2.el.style.opacity = '0';
                    setTimeout(() => rec2.el.remove(), 1100);
                    if (!E.state.props.waymark) addWaymark(1480, 940, () => advanceFrom('orchard'));
                  },
                });
                E.setHints(['lostApple']);
              }
            }
          },
        });
      });

      const will = E.addChar('will', {
        svg: A.will(), x: 310, y: 930, scale: 1.05, label: 'Will', reactions: willReactions(),
      });
      E.addChar('cleo', {
        svg: A.cleo(), x: 380, y: 950, scale: 0.95, label: 'Cleo the dog', reactions: cleoReactions(),
      });
      E.addChar('freddie', {
        svg: A.cow('freddie'), x: 60, y: 955, scale: 0.85, label: 'Freddie the highland cow', reactions: freddieReactions(),
      });

      treeXs.forEach((tx, i) => {
        E.pair(`will>tree${i}`, async () => {
          await E.walkTo(will, tx - 140, 935);
          freddieFollows();
          await E.state.props[`tree${i}`].onTap(E.state.props[`tree${i}`]);
        });
        E.pair(`cleo>tree${i}`, async () => {
          const c = E.state.chars.cleo;
          await E.walkTo(c, tx + 80, 945, 1.5);
          GameAudio.play('barkBark');
          await E.animOnce(c.el, 'hop-once', 700);
          await E.state.props[`tree${i}`].onTap(E.state.props[`tree${i}`]);
        });
      });

      // revisits: the way onward is already open if the apple was found before
      if (E.hasSticker('apple') && !E.state.props.waymark) {
        addWaymark(1480, 940, () => advanceFrom('orchard'));
      }

      E.setHints(['tree0', 'tree1', 'tree2']);
    },
  });

  /* =========================================================
     SCENE 4: the headland — wind, wildflowers, and Ella
     ========================================================= */

  E.registerScene('headland', {
    ambient: 'headland',
    async build() {
      E.background(
        sky('#B5D3DE', '#E4E9D8', C.paddock, 680) +
        clouds() +
        // the sea far below the cliff edge
        `<rect x="1250" y="560" width="400" height="130" style="fill:${C.sea}"/>
         <path d="M1250 560 L1650 560" style="stroke:${C.paper};stroke-width:4;opacity:0.4"/>
         <path d="M1250 690 L1650 690 L1650 1000 L1380 1000 Q1300 840 1250 690Z" style="fill:${C.sandstone}"/>` +
        `<g transform="translate(300 760)">${A.flowers(6, 260)}</g>
         <g transform="translate(700 820)">${A.flowers(5, 200)}</g>
         <g transform="translate(180 950)">${A.grassTuft()}</g>
         <g transform="translate(1000 960)">${A.grassTuft()}</g>
         <g transform="translate(1100 700)">${A.fence(180)}</g>`
      );

      // the fallen gum branch across the gate — the one thing two taps can't move
      const branch = E.addProp('branch', {
        x: 1180, y: 880, label: 'A big fallen gum branch across the track', tappable: true, hitR: 150,
        svg: A.gumBranch(),
        onTap: async () => { await branchAttempt('solo'); },
      });

      const will = E.addChar('will', {
        svg: A.will(), x: 360, y: 930, scale: 1.05, label: 'Will', reactions: willReactions(),
      });
      const cleo = E.addChar('cleo', {
        svg: A.cleo(), x: 470, y: 950, scale: 0.95, label: 'Cleo the dog', reactions: cleoReactions(),
      });
      const freddie = E.addChar('freddie', {
        svg: A.cow('freddie'), x: 120, y: 955, scale: 0.85, label: 'Freddie the highland cow', reactions: freddieReactions(),
      });

      let attempts = 0, cameoDone = false, cameoRunning = false;

      async function branchAttempt(who) {
        if (cameoDone || cameoRunning) {
          GameAudio.play('brush');
          await E.animOnce(branch.el, 'wiggle-once', 900);
          return;
        }
        attempts++;
        if (attempts === 1) {
          // Cleo barks at it, outraged
          GameAudio.play('bark');
          await E.walkTo(cleo, 1050, 950, 1.6);
          GameAudio.play('barkBark');
          await E.animOnce(cleo.el, 'hop-once', 700);
          GameAudio.play('barkBark');
        } else if (attempts === 2) {
          // Freddie contemplates it
          await E.walkTo(freddie, 960, 960, 2.2);
          GameAudio.play('cowLow');
          await E.animOnce(freddie.el.querySelector('.head'), 'wiggle-once', 1200);
        } else {
          await ellaCameo();
        }
      }

      E.pair('will>branch', async () => {
        await E.walkTo(will, 1000, 935);
        await E.willSays('help');
        await branchAttempt('will');
      });
      E.pair('cleo>branch', () => branchAttempt('cleo'));
      E.pair('freddie>branch', () => branchAttempt('freddie'));

      async function ellaCameo() {
        if (cameoRunning || cameoDone) return;
        cameoRunning = true;
        E.setHints([]); // the branch stops being the gentle suggestion
        const halo = branch.el.querySelector('.shimmer-halo');
        if (halo) halo.remove();
        branch.el.classList.remove('shimmering');
        // Ella jogs into frame — she runs this track every morning
        const ella = E.addChar('ella', {
          svg: A.ella('jog'), x: -160, y: 940, scale: 1.02,
          label: 'Ella', reactions: [
            async (rec) => { GameAudio.play('bump'); await E.animOnce(rec.el, 'hop-once', 700); },
          ],
        });
        await E.walkTo(ella, 1060, 935, 2.6);
        E.setPose(ella, A.ella('lift'));
        await wait(500);
        // animate the branch's inner group — the outer group's transform
        // attribute (its position) must not be overridden by a CSS transform
        const wood = branch.el.firstElementChild;
        // the branch goes up like a warm-up set…
        wood.style.transition = 'transform 1.6s ease';
        wood.style.transform = 'translate(0px, -190px)';
        await wait(1700);
        // …and is placed neatly off the path
        wood.style.transition = 'transform 1.8s ease';
        wood.style.transform = 'translate(240px, 60px) rotate(8deg)';
        await wait(1850);
        GameAudio.play('thump'); // her one sound: satisfying, unhurried
        E.setPose(ella, A.ella('stand'));
        // fist-bump with Will — no dialogue, one perfect character note
        await E.walkTo(ella, will.x + 120, 935, 1.6);
        GameAudio.play('bump');
        await E.animOnce(ella.el, 'hop-once', 700);
        await E.animOnce(will.el, 'hop-once', 700);
        // Will's face afterwards is canon: "I knew it."
        await E.animOnce(will.el.querySelector('.head'), 'wiggle-once', 900);
        // and she jogs on
        E.setPose(ella, A.ella('jog'));
        await E.walkTo(ella, 1900, 930, 2.8);
        ella.el.remove();
        delete E.state.chars.ella;
        cameoDone = true; cameoRunning = false;

        // she leaves her spare hair tie where she stood
        if (!E.hasSticker('hairtie')) {
          E.addProp('hairtieDrop', {
            x: 1060, y: 950, label: "Ella's spare hair tie", tappable: true, hitR: 80,
            svg: `<circle cx="0" cy="-8" r="13" style="fill:none;stroke:${C.coral};stroke-width:7"/>`,
            onTap: async (rec) => {
              await E.awardSticker('hairtie', 1060, 950);
              rec.el.style.transition = 'opacity 1s ease'; rec.el.style.opacity = '0';
              setTimeout(() => rec.el.remove(), 1100);
            },
          });
        }
        await pearlNews();
      }

      async function pearlNews() {
        // Pearl glides in and shows what she's seen on the beach below
        const pearl = E.addChar('pearl', {
          svg: A.pearl('fly'), x: 1900, y: 260, scale: 0.9, facing: -1,
          label: 'Pearl the pelican', reactions: pearlReactions(),
        });
        GameAudio.play('wingbeat');
        await E.walkTo(pearl, 800, 830, 2.6);
        E.setPose(pearl, A.pearl('stand'));
        GameAudio.play('billClap');
        await wait(400);
        await E.pearlShows('rockyOnBeach');
        await E.willSays('go');
        addWaymark(1330, 940, () => advanceFrom('headland'));
      }

      E.setHints(['branch']);
    },
  });

  /* =========================================================
     SCENE 5: the beach — the reunion
     ========================================================= */

  E.registerScene('beach', {
    ambient: 'beach',
    async build() {
      E.background(
        sky('#BFD9E2', '#E8D9BD', C.sandstone, 760) +
        A.sunGlow(1290, 160, 66, '#F2DDA4') +
        clouds() +
        `<rect x="-50" y="560" width="1700" height="220" style="fill:${C.sea}"/>
         <path d="M-50 560 L1650 560" style="stroke:${C.paper};stroke-width:5;opacity:0.4"/>
         <path d="M-50 760 Q 400 738 800 760 T 1650 758 L1650 790 Q 1200 812 800 790 T -50 800 Z"
               style="fill:${C.paper};opacity:0.5"/>`
      );

      // the water — tap it and Pearl dives for fish, forever, correctly
      E.addProp('water', {
        x: 500, y: 650, label: 'The sea. Tap it and Pearl dives for fish.', tappable: true, hitR: 160,
        svg: `<g style="opacity:0.001"><rect x="-300" y="-90" width="600" height="180"/></g>`,
        onTap: () => pearlDives(),
      });

      // shells on the sand
      E.addProp('shell', {
        x: 380, y: 900, label: 'A shell on the sand', tappable: true, hitR: 80,
        svg: `<path d="M0 6 L-18 -18 q18 -20 36 0 Z" style="fill:${C.oat};stroke:${C.tanDark};stroke-width:3"/>`,
        onTap: async (rec) => {
          if (!E.hasSticker('shell')) {
            await E.awardSticker('shell', 380, 900);
          } else {
            GameAudio.play('tinkle');
            await E.animOnce(rec.el, 'wiggle-once', 900);
          }
        },
      });

      // Rocky: ankle-deep in the shallows, entirely unrepentant
      const rocky = E.addChar('rocky', {
        svg: A.cow('rocky'), x: 1150, y: 800, scale: 0.95, facing: -1,
        label: 'Rocky the highland cow, found at last', reactions: rockyReactions(),
      });

      // curious pelicans in attendance
      E.addChar('pearl', {
        svg: A.pearl('stand'), x: 740, y: 845, scale: 0.9,
        label: 'Pearl the pelican', reactions: pearlReactions(),
      });
      E.addProp('pelican2', {
        x: 1380, y: 820, label: 'A curious pelican', tappable: true, hitR: 95,
        svg: `<g transform="scale(-0.75 0.75)">${A.pearl('stand')}</g>`,
        onTap: async (rec) => { GameAudio.play('billClap'); await E.animOnce(rec.el, 'wiggle-once', 900); },
      });

      const will = E.addChar('will', {
        svg: A.will(), x: 300, y: 930, scale: 1.05, label: 'Will', reactions: willReactions(),
      });
      E.addChar('cleo', {
        svg: A.cleo(), x: 420, y: 945, scale: 0.95, label: 'Cleo the dog', reactions: cleoReactions(),
      });
      E.addChar('freddie', {
        svg: A.cow('freddie'), x: 70, y: 950, scale: 0.85, label: 'Freddie the highland cow', reactions: freddieReactions(),
      });

      let reunionDone = false;

      async function pearlDives() {
        const p = E.state.chars.pearl;
        if (!p) return;
        GameAudio.play('wingbeat');
        E.setPose(p, A.pearl('fly'));
        await E.walkTo(p, 620, 380, 1.6);
        await E.walkTo(p, 540, 640, 0.9);
        GameAudio.play('splash');
        await wait(700);
        E.setPose(p, A.pearl('stand'));
        // up she comes, fish in bill
        const fish = E.gEl('');
        fish.innerHTML = `<ellipse cx="60" cy="-138" rx="14" ry="6" style="fill:${C.slate}"/>
                          <path d="M72 -138 l10 -6 0 12Z" style="fill:${C.slate}"/>`;
        p.flip.appendChild(fish);
        await E.walkTo(p, 740, 845, 1.6);
        GameAudio.play('billClap');
        await wait(1400);
        fish.remove();
      }

      // THE REUNION: tap Will, tap Rocky.
      E.pair('will>rocky', async () => {
        if (reunionDone) {
          await E.walkTo(will, rocky.x - 170, 930);
          GameAudio.play('cowLowBig');
          return;
        }
        reunionDone = true;
        await E.willSays('found');
        await E.walkTo(will, rocky.x - 160, 920, 2.6);
        // Will leans his head against Rocky's shaggy side — slowly
        will.flip.style.transition = 'transform 1.4s ease';
        will.flip.setAttribute('transform', `scale(${will.scale} ${will.scale}) rotate(8)`);
        GameAudio.play('cowLowBig');
        // Freddie arrives half a beat later and leans on the other side
        const f = E.state.chars.freddie;
        await wait(900);
        GameAudio.play('step');
        await E.walkTo(f, rocky.x + 210, 940, 3);
        E.faceToward(f, -9999);
        GameAudio.play('cowLow');
        await wait(1200);
        // the light turns apricot — slowly, softly
        const fx = document.getElementById('fx-layer');
        const glow = E.gEl('');
        glow.innerHTML = `<rect x="-50" y="-50" width="1700" height="1100" style="fill:#EFA76B"/>`;
        glow.style.opacity = '0';
        glow.style.transition = 'opacity 4s ease';
        glow.style.pointerEvents = 'none';
        fx.appendChild(glow);
        requestAnimationFrame(() => { glow.style.opacity = '0.22'; });
        await wait(2000);
        will.flip.setAttribute('transform', `scale(${will.scale} ${will.scale})`);
        await wait(1450);
        will.flip.style.transition = '';
        // and everyone walks home together
        addWaymark(120, 970, () => {
          document.getElementById('fx-layer').innerHTML = '';
          advanceFrom('beach');
        });
        const c = E.state.chars.cleo;
        GameAudio.play('bark');
        await E.walkTo(c, 240, 960, 1.8);
        E.faceToward(c, 9999);
      });

      E.pair('cleo>rocky', async () => {
        const c = E.state.chars.cleo;
        await E.walkTo(c, rocky.x - 130, 950, 1.8);
        GameAudio.play('barkBark'); // the manager expresses a view
        await E.animOnce(c.el, 'hop-once', 700);
        GameAudio.play('cowLowBig'); // Rocky remains unrepentant
        await E.animOnce(rocky.el.querySelector('.fringe'), 'fringe-shake', 1000);
      });
      E.pair('freddie>rocky', async () => {
        const f = E.state.chars.freddie;
        await E.walkTo(f, rocky.x + 230, 945, 2.6);
        E.faceToward(f, -9999);
        GameAudio.play('cowLow');
        await wait(400);
        GameAudio.play('cowLowBig');
      });
      E.pair('pearl>water', () => pearlDives());
      E.pair('pearl>rocky', async () => {
        const p = E.state.chars.pearl;
        await E.walkTo(p, rocky.x - 140, 850, 1.8);
        GameAudio.play('billClap');
        await E.animOnce(p.el.querySelector('.bill'), 'wiggle-once', 900);
      });

      E.setHints(['rocky', 'water']);
    },
  });

  /* ---------------- map thumbnails for free play ---------------- */

  const THUMBS = {
    farm: `<svg viewBox="0 0 160 120"><rect width="160" height="120" fill="#BFD9E2"/><rect y="70" width="160" height="50" fill="#8FB98B"/><path d="M30 70 L60 46 L90 70Z" fill="#9A6B4F"/><rect x="38" y="70" width="44" height="28" fill="#E8D9BD"/><circle cx="122" cy="84" r="14" fill="#D9A441"/></svg>`,
    paddock: `<svg viewBox="0 0 160 120"><rect width="160" height="120" fill="#BFD9E2"/><rect y="66" width="160" height="54" fill="#8FB98B"/><path d="M20 78 h120 M20 94 h120" stroke="#A9805A" stroke-width="6"/><rect x="24" y="70" width="6" height="34" fill="#8A6746"/><rect x="76" y="70" width="6" height="34" fill="#8A6746"/><rect x="128" y="70" width="6" height="34" fill="#8A6746"/></svg>`,
    creek: `<svg viewBox="0 0 160 120"><rect width="160" height="120" fill="#BFD9E2"/><rect y="60" width="160" height="60" fill="#8FB98B"/><path d="M0 80 Q40 70 80 82 T160 80 L160 104 Q120 112 80 104 T0 106Z" fill="#7FB5AE"/><ellipse cx="60" cy="92" rx="12" ry="5" fill="#B9AF9C"/><ellipse cx="100" cy="88" rx="12" ry="5" fill="#B9AF9C"/></svg>`,
    orchard: `<svg viewBox="0 0 160 120"><rect width="160" height="120" fill="#BFD9E2"/><rect y="76" width="160" height="44" fill="#8FB98B"/><rect x="46" y="52" width="8" height="30" fill="#A9805A"/><circle cx="50" cy="42" r="22" fill="#6E9668"/><circle cx="42" cy="38" r="4" fill="#C96F5B"/><rect x="106" y="52" width="8" height="30" fill="#A9805A"/><circle cx="110" cy="42" r="22" fill="#5B8156"/><circle cx="118" cy="46" r="4" fill="#C96F5B"/></svg>`,
    headland: `<svg viewBox="0 0 160 120"><rect width="160" height="120" fill="#B5D3DE"/><rect x="100" y="56" width="60" height="18" fill="#7FB5AE"/><path d="M0 74 L160 74 L160 120 L0 120Z" fill="#8FB98B"/><circle cx="34" cy="88" r="5" fill="#E8896A"/><circle cx="58" cy="96" r="5" fill="#E0A93E"/><circle cx="82" cy="88" r="5" fill="#F2EDE2"/></svg>`,
    beach: `<svg viewBox="0 0 160 120"><rect width="160" height="120" fill="#BFD9E2"/><rect y="52" width="160" height="34" fill="#7FB5AE"/><rect y="86" width="160" height="34" fill="#E3CBA4"/><ellipse cx="104" cy="82" rx="22" ry="12" fill="#D9A441"/><circle cx="120" cy="72" r="9" fill="#D9A441"/></svg>`,
  };

  return { ORDER, SCENE_NAMES, THUMBS };
})();
