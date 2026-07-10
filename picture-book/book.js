/* =========================================================================
   Book runtime — "Will and the Missing Highland Cow", digital edition.
   Text: manuscript draft 6, verbatim (LOCKED — see handover pack).
   Zones: tl/tc/tr/bl/bc/br — where the text plate sits over the art.
   tone 'light' = pale text on a dark translucent plate (night spread).
   ========================================================================= */

const BOOK = {
  title: 'Will and the Missing Highland Cow',
  byline: 'Kris Pierce & Will Pierce',
  spreads: [
    {
      id: 's01', zone: 'tl',
      text: `On a green hill at the end of a long dirt track lived a boy called Will, two Highland cattle, and a dog who thought she was in charge of everyone.`,
      alt: 'A wide morning view of a green hill farm. A long dirt track winds up to a farmhouse. Will stands among his animals: two shaggy Highland cattle and a golden cocker spaniel sitting in front, surveying everything.',
    },
    {
      id: 's02', zone: 'tc',
      text: `The cattle were Freddie, who was big and shaggy and slow, and Rocky, who was big and shaggy and trouble. The dog was Cleo.`,
      alt: 'The two Highland cattle up close. On the left, Freddie: deep red-brown, round and calm, with a tidy fringe and gentle eyes. On the right, Rocky: golden, wild-fringed, one crooked horn, leaning on the fence looking pleased with himself. Cleo the spaniel, wearing her blue collar, supervises.',
    },
    {
      id: 's03', zone: 'tl',
      text: `Every morning, Will counted his herd. He typed it on his phone. “One Freddie,” said Will. “One Rocky. One Cleo.” Every morning, that was everyone.`,
      alt: 'Morning roll call. Will types on his phone, which hangs on a lanyard around his neck. His herd lines up in front of him: Cleo sitting first and tallest, Freddie standing calmly, Rocky fidgeting at the end of the line.',
    },
    {
      id: 's04', zone: 'tr',
      text: `Until Tuesday. “One Freddie,” said Will. “One Cleo.” He looked left. He looked right. No Rocky.`,
      alt: 'The same morning line-up, but with a gap. Freddie and Cleo are in their places. Where Rocky should be there is only a patch of flattened grass. Will looks at the empty spot, thinking.',
    },
    {
      id: 's05', zone: 'tl',
      text: `Now, most people rush about when a cow goes missing. Not Will. Will was good at noticing things. He noticed the gate, swinging just a little. He noticed the mud, dented with hoofprints. He noticed Cleo’s nose, already pointing across the paddock.`,
      alt: 'Will stands very still, noticing three clues: the paddock gate swinging slightly open, hoofprints pressed into the mud, and Cleo stretched out at full point, her nose aimed across the paddock. Freddie waits behind Will.',
    },
    {
      id: 's06', zone: 'tr',
      text: `“Follow the hoofprints,” said Will. Cleo barked once, which meant finally, someone with a plan. Freddie came too, because Freddie went wherever Will went.`,
      alt: 'The search sets off across the paddock. Cleo races ahead at full stretch, ears flying. Will points the way along the hoofprint trail, and Freddie walks close behind him.',
    },
    {
      id: 's07', zone: 'tc',
      text: `The hoofprints led past the big old tree. Past the water tank. Past the neighbour’s fence, which now had a Rocky-sized hole in it.`,
      alt: 'The trail crosses the farm, past a huge spreading old tree and a corrugated water tank, to the neighbour’s timber fence — which has a large cow-sized hole smashed through its rails.',
    },
    {
      id: 's08', zone: 'tl',
      text: `“Have you seen a cow?” said Will. The neighbour pointed down the track. Half her lettuces were gone. “He went that way,” she said. “And he owes me lettuces.”`,
      alt: 'Will, with Cleo at his leg and Freddie behind, talks with the neighbour in her garden. She points down the track. Her lettuce patch has bite-sized gaps where lettuces used to be.',
    },
    {
      id: 's09', zone: 'tr',
      text: `The track ended at the big dam in the bottom paddock. And there, up to his belly in mud, with waterweed hanging off one horn, looking much less pleased with himself than usual, was Rocky.`,
      alt: 'The dam in the bottom paddock. Rocky is stuck belly-deep in the muddy water, fringe plastered flat, waterweed hanging off his crooked horn, looking deflated. On the bank, Will, Freddie and Cleo have arrived and stand calmly watching.',
    },
    {
      id: 's10', zone: 'tl',
      text: `Cleo barked. Rocky didn’t move. Freddie mooed. Rocky didn’t move. The neighbours arrived and stood at the edge, shouting and waving and flapping. Rocky just sank a little deeper.`,
      alt: 'Everyone tries something at the dam’s edge: Cleo barks, Freddie moos, and two neighbours wave and flap their arms. Rocky, sunk a little deeper in the mud, does not move. Will stands apart, quietly watching Rocky.',
    },
    {
      id: 's11', zone: 'tl',
      text: `Will stayed quiet. Will stayed still. Will noticed things. He noticed Rocky’s eyes, wide and white. Rocky wasn’t being stubborn. Rocky was stuck, and Rocky was scared.`,
      alt: 'A close, quiet moment. Will stands still at the water’s edge, watching. Rocky, stuck in the dam, has wide white eyes. He is frightened.',
    },
    {
      id: 's12', zone: 'tc',
      text: `“Everyone stand back,” said Will. “He’s frightened.” The paddock went quiet. Will walked to the edge of the mud, slow and calm, and held out a handful of hay, and waited. And waited. And Rocky, one heavy hoof at a time, pulled himself out.`,
      alt: 'The paddock is hushed. Everyone has stepped back and stands small and still at the edge. Will holds out a handful of hay at the mud’s edge, calm and patient. Rocky, halfway out of the mud, reaches toward it.',
    },
    {
      id: 's13', zone: 'tc',
      text: `Rocky shook himself, spraying mud over everybody, and followed Will home like it had all been his idea. They stopped at the neighbour’s on the way. “Sorry about the lettuces,” said Will. “Sorry,” said Rocky’s face, not very convincingly.`,
      alt: 'Golden afternoon light. Rocky shakes himself dry, spraying mud over everyone — Cleo springs away and the neighbour shields her hat. Further down the track, Rocky follows Will home past the neighbour’s lettuce patch, waterweed still on his horn, looking entirely unrepentant.',
    },
    {
      id: 's14', zone: 'tl', tone: 'light',
      text: `That night, Will counted his herd. “One Freddie. One Rocky. One Cleo.” Everyone was home. Because when a cow goes missing, you need the boy who notices things.`,
      alt: 'Night on the farm, under stars and a moon. The farmhouse windows glow warm. Will types on his phone, counting his herd: Freddie settled, Rocky still wearing his waterweed, and Cleo flopped bonelessly against Will’s leg. Everyone is home.',
    },
  ],
};

