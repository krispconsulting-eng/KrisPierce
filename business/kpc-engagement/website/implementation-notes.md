> **What this is:** notes for whoever builds the six product pages into the krispierce.com.au site repository (`krispierce1`). DRAFT. Nothing in the site repository has been changed. Nothing is to be published without Kris's approval.
> **Files in this folder:** `product-pages-data.js` (data), `product-pages-copy.md` (review copy, generated from the data), `offers-index-section.md`, `diagnostic-landing-copy.md`, and this file.

---

## 1. Live files that change

### `service-pages-data.js`

Replace three entries in `window.PROGRAM_PAGES` with the objects of the same slug from `product-pages-data.js`:

| Live slug | Change |
|---|---|
| `strategic-advisory-sprint` | Replace the whole object. The lede is new (see section 4). |
| `consumer-engagement-design` | Replace the whole object. Live lede and `who` kept; other fields rewritten to the priced offer. |
| `ongoing-strategic-advisor` | Replace the whole object. Live lede, `who` and `how` kept. |

Add three new objects: `ceof-diagnostic`, `diagnostic-debrief`, `co-design-training`.

Leave the fourth live program entry (the alignment program) and its HTML file as they are. It is not one of these six.

Two ways to wire it in. Either merge the six objects into `window.PROGRAM_PAGES`, or load `product-pages-data.js` as its own file and have `ProgramPage` look in `window.PRODUCT_PAGES` first, then `window.PROGRAM_PAGES`. The second keeps the draft and the live copy apart until approval. Copy `window.PRODUCT_PAGES_SHARED` across in either case.

Update the comment block at the top of `service-pages-data.js` to list the added fields.

### `service-pages.jsx`

`ProgramPage` (about line 91) currently renders four blocks (`who`, `delivers`, `how`, `why`) and a fixed header button, "Book consultation", linking to `/contact`. Changes:

1. Header button: use `page.ctaLabel` and `page.ctaHref` when present; fall back to the current button.
2. Add a price line in the header or directly under it: `page.price`, with `page.priceNote` and `page.duration` in smaller text.
3. Add blocks, each rendered only when the field exists, in this order: Who it is for, What you get (`delivers`, then `includes`), How it runs (`how`, then `steps` as a numbered list), Price, What is not included (`notIncluded`), Why it matters (`why`), Questions (`faq`), What it leads to (`next`), closing call to action.
4. `proof`: do not render while the value starts with `[`. It is a slot for Kris.
5. Footer area of each product page, once, in small text: `PRODUCT_PAGES_SHARED.independence`, then `PRODUCT_PAGES_SHARED.medicalNote`. Show `gstNote` beside the price. Show `charityRate` on the sprint and training pages only (both already carry it in `priceNote`, so do not print it twice).
6. Any string containing `[Kris:` is unresolved. Add a build-time check that fails if one reaches production.

The block label in the live renderer uses a typographic apostrophe ("Who it's for"). The copy here uses "Who it is for". Either is fine; keep one.

### `vite.config.js`

Add three inputs after the existing advisory entries (about line 32), following the same pattern:

```js
'advisory-ceof-diagnostic': 'advisory/ceof-diagnostic.html',
'advisory-diagnostic-debrief': 'advisory/diagnostic-debrief.html',
'advisory-co-design-training': 'advisory/co-design-training.html',
diagnostic: 'diagnostic.html',
```

### New HTML entry files under `/advisory/`

Copy `advisory/strategic-advisory-sprint.html` three times and change the title, description, canonical, Open Graph and Twitter tags, and the body attributes:

| New file | `data-slug` | Canonical |
|---|---|---|
| `advisory/ceof-diagnostic.html` | `ceof-diagnostic` | `https://krispierce.com.au/advisory/ceof-diagnostic` |
| `advisory/diagnostic-debrief.html` | `diagnostic-debrief` | `https://krispierce.com.au/advisory/diagnostic-debrief` |
| `advisory/co-design-training.html` | `co-design-training` | `https://krispierce.com.au/advisory/co-design-training` |

Each keeps `<body data-page="program" data-slug="...">`. Meta titles and descriptions are in `product-pages-copy.md` under "Meta" for each page.

Also update the head tags of the three existing files (`strategic-advisory-sprint.html`, `consumer-engagement-design.html`, `ongoing-strategic-advisor.html`) so the description, Open Graph and Twitter text match the new `metaDescription`.

### New page: `/diagnostic`

A new entry file `diagnostic.html` with its own `data-page` value, holding the form, the result view and the debrief block. Copy is in `diagnostic-landing-copy.md`. The question set and form are supplied separately in `products/01-ceof-diagnostic/`. The form posts `organisation`, `contact`, `email`, organisation size and `d1` to `d7` to the report workflow (see `products/CEOF-REFERENCE.md`). Add a field for the benchmark consent checkbox and store it with the result.

