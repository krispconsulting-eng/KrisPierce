# Art direction — spread-by-spread briefs

Digital picture-book edition of **Will and the Missing Highland Cow**.
Derived from the handover pack: draft-6 manuscript (text is LOCKED — do not
edit), character design brief, and the Spread 9 sample brief.

## Global rules (binding, from the project's own framework)

1. **Canvas.** Each spread is one `<svg viewBox="0 0 1600 800">` (full-bleed,
   two square pages). The **gutter** is x=800: keep faces, horns and Will's
   phone out of x = 750–850. Big shapes may cross it.
2. **Quiet area.** Each brief names a text zone (sky/water/grass). Keep it
   visually calm — the HTML lays the words over it. Nothing important there.
3. **Will's rules.** The stillest figure in every scene; watching the thing
   everyone else missed. Phone on lanyard = part of his silhouette, never
   spotlighted, nothing reacts to it. Never fragile, worried-over, or helped.
   Draw him in physical connection with the animals where natural.
4. **Pair test.** Any spread with both cattle: Rocky (golden `#B9772F`, wild
   fringe, crooked left-as-viewed horn, chest first) vs Freddie (darker
   `#7A4530`, rounder, tidy fringe, eyes visible, planted square) must read
   instantly, and in silhouette.
5. **Expression arc (the comedy spine).** Rocky: smug (1–8) → deflated,
   embarrassed, alarmed at most (9–10) → genuinely scared, wide eyes (11)
   → relieved/mud-shake (12–13) → entirely unrepentant (13–14).
   **Save the fear for 11.** 9 is the deflation beat, not the fear beat.
6. **Cleo has two speeds** — flat-out (run/point, ears flying, ahead of
   everyone) or boneless (flopped on the nearest person). Nothing between.
   Blue collar + gold round tag visible in every drawing.
7. **World.** Green hill, dirt track, timber fencing, muddy paddock, dam,
   water tank, one big old tree. **No coastline, no landmarks, no signage.**
   Neighbour + any extras stay muted (BookArt.neighbour is pre-muted).
8. **Light arc.** 1–4 soft morning (mornTop/mornBottom) · 5–8 clear midday
   (dayTop/dayBottom) · 9–12 bright but tense midday, dam palette ·
   13 golden late afternoon (goldTop/goldBottom) · 14 night (nightTop/
   nightBottom, stars, warm windows).
9. **Calm pages.** Nothing flashes, no harsh contrast, no motion illusions.
10. **Scale.** Use consistent scales: cattle `put(..., 0.9–1.05)`, Will
    `0.95–1.1`, Cleo `0.9–1.1` in the midground; smaller when farther away.
    Feet sit ON ground lines: characters at y = their ground line.
    Depth: things lower on the canvas are nearer and bigger.

## API quick-reference

`BookArt.put(x, y, scale, flip, svg)` — flip=true makes a character face LEFT.
Characters (feet at local 0,0, facing right):
- `BookArt.will(pose, mood)` — poses `stand|walk|type|point|offer|reach`,
  moods `calm|focus|amused`.