(function () {
  const S = window.Scenes || {};
  const root = document.getElementById('book');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- build pages: cover, 14 spreads, back matter ----
  const pages = [];

  pages.push({
    id: 'cover', label: 'Cover',
    html: `
      <div class="art" role="img" aria-label="Book cover. ${BOOK.title}. A golden Highland cow leans over a fence on a green hill at dawn, watched by a young man, another darker Highland cow, and a cocker spaniel.">${S.cover ? S.cover() : ''}</div>
      <div class="cover-titles">
        <div class="cover-eyebrow">A farm story, mostly true</div>
        <h1>Will <span class="amp">and the</span> Missing Highland&nbsp;Cow</h1>
        <div class="cover-byline">${BOOK.byline}</div>
      </div>`,
  });

  BOOK.spreads.forEach((sp, i) => {
    const fn = S[sp.id];
    pages.push({
      id: sp.id, label: `Spread ${i + 1} of 14`,
      html: `
        <div class="art" role="img" aria-label="${sp.alt}">${fn ? fn() : ''}</div>
        <div class="plate zone-${sp.zone}${sp.tone === 'light' ? ' plate-light' : ''}"><p>${sp.text}</p></div>`,
    });
  });

  pages.push({
    id: 'end', label: 'The end',
    html: `
      <div class="endmatter">
        <div class="end-mark">The end.</div>
        <section>
          <h2>A note for grown-ups</h2>
          <p>Will, who wrote this book with his mum, communicates by typing on
          his phone — a form of AAC (augmentative and alternative
          communication). In the story, his phone is simply part of his day,
          the way his boots are. If a young reader asks: some people talk with
          their voices, some with their hands, and some by typing. Everyone
          counts their herd in their own way.</p>
        </section>
        <section>
          <h2>About this edition</h2>
          <p>This is the digital dummy edition — a working proof of the
          finished draft-six manuscript with concept art, made to guide the
          book’s illustrator and reviewers. The printed edition follows the
          project’s framework: Will’s sign-off on his own words and his
          own character, then a sensitivity read, then the commissioned
          illustrations.</p>
          <p class="imprint">© 2026 Kris Pierce &amp; Will Pierce · All rights reserved.<br>
          Set on a farm that could be anywhere, with one gate that doesn’t
          always stay shut.</p>
        </section>
      </div>`,
  });

  // ---- render ----
  root.innerHTML = pages.map((p, i) =>
    `<section class="page" id="page-${p.id}" data-i="${i}" ${i === 0 ? '' : 'hidden'}>${p.html}</section>`
  ).join('');

  const counter = document.getElementById('counter');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let cur = 0;

  function show(i, focus) {
    i = Math.max(0, Math.min(pages.length - 1, i));
    if (i === cur && focus !== 'init') return;
    const oldEl = root.children[cur], newEl = root.children[i];
    cur = i;
    for (const el of root.children) el.hidden = true;
    newEl.hidden = false;
    if (!reduced && oldEl !== newEl) {
      newEl.classList.remove('turn'); void newEl.offsetWidth; newEl.classList.add('turn');
    }
    counter.textContent = pages[i].label;
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === pages.length - 1;
    prevBtn.setAttribute('aria-hidden', String(i === 0));
    nextBtn.setAttribute('aria-hidden', String(i === pages.length - 1));
    try { history.replaceState(null, '', '#' + pages[i].id); } catch (e) { /* file:// */ }
  }

  prevBtn.addEventListener('click', () => show(cur - 1));
  nextBtn.addEventListener('click', () => show(cur + 1));
  addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); show(cur + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); show(cur - 1); }
    if (e.key === 'Home') show(0);
    if (e.key === 'End') show(pages.length - 1);
  });

  // swipe
  let tx = null, ty = null;
  addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  addEventListener('touchend', (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) show(cur + (dx < 0 ? 1 : -1));
    tx = ty = null;
  }, { passive: true });

  // deep link
  const want = location.hash.slice(1);
  const start = pages.findIndex(p => p.id === want);
  show(start >= 0 ? start : 0, 'init');
})();