Before launch the report workflow has to run on Kris Pierce Consulting infrastructure, be switched on, and sign off as Kris Pierce Consulting from info@krispierce.com.au. See "State of the build" in `products/CEOF-REFERENCE.md`. Do not launch the form against the current webhook host.

### Other live files

| File | Change |
|---|---|
| `index.html` and `sections2.jsx` | Add the "Ways to work with me" section from `offers-index-section.md`. Make "Take the free diagnostic" the primary hero button and "Book a debrief" the second. |
| `work-with-me.jsx` and `work-with-me.html` | Add the same section. Update the page's JSON-LD if the FAQ changes. |
| `contact.html` and its component | Read the `offer` query parameter and pre-select or pre-fill the enquiry subject. Valid values: `diagnostic-debrief`, `strategic-advisory-sprint`, `consumer-engagement-design`, `ongoing-strategic-advisor`, `co-design-training`. Ignore anything else. |
| `privacy.html` and `privacy.jsx` | Add a diagnostic data section: answers stored to produce the report; de-identified benchmark use only with consent; never sold; how to ask for deletion. The landing copy depends on this being true. |
| `public/sitemap.xml` | Add `/diagnostic` and the three new `/advisory/` addresses. |
| Navigation and footer | Add the three-line version from `offers-index-section.md`, and a link to `/how-i-work` once that page exists. |

---

## 2. Redirects

No existing address changes, so no redirect is required. The three replaced pages keep their slugs.

Optional short addresses for `vercel.json`, all temporary (`"permanent": false`) until the structure settles:

```json
{ "source": "/ceof", "destination": "/diagnostic", "permanent": false },
{ "source": "/debrief", "destination": "/advisory/diagnostic-debrief", "permanent": false },
{ "source": "/sprint", "destination": "/advisory/strategic-advisory-sprint", "permanent": false },
{ "source": "/training", "destination": "/advisory/co-design-training", "permanent": false }
```

`/advisory` already redirects to `/work-with-me`. Leave it. Check that `/training` does not collide with anything served from the repository's `training/` folder before adding that line.

---

## 3. Calls to action

| Page | Button | Link |
|---|---|---|
| CEOF Diagnostic | Take the free diagnostic | `/diagnostic` |
| Diagnostic Debrief | Book a debrief | `/contact?offer=diagnostic-debrief` |
| Strategic Advisory Sprint | Book a sprint | `/contact?offer=strategic-advisory-sprint` |
| Consumer Engagement Design | Discuss an engagement design | `/contact?offer=consumer-engagement-design` |
| Ongoing Strategic Advisor | Discuss an ongoing arrangement | `/contact?offer=ongoing-strategic-advisor` |
| In-house co-design training | Book a training day | `/contact?offer=co-design-training` |

These links are placeholders. If the debrief is booked through a calendar tool, swap its link for the booking address.

---

## 4. The one live lede with a banned word

`service-pages-data.js`, `strategic-advisory-sprint`, line 211:

> A focused engagement to clarify direction and unlock progress.

"Unlock" is on the banned list in the brand voice rules. Replacement used in this draft:

> Four weeks on one decision, ending with a paper your leadership team can act on.

The same page's `metaDescription` and the three head tags in `advisory/strategic-advisory-sprint.html` do not contain the word, and are replaced anyway so they carry the price.

Seen in passing, outside these six pages, for Kris to decide: the live consulting pages use two other banned words in body copy, and the policy page offers submission review, which the guardrails flag (see `01-GUARDRAILS.md`, section 1). `work-with-me.jsx` also lists a public appointment among engagements. None of that is changed by this draft.

---

## 5. Structured data

One `Service` with an `Offer` per page, added to the head of each entry HTML file. Reuse the provider `@id` the site already declares. Prices exclude GST, so say so. Do not add `Review` or `AggregateRating`: there are none.

