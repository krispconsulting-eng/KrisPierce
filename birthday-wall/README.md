# Emma's Awesomeness Wall

A fill-in-online birthday wall for Emma Palmer's 50th, adapted from Rachel
Callander's Awesomeness Form. `index.html` is the whole thing: markup, styles
and behaviour in one self-contained file, no build step and no server.

## How it saves

The page is published as a Claude artifact with the `artifact` capability, so
it can write to itself. The wall lives in the document as JSON:

```html
<script id="wall-data" type="application/json">{"v":1,"collectEmail":"","entries":[]}</script>
```

When someone submits, the page rebuilds its own complete source from `CSS`,
`MARKUP` and `app.toString()`, drops the new entry into that JSON block and
calls `artifact.publish()`. Every open view reloads to the new version, so
everyone sees the same wall. Nothing is serialised out of the live DOM.

Publishing is compare-and-set. Two people submitting in the same second means
one gets `conflict` and is reloaded to the winner's version; the losing entry
is held in `localStorage` and resubmitted automatically on the way back in
(up to three attempts, then it is put back in the form with a message).

## Read-only viewers

Anyone opening a copy they cannot write to still gets the whole form. On
submit, the page hands them their entry as formatted text with a copy button,
plus a one-tap email button if the organiser has set a collection address in
the organiser panel. A viewer with no artifact capability at all is told so
before they start typing, not after.

## Organiser panel

At the foot of the page: the whole wall as readable text or JSON, a copy
button, a print view (form stripped out, "Save as PDF" for a keepsake) and the
collection address field.

## Editing it

Edit `index.html`, then republish it to the same artifact URL. The next entry
someone adds regenerates the page from the new source and carries the existing
entries across, so entries already on the wall are not lost.
