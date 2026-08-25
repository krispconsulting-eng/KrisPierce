# Emma's Awesomeness Wall

A fill-in-online birthday wall for Emma Palmer's 50th, adapted from Rachel
Callander's Awesomeness Form. `index.html` is the whole thing: markup, styles
and behaviour in one self-contained file, no build step and no server.

## How it saves

The page is published as a Claude artifact with the `artifact` capability, so
it can write to itself. The wall lives in the document as JSON:

```html
<script id="wall-data" type="application/json">{"v":1,"entries":[]}</script>
```

When someone submits, the page rebuilds its own complete source from `CSS`,
`MARKUP` and `app.toString()`, drops the new entry into that JSON block and
calls `artifact.publish()`. Every open view reloads to the new version, so
everyone sees the same wall. Nothing is serialised out of the live DOM.

Publishing is compare-and-set. Two people submitting in the same second means
one gets `conflict` and is reloaded to the winner's version; the losing entry
is held in `localStorage` and resubmitted automatically on the way back in
(up to three attempts, then it is put back in the form with a message).

## Everyone writes into the document

Writing is granted by the share link, not by the page: share it with edit
access and every viewer adds straight to the wall. There is no send-it-on
route and nothing to collect by email.

A view-only link cannot publish, so the page says exactly that and leaves
every word typed sitting in the form (the draft is in `localStorage`). It does
not offer to email the entry anywhere.

## Organiser panel

At the foot of the page: the whole wall as readable text or JSON, a copy
button, and a print view (form stripped out, "Save as PDF" for a keepsake).

## Editing it

Edit `index.html`, then republish it to the same artifact URL. The next entry
someone adds regenerates the page from the new source and carries the existing
entries across, so entries already on the wall are not lost.