Example for the sprint page:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://krispierce.com.au/advisory/strategic-advisory-sprint#service",
  "name": "Strategic Advisory Sprint",
  "serviceType": "Consumer engagement advisory",
  "description": "Four weeks on one decision, ending with a decision paper and a leadership briefing.",
  "url": "https://krispierce.com.au/advisory/strategic-advisory-sprint",
  "provider": { "@id": "https://krispierce.com.au/#kris" },
  "areaServed": { "@type": "Country", "name": "Australia" },
  "offers": {
    "@type": "Offer",
    "url": "https://krispierce.com.au/advisory/strategic-advisory-sprint",
    "priceCurrency": "AUD",
    "price": "12000",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "12000",
      "priceCurrency": "AUD",
      "valueAddedTaxIncluded": false
    },
    "availability": "https://schema.org/InStock"
  }
}
```

Per page:

| Page | Price markup |
|---|---|
| CEOF Diagnostic | One `Offer`, `"price": "0"`. |
| Diagnostic Debrief | One `Offer`, `"price": "1500"`. |
| Strategic Advisory Sprint | As above. |
| Consumer Engagement Design | Three `Offer` objects named Focused, Standard and Full (18000, 30000, 45000), or one `AggregateOffer` with `lowPrice` 18000 and `highPrice` 45000. |
| Ongoing Strategic Advisor | Two `Offer` objects (3500 and 6500), each with a `UnitPriceSpecification` and `"unitCode": "MON"`. |
| In-house co-design training | One `Offer`, `"price": "9500"`. |

The `faq` array on each page can also be emitted as a `FAQPage`, as `work-with-me.html` does now. Generate it from the data so the markup and the visible text cannot drift apart.

---

## 6. Facts and decisions needed from Kris before publishing

1. Confirm all six prices and the charity rate. The how-I-work draft says "From $12,000" for the sprint and "two charity-rate places each quarter"; this copy says "$12,000" and "limited places each quarter". Choose one wording for both.
2. Consumer Engagement Design: confirm what separates Focused, Standard and Full. The definitions in the data file are a proposal. Confirm a typical duration for each size, or leave "set in the proposal".
3. Sprint: confirm the week-by-week outline in `steps`.
4. Training: confirm the home city for the travel line, that the client supplies venue and catering, and that the day works from a decision of the client's own.
5. Retainer: confirm that on-call advice draws on the same monthly days, the six-month review, and what happens to unused days.
6. Debrief: confirm the format (video call, in person, or either) and that up to three colleagues may join.
7. Diagnostic: confirm about 28 statements and about ten minutes against the final question set; confirm the report email is sent by the workflow; confirm the privacy policy says what the landing copy says, including deletion on request.
8. Proof: one named client result per page, with written consent. Each slot stays hidden until filled.
9. Calendar or contact form: which tool takes debrief bookings.
10. Whether the how-I-work page is published at the same time. The offers section links to it.

---

## 7. Pre-publish checklist

Copy
- [ ] Kris has approved every page.
- [ ] No `[Kris:` text remains anywhere in the built site.
- [ ] Prices match across the six pages, the offers section, the how-I-work page, the debrief block and the report email.
- [ ] No em dashes or en dashes, no exclamation marks, no emoji in any new copy. Run the dash and exclamation search over the changed files.
- [ ] None of the banned words appears in new copy: the list is in the brand voice rules and in `BRAIN.md`, section 8.
- [ ] First person singular throughout. No "we", "our" or "us" in Kris's voice.
- [ ] Australian English: "program", "organisation".
- [ ] The seven domain names and five level names match `products/CEOF-REFERENCE.md` exactly.
- [ ] No invented client, testimonial, result or statistic. Proof slots hidden.
- [ ] No mention of any other brand or organisation Kris is involved with.

Guardrails
- [ ] Public appointments are not used as a reason to buy on any of these pages.
- [ ] The independence line appears once per page, in the footer area, word for word.
- [ ] "Nothing on this page is medical advice." appears once per page.
- [ ] Each paid page says plainly that product-specific submission work is out of scope.
- [ ] Consumer payments are described as paid at published rates and costed separately.
- [ ] The contact and proposal process includes the conflict check step.

Diagnostic
- [ ] The report workflow runs on Kris Pierce Consulting infrastructure and is switched on.
- [ ] A test submission produces an on-screen result and a report email from info@krispierce.com.au, signed Kris Pierce Consulting.
- [ ] The benchmark consent checkbox is unticked by default and its value is stored.
- [ ] The privacy policy covers diagnostic data and matches the landing copy.
- [ ] The result page shows the right copy for each of the five levels, and the three lowest domains as priorities.

Build
- [ ] `node -e "global.window={};require('./product-pages-data.js');console.log(window.PRODUCT_PAGES.length)"` prints 6.
- [ ] `vite build` succeeds and all new entry files appear in `dist`.
- [ ] Every button resolves: `/diagnostic`, and `/contact?offer=` for each of the five paid slugs.
- [ ] Title, description, canonical, Open Graph and Twitter tags are set on each new and changed entry file.
- [ ] JSON-LD validates in a structured data testing tool, and prices match the page.
- [ ] `sitemap.xml` updated.
- [ ] Pages checked at phone width, with keyboard only, and with a screen reader for the FAQ and the form.
- [ ] Preview deployment reviewed by Kris before production.
