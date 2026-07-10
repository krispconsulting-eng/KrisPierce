/* =========================================================================
   Gentle sound. Everything synthesised quietly with WebAudio — naturalistic,
   soft, never sudden. Two independent buses: ambient bed and effects/voice.
   The whole game is fully playable with sound off.
   ========================================================================= */

const GameAudio = (() => {
  let ctx = null;
  let ambientGain = null;
  let fxGain = null;
  let ambientNodes = [];
  let voice = null;

  const settings = { ambient: 0.55, effects: 0.8 };

  function ensure() {
    if (ctx) return true;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
      ambientGain = ctx.createGain();
      ambientGain.gain.value = settings.ambient * 0.14;
      ambientGain.connect(ctx.destination);
      fxGain = ctx.createGain();
      fxGain.gain.value = settings.effects * 0.5;
      fxGain.connect(ctx.destination);
      return true;
    } catch (e) { return false; }
  }

  function resume() {
    if (!ensure()) return;
    if (ctx.state === 'suspended') ctx.resume();
    pickVoice();
  }

  function setAmbientLevel(v) {
    settings.ambient = v;
    if (ambientGain) ambientGain.gain.setTargetAtTime(v * 0.14, ctx.currentTime, 0.3);
  }
  function setEffectsLevel(v) {
    settings.effects = v;
    if (fxGain) fxGain.gain.setTargetAtTime(v * 0.5, ctx.currentTime, 0.3);
  }

  /* ---------- little synth helpers ---------- */

  function tone(freq, dur, { type = 'sine', vol = 0.5, attack = 0.02, curve = null, out = null } = {}) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    if (curve) o.frequency.setTargetAtTime(curve, ctx.currentTime + dur * 0.3, dur * 0.35);
    g.gain.value = 0;
    g.gain.setTargetAtTime(vol, ctx.currentTime, attack);
    g.gain.setTargetAtTime(0, ctx.currentTime + dur * 0.55, dur * 0.28);
    o.connect(g); g.connect(out || fxGain);
    o.start();
    o.stop(ctx.currentTime + dur + 0.5);
  }

  function noiseBurst(dur, { freq = 800, q = 1, vol = 0.4, attack = 0.01, out = null } = {}) {
    if (!ctx) return;
    const len = Math.max(1, Math.floor(ctx.sampleRate * (dur + 0.1)));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    g.gain.value = 0;
    g.gain.setTargetAtTime(vol, ctx.currentTime, attack);
    g.gain.setTargetAtTime(0, ctx.currentTime + dur * 0.5, dur * 0.3);
    src.connect(f); f.connect(g); g.connect(out || fxGain);
    src.start();
    src.stop(ctx.currentTime + dur + 0.4);
  }

  /* ---------- effects vocabulary ---------- */

  const fx = {
    // a real, unhurried highland-cow low
    cowLow() {
      tone(96, 1.5, { type: 'triangle', vol: 0.5, attack: 0.12, curve: 72 });
      tone(192, 1.3, { type: 'sine', vol: 0.18, attack: 0.12, curve: 150 });
    },
    cowLowBig() {
      tone(82, 1.9, { type: 'triangle', vol: 0.55, attack: 0.14, curve: 62 });
      tone(164, 1.6, { type: 'sine', vol: 0.2, attack: 0.14, curve: 128 });
    },
    // one soft officious bark
    bark() {
      noiseBurst(0.09, { freq: 900, q: 2.5, vol: 0.5, attack: 0.005 });
      tone(340, 0.12, { type: 'square', vol: 0.12, attack: 0.005, curve: 220 });
    },
    barkBark() {
      fx.bark();
      setTimeout(() => fx.bark(), 260);
    },
    // pelican bill-clap: two woody clicks
    billClap() {
      noiseBurst(0.05, { freq: 1600, q: 6, vol: 0.45, attack: 0.002 });
      setTimeout(() => noiseBurst(0.05, { freq: 1250, q: 6, vol: 0.4, attack: 0.002 }), 150);
    },
    wingbeat() {
      noiseBurst(0.35, { freq: 320, q: 0.8, vol: 0.28, attack: 0.06 });
    },
    // water: a gentle splash / paddle
    splash() {
      noiseBurst(0.45, { freq: 1900, q: 0.7, vol: 0.3, attack: 0.02 });
      noiseBurst(0.6, { freq: 650, q: 0.9, vol: 0.22, attack: 0.05 });
    },
    // Will's phone: one soft click
    phoneClick() {
      noiseBurst(0.03, { freq: 2300, q: 8, vol: 0.3, attack: 0.002 });
    },
    // sticker found: two soft marimba notes
    found() {
      tone(523, 0.5, { type: 'sine', vol: 0.3, attack: 0.01 });
      setTimeout(() => tone(784, 0.8, { type: 'sine', vol: 0.3, attack: 0.01 }), 190);
    },
    // gate / wooden creak
    gate() {
      tone(180, 0.6, { type: 'triangle', vol: 0.16, attack: 0.05, curve: 240 });
      noiseBurst(0.3, { freq: 500, q: 3, vol: 0.14, attack: 0.04 });
    },
    // Ella's branch landing: one satisfying, unhurried thump
    thump() {
      tone(58, 0.7, { type: 'sine', vol: 0.65, attack: 0.005, curve: 40 });
      noiseBurst(0.12, { freq: 240, q: 1.4, vol: 0.3, attack: 0.005 });
    },
    // small birds scattering
    birds() {
      [0, 120, 230, 380, 520].forEach((d, i) =>
        setTimeout(() => tone(1900 + i * 260, 0.12, { type: 'sine', vol: 0.1, attack: 0.01, curve: 2500 + i * 200 }), d));
    },
    // apple / soft object drop
    plop() {
      tone(300, 0.18, { type: 'sine', vol: 0.3, attack: 0.005, curve: 130 });
    },
    // hoofstep on grass
    step() {
      noiseBurst(0.07, { freq: 380, q: 1.2, vol: 0.12, attack: 0.008 });
    },
    // brush stroke through a shaggy coat
    brush() {
      noiseBurst(0.3, { freq: 1050, q: 0.8, vol: 0.2, attack: 0.05 });
    },
    // stone hop
    stone() {
      noiseBurst(0.06, { freq: 700, q: 4, vol: 0.3, attack: 0.004 });
    },
    // butterfly / tiny sparkle (very soft)
    tinkle() {
      tone(1568, 0.35, { type: 'sine', vol: 0.12, attack: 0.01 });
    },
    // page turn for the book / map
    page() {
      noiseBurst(0.22, { freq: 1400, q: 0.9, vol: 0.2, attack: 0.03 });
    },
    // a happy contented dog wag (little pant)
    wag() {
      noiseBurst(0.1, { freq: 1100, q: 1.5, vol: 0.16, attack: 0.02 });
    },
    // fist bump: tiny soft pat
    bump() {
      noiseBurst(0.05, { freq: 420, q: 2, vol: 0.3, attack: 0.003 });
    },
  };

  function play(name) {
    if (!ctx || !fx[name]) return;
    fx[name]();
  }

  /* ---------- ambient beds ---------- */

  function stopAmbient() {
    ambientNodes.forEach(n => { try { n.stop ? n.stop() : n.disconnect(); } catch (e) {} });
    ambientNodes = [];
  }

  // a very quiet looping filtered-noise bed: wind in grass / waves
  function startAmbient(kind) {
    if (!ctx) return;
    stopAmbient();
    const len = Math.floor(ctx.sampleRate * 4);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = kind === 'beach' ? 620 : kind === 'creek' ? 900 : 480;
    const g = ctx.createGain();
    g.gain.value = kind === 'beach' ? 1.0 : kind === 'creek' ? 0.8 : 0.55;
    // slow swell LFO — one cycle every ~9 seconds, nothing like a flash
    const lfo = ctx.createOscillator();
    lfo.frequency.value = kind === 'beach' ? 0.11 : 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = kind === 'beach' ? 0.5 : 0.2;
    lfo.connect(lfoGain); lfoGain.connect(g.gain);
    src.connect(f); f.connect(g); g.connect(ambientGain);
    src.start(); lfo.start();
    ambientNodes = [src, lfo, g, f, lfoGain];
  }

  /* ---------- Will's voice: single soft AAC words ---------- */

  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const pick = () => {
      const vs = window.speechSynthesis.getVoices();
      voice = vs.find(v => v.lang === 'en-AU')
           || vs.find(v => v.lang === 'en-GB')
           || vs.find(v => v.lang && v.lang.startsWith('en'))
           || null;
    };
    pick();
    if (!voice) window.speechSynthesis.onvoiceschanged = pick;
  }

  function say(word) {
    if (!('speechSynthesis' in window)) return;
    if (settings.effects <= 0.02) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      if (voice) u.voice = voice;
      u.rate = 0.82;
      u.pitch = 1.0;
      u.volume = Math.min(1, settings.effects);
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  return { resume, play, say, startAmbient, stopAmbient, setAmbientLevel, setEffectsLevel };
})();