- `BookArt.cow('rocky'|'freddie', pose, opts)` — poses
  `stand|walk|graze|moo|stuck|shake|lean`; opts `{mood:'smug'|'deflated'|
  'scared'|'calm', weed:bool, wet:bool, mudSpots:bool}`.
  `stuck` draws no legs — scene must draw mud/water OVER the body bottom
  (below local y≈-60 at the cow's placement).
- `BookArt.cleo(pose)` — `sit|stand|point|run|bark|flop`.
- `BookArt.neighbour(pose)` — `stand|point|flap|hips`.

Scenery: `sky(top,bottom,h)`, `sun`, `moon`, `stars`, `hills([{y,color,bulge}])`,
`ground(y,color)`, `dirtTrack(xBottom,xHorizon,yHorizon,wBottom,wTop)`,
`fence(width,{leanLast,hole})`, `gate(openAngle)`, `hoofprints(n,dx,dy,rot,op)`,
`gumTree(s)`, `bigOldTree(s)`, `waterTank(s)`, `dam(w,h)`, `reeds(n,spread)`,
`mudPatch(w,h)`, `lettucePatch(rows,cols,eaten)`, `farmhouse(s)`,
`farmhouseNight(s)`, `cloudPuff(s,op)`, `birds(x,y)`, `grassTuft(s)`,
`flowers(n,spread)`, `hayBale(s)`, `butterfly(s)`, `mudSplats([[x,y,r],…])`.

Paint order: sky → sun/clouds → far hills → mid scenery → track/ground detail
→ far characters → near characters → foreground tufts/flowers.

## The spreads

### COVER
Title art, portrait feel inside the same 1600×800 canvas: the green hill,
the whole cast. Rocky front and centre mid-lean on a fence (chest first,
smug), Will standing calm beside Freddie, hand resting near Freddie's
shoulder (`reach`), Cleo sitting foreman-style slightly ahead. Morning gold.
Quiet area: top third (title goes there). Butterfly optional.

### Spread 1 — the establishing shot
*Text:* "On a green hill at the end of a long dirt track lived a boy called
Will, two Highland cattle, and a dog who thought she was in charge of
everyone."
Wide morning vista: big green hill, farmhouse small on the right-page hill
crest, long dirt track winding from bottom-left to the house. Cast small-ish
midground on the hill: Will `stand`, Freddie near him, Rocky a little apart
(head through/over fence line if easy), Cleo `sit` in front, surveying.
Light: morning. Quiet area: **sky, top-left**. Fences, tufts, birds.

### Spread 2 — meet the cattle
*Text:* "The cattle were Freddie, who was big and shaggy and slow, and
Rocky, who was big and shaggy and trouble. The dog was Cleo."
Character portrait spread, big figures: LEFT page Freddie `stand` calm,
planted, maybe grazing daisies at his feet; RIGHT page Rocky `lean` with the
gate/fence (mid-boundary-test, one hoof where it shouldn't be), smug. Cleo
`stand`/`bark` small centre-front, supervising Rocky like a foreman (clear
of gutter). This is THE pair-test page: colour, fringe, posture all contrast.
Light: morning. Quiet area: **top band of sky**.

### Spread 3 — the counting
*Text:* "Every morning, Will counted his herd. He typed it on his phone.
'One Freddie,' said Will. 'One Rocky. One Cleo.' Every morning, that was
everyone."
Will LEFT page `type` (phone in hands — this is the one mid-action moment,
shown, not commented), head slightly toward his herd. The herd lined up
RIGHT page like a morning roll call: Freddie planted, Rocky mid-fidget
(walk pose, head turned), Cleo sitting neatly FIRST in line (she counts
herself in charge). Morning sun low. Quiet area: **top-left sky**.
Physical connection: Cleo leaning toward Will's leg.

### Spread 4 — no Rocky
*Text:* "Until Tuesday. 'One Freddie,' said Will. 'One Cleo.' He looked
left. He looked right. No Rocky."
Same stage as spread 3 deliberately — but the line has a GAP. Freddie and
Cleo in place, an obvious Rocky-shaped absence (flattened grass patch /
empty spot). Will `stand` mood `focus`, head tilt reading the space. A calm
beat, not panic. Quiet area: **top-right sky**. Comic detail allowed: Cleo
looking at the empty spot too.

### Spread 5 — the boy who notices things
*Text:* "Now, most people rush about when a cow goes missing. Not Will.
Will was good at noticing things. He noticed the gate, swinging just a
little. He noticed the mud, dented with hoofprints. He noticed Cleo's nose,
already pointing across the paddock."
The noticing page: three clues on one canvas. Gate `gate(18)` ajar
LEFT-of-centre, mud patch with `hoofprints` leading right, Cleo `point`
full-stretch RIGHT page pointing across the paddock, Will `stand` `focus`
still and reading it all, Freddie behind him half a beat behind. Midday
light starts here. Quiet area: **top-left sky**.

### Spread 6 — setting off
*Text:* "'Follow the hoofprints,' said Will. Cleo barked once, which meant
finally, someone with a plan. Freddie came too, because Freddie went
wherever Will went."
The expedition sets out, LEFT→RIGHT: Cleo `run` ahead (all four feet off
the ground), hoofprint trail underfoot heading right, Will `point`/`walk`
mid, Freddie `walk` half a beat behind Will, close. Rolling paddock,
midday. Quiet area: **top-right sky**. Momentum page — everything moves
right.

### Spread 7 — the trail
*Text:* "The hoofprints led past the big old tree. Past the water tank.
Past the neighbour's fence, which now had a Rocky-sized hole in it."
Journey page, three landmarks left→right along the hoofprint trail:
`bigOldTree` LEFT page, `waterTank` mid-right, then the neighbour's fence
with `fence(…, {hole:true})` far RIGHT — hole prominently Rocky-sized.
The trio small, mid-journey between tree and tank, walking right. Quiet
area: **sky, upper-centre**. A few golden cow hairs on the fence hole
allowed (tiny `#B9772F` strokes).

### Spread 8 — the neighbour
*Text:* "'Have you seen a cow?' said Will. The neighbour pointed down the
track. Half her lettuces were gone. 'He went that way,' she said. 'And he
owes me lettuces.'"
LEFT page: Will `stand` calm with Cleo sitting at his leg, Freddie behind.
RIGHT page: neighbour `point` pointing down-track (rightwards, off-page),
her `lettucePatch` with bitten gaps in the foreground right. Track runs
through. Midday. Quiet area: **top-left sky**. Neighbour reads kind but
exasperated; muted colours so the core four still pop.

### Spread 9 — THE DAM REVEAL (the sample spread; its checklist gates everything)
*Text:* "The track ended at the big dam in the bottom paddock. And there,
up to his belly in mud, with waterweed hanging off one horn, looking much
less pleased with himself than usual, was Rocky."
Per the sample brief: **left page = the arrivals, calm** — Will `stand`
`focus` (small "I knew it" energy), Freddie square and deadpan watching,
Cleo `sit` foreman at the water's edge. **Right page = the dam: Rocky
`stuck`** belly-deep centre-right, `{mood:'deflated', wet:true, weed:true}`,
posture collapsed, fringe plastered. Dam `dam()` dominates right page;
churned `mudPatch` banks; `reeds`. Deflation, NOT fear (eyes down-lidded,
not wide). Faces/horns/phone clear of gutter. Quiet area: **sky top-right,
above the dam**. Must pass: style at spread scale, landscape palette
(greens/water/mud/warm coats/one blue collar), pair test, expression shift,
Will's rules, B&W silhouette test.

### Spread 10 — everyone tries the wrong thing
*Text:* "Cleo barked. Rocky didn't move. Freddie mooed. Rocky didn't move.
The neighbours arrived and stood at the edge, shouting and waving and
flapping. Rocky just sank a little deeper."
Busy edge vs stuck centre: around the dam LEFT-to-centre, Cleo `bark`,
Freddie `moo`, neighbour + a second neighbour silhouette `flap`/`point`
(both muted), everyone LOUD. Rocky `stuck` slightly LOWER than spread 9
(sunk deeper), mood `deflated`, weed, wet. Will stands apart RIGHT,
watching Rocky, not the crowd — the only still figure. Quiet area:
**top-left sky**.

### Spread 11 — Will notices (the fear beat)
*Text:* "Will stayed quiet. Will stayed still. Will noticed things. He
noticed Rocky's eyes, wide and white. Rocky wasn't being stubborn. Rocky
was stuck, and Rocky was scared."
INTIMATE page — drop the crowd to background/off-page. Two figures carry
it: Will LEFT, still, `stand` `focus`; Rocky RIGHT `stuck`
`{mood:'scared', wet:true, weed:true}` — THE wide white eyes, the plot
point, fringe parted enough to show them. Bring the "camera" closer (both
figures larger than spread 10). Muted, tense water. Quiet area:
**upper-left sky**, generous.

### Spread 12 — the rescue
*Text:* "'Everyone stand back,' said Will. 'He's frightened.' The paddock
went quiet. Will walked to the edge of the mud, slow and calm, and held
out a handful of hay, and waited. And waited. And Rocky, one heavy hoof at
a time, pulled himself out."
The hush page. Crowd small and pulled back LEFT edge (neighbours `stand`,
Freddie, Cleo `sit` obediently — everyone still for once). Centre-stage:
Will `offer` with the handful of hay at the mud's edge facing right; Rocky
mid-emergence — use `stuck` raised higher (front half out, one leg drawn as
emerging: place him higher so shoulders+one leg clear the mud, mood `calm`,
wet, weed). Space between Will's hay-hand and Rocky's nose = the held
breath; keep that gap ~clear of the gutter. Quiet area: **top sky, full
width**, calm.

### Spread 13 — the shake and the sorry
*Text:* "Rocky shook himself, spraying mud over everybody, and followed
Will home like it had all been his idea. They stopped at the neighbour's
on the way. 'Sorry about the lettuces,' said Will. 'Sorry,' said Rocky's
face, not very convincingly."
Two beats, one golden-hour canvas: LEFT page Rocky `shake` mid-spray
(`mudSplats` flying, Cleo mid-leap away, neighbour shielding hat, Will
calm with maybe one mud dot on the tee — never distressed); RIGHT page
smaller vignette down the track: Will walking, Rocky `walk`
`{mood:'smug', weed:true}` following "like it had all been his idea",
neighbour `hips` at her patch receiving the apology. If two beats fight,
choose the shake LEFT + sorry RIGHT with track connecting. Golden light.
Quiet area: **top-centre sky**.

### Spread 14 — home
*Text:* "That night, Will counted his herd. 'One Freddie. One Rocky. One
Cleo.' Everyone was home. Because when a cow goes missing, you need the
boy who notices things."
Night. `sky(nightTop,nightBottom)`, `stars`, `moon`, `farmhouseNight`
warm-windowed on the hill RIGHT. Foreground LEFT-centre: the count —
Will `type` (the ritual, same as spread 3, rhyme deliberate), Freddie
settled (graze or stand), Rocky `stand` `{mood:'smug', weed:true}`
(unrepentant to the last), **Cleo `flop`ped against Will's leg** — the
final spread belongs to her second mode. Everything soft, warm, safe.
Quiet area: **top-left night sky** (text in pale ink — book.js handles
colour via `textTone:'light'`).

## Alt text
book.js carries alt text for each spread — scenes don't need to.
