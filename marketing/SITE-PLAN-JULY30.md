# bobert.ai — Site Content & Structure Plan
**Version:** 2.0 — supersedes `marketing/SITE-PLAN-JULY29.md`
**Date:** July 30, 2026
**Owner:** Marketing (copy + structure). **Implementation:** Dev.
**Status:** For BD review before it goes to Dev.

**What changed from v1.0:**

| v1.0 said | v2.0 says | Why |
|---|---|---|
| Keep the site FI-only until PI is public | **Present both FI and PI** | Rob's direction, July 30 — the page shows only FI and the platform is more than that |
| "Who It's For" conflict flagged, awaiting ruling | **Resolved — Real Estate and Landscaping dropped** | Decision 021 |
| Motto proposal, awaiting ruling | **Locked as operating principle** | Decision 022 |
| Decision 005 pricing drift flagged | **Resolved — fixed prices** | Decision 023 |

**Locked and untouched:** name (001), logo (006, 010, 011), tagline (007), palette (009). This is messaging and structure only.

**PI treatment, per Rob's July 30 direction:** PI is described with equal narrative weight and labeled **in development**. No CTA, no waitlist, nothing to click. It tells the true story without promising access a visitor can't have.

---

## The Core Problem With the Current Page

It isn't that PI is missing. It's that the page describes **a feature**, not **a company with a thesis**.

Every section answers "what does the app do?" — three taps, six features, watch the flow. Nothing answers "what is Bobert *for*?" So when PI arrives, there's no room for it: a page built as a feature tour has nowhere to put a second feature except a longer list.

The fix is a narrative spine that both sectors hang off. Bobert's real thesis, stated plainly:

> **Opportunity in construction gets lost twice.** Once when you drive past it and forget. Again when the bid invite lands and the paperwork buries it.

FI solves the first loss. PI solves the second. That's one company with one idea, not two tools sharing a domain. It also means adding a third capability later doesn't require another rebuild.

---

## Revised `index.html` — Section by Section

### 1. NAV
| | |
|---|---|
| **Keep** | Wordmark, "Join the Beta" red CTA |
| **Add** | **"Open Bobert"** text link → `/capture` |

Still the highest-priority item on this list. Verified again today: the homepage has no link to `/capture`, `/leads`, `/account`, or `/intake`. FI beta members type the URL from memory.

### 2. HERO

**Keep exactly:** "See what others drive past." (Decision 007) and both CTAs.

**Revise the subhead** to platform level. Current copy is capture-only:

> *Current:* "Bobert is the field intelligence app for professionals who find opportunity on the road. Capture it in seconds — before you leave the curb."

> **Proposed:** Bobert is the field intelligence platform for construction. Catch the opportunity when you spot it — and handle the paperwork when it lands.

"Platform" and the second clause do the work. The tagline still lands as the emotional hook; the subhead now covers both sectors without naming them yet.

**Add** beneath, small, mid-gray (safe-use block 3):

> Built to be used stopped. Pull over, capture in seconds, get back on the road.

### 3. STATS — replace two of four

`0 Opportunities forgotten` and `∞ Leads you used to miss` are not measurements, and this audience is allergic to being sold to. They undercut `<10s`, which is real.

| Figure | Label |
|---|---|
| `<10s` | Capture time, curb to saved |
| `GPS` | Auto-tagged, every capture |
| `1 photo` | Everything else fills itself in |

### 4. THE THESIS — new section, replaces nothing

Goes directly after stats. This is the spine that makes two sectors coherent.

> **Section label:** Why Bobert Exists
> **Heading:** Opportunity gets lost twice.
>
> **Body:** You spot a project from the truck and tell yourself you'll remember it. By dinner it's gone. Then months later a bid invite lands in your inbox with eleven attachments, and the work of figuring out what it even *is* eats your evening.
>
> Bobert handles both ends. Catch it in the field. Process it at the desk.

Short, concrete, no product names. Sets up the next section.

### 5. TWO WAYS BOBERT WORKS — new section

The FI/PI reveal. Two cards, deliberately unequal in availability but equal in weight.

> **Section label:** The Platform
> **Heading:** One platform. Two halves of the same job.

**Card 1 — available now**

> **Field Intelligence**
> `● In closed beta`
>
> Photograph a project from the curb. Bobert tags the location, takes your note, and pulls what it can find — project, company, contacts, a routing note. Saved before you pull away, with a follow-up date so it doesn't die in your camera roll.
>
> **[ Open Bobert → /capture ]**

**Card 2 — in development**

> **Project Intake**
> `○ In development`
>
> When the bid invite arrives, drop it in — email, PDF, screenshot, a link to the bid board. Bobert pulls out what matters: scope, dates, who's involved, what's missing. You get a project summary, an RFI checklist for the gaps, and a draft ready to work from.
>
> *Currently in private testing. No date yet.*

**Notes for Dev:** Card 2 gets no button and no email field. Visual treatment should differentiate clearly — hollow status dot, slightly reduced contrast — while keeping the card the same size. Shrinking it defeats the purpose.

**Note on sector names:** "Field Intelligence" and "Project Intake" are used as plain descriptive headings. The FI/PI abbreviations stay internal — TEAM_SYNC.md is explicit that they're working labels, not locked branding, and initialisms mean nothing to a first-time visitor.

### 6. HOW IT WORKS
**Keep as-is.** "Three taps." → See It / Capture It / Follow Up. Accurate, and it now reads as FI's detail rather than the whole product, because section 5 established there are two halves.

### 7. FEATURES

**One rename.** "Leads Dashboard" oversells `/leads`, which is a list — and `/account` itself labels Export, Notifications, and Team Sharing as *Coming Soon*.

> **Your List** — Every opportunity you've saved, in one place. Photo, location, note, follow-up date.

**Add a seventh card** for the intel card, now real per Decision 020:

> **Project Intel** — Capture a job site and Bobert pulls what it can find: project, company, contacts, a routing note.

**Wording is deliberate.** "pulls what it can find" is honest about a system Dev reports still speculates ("possibly key staff"). Do not upgrade to "verified" or "confirmed" until Dev closes the enrichment-accuracy item. That discipline is exactly what `/upgrade` failed at.

### 8. VIDEO
**Keep.** Existing embed stays until the 30-second walkthrough is produced — which now needs revision per Decision 021 (see below).

### 9. WHO IT'S FOR — revised per Decision 021

**Drop Real Estate. Drop Landscaping & Exterior.** Decision 021 excludes both explicitly: real estate is property sale, not construction delivery.

Decision 021 also says the market is "not a fixed trade checklist" but *anyone with a hand in building or bringing a construction project together*, with lighting/electrical as the live beachhead.

> **Section label:** Who It's For
> **Heading:** If you help build it, this is for you.
> **Sub:** Bobert is built for the people who bring construction projects together — contractors, subs, manufacturers' reps, and suppliers who spend their days in the field and their evenings on paperwork.

**Four cards:**

| Card | Copy |
|---|---|
| **Lighting & Electrical** | Spot a build before the fixture package is spec'd. Get in while there's still a decision to influence. *(Where we started — it's Rob's own trade.)* |
| **Contractors & Subs** | Log job sites, competitor trucks, permit signs, and material deliveries as you pass them. |
| **Manufacturers' Reps** | Track your territory by driving it. Know which projects are live before the RFQ hits your inbox. |
| **Suppliers & Distributors** | Catch projects early enough to quote, not late enough to lose. |

Leading with lighting/electrical and saying plainly that it's the founder's own trade is a credibility asset, not a limitation. A rep reading it recognizes someone who has actually done the job.

### 10. BUILT IN THE OPEN — new section, per Decision 022

> **Section label:** Built in the Open
> **Heading:** We ship every week.
> **Body:** Bobert is early, and improving fast. Here's what changed recently — dated, specific, and including the things we broke and fixed.
>
> *[three most recent changelog entries, dated]*
>
> **Link:** See everything that's shipped → `/changelog`

Placed after "Who It's For," before beta signup: it converts a visitor who likes the product but doubts a one-person company will exist in six months.

### 11. BETA SIGNUP
**Keep.** Brevo capture works and converts. One copy addition to set expectations correctly under Decision 019:

> Free during beta. No credit card, no trial clock. We want your feedback on accuracy before we ask anyone for money.

### 12. FOOTER

**Add:**

1. **Operating principle** (Decision 022, footer is an approved placement):
   > We ship, we listen, we fix it. Every day.
2. **Safe use** (block 4):
   > **Safe use:** Bobert is intended for use while stopped. Never use a mobile device while driving. Obey all applicable traffic laws.
3. **Link:** What's shipped → `/changelog`

---

## New Page — `/changelog`

Required by Decision 022 as the principle's primary falsifiable proof.

**Structure:** reverse-chronological, dated, plain language. No version numbers, no commit hashes, no roadmap.

| Do | Don't |
|---|---|
| "Follow-up reminders now survive a reload." | "Refactored IndexedDB persistence layer." |
| "Fixed: the logo was invisible on dark backgrounds for a week." | Quietly omit the embarrassing ones. |
| Name what broke and that it's fixed. | Promise what's next. |

**Including the fixes is the whole point.** A changelog of only features reads like marketing. One that admits the nav logo was broken reads like a company that watches its own work.

**Header copy:**

> **Built in the open**
> Bobert is early. Here's exactly what's changed, and when. We'd rather show you the work than tell you about it.

**Open flag:** this needs a named owner and a cadence, or it goes stale in three weeks and becomes evidence *against* Decision 022. Recommend Marketing owns dev-language → user-language translation, triggered by any user-visible ship.

---

## `/upgrade` — Reconciliation

**Still contradicting itself on live pages today:**

| Page | Says |
|---|---|
| `/account` | "You're in beta. **Full access, no charge.**" |
| `/upgrade` | "All plans include a 30-day free trial. **Credit card required to hold your spot.**" |

Conflicts with Decision 019. Also sells team sharing (which `/account` lists as *Coming Soon*), usage reporting, and four Enterprise capabilities that don't exist.

**Recommendation unchanged: no checkout during closed beta.**

> **Heading:** Pricing
> **Sub:** Bobert is in closed beta — free, no card, no trial clock. Pricing below is what we expect at launch, published early so you can plan. Nothing to buy yet.
>
> *[four tiers at Decision 023 prices — $59 / $119 / $349 / $1,500 — feature lists trimmed to what ships or is genuinely near]*
>
> **CTA:** Join the beta instead → `#beta`

Strip unbuilt features or mark them `Planned`. Enterprise should not list four capabilities that don't exist.

---

## Safe-Use Placement Spec — confirmed, unchanged

Copy is `marketing/SAFE-USE-COPY.md` v1.0. This is the final placement list so Dev builds against one spec.

| # | Placement | Priority |
|---|---|---|
| 1 | `capture.html` — persistent "Park first" on capture screen | **Highest** |
| 2 | `capture.html` — first-run acknowledgment | High |
| 3 | `index.html` — hero, under subhead | High |
| 4 | `index.html` — footer standing statement | Medium |
| 5 | `upgrade.html` + `success.html` — footer | Medium |
| 6 | Terms of Service — distracted-driving clause (separate, not a substitute) | Medium |

If Dev implements only one, it's #1. A footer line does not change behavior.

---

## Also Still Open — Not Copy, But Blocking Brand Compliance

Carried from the July 29 audit; verified still present today.

- **`brand-check.py` reports 7 violations**, all R1b/R3 and all Dev-owned per the TEAM_SYNC ownership split. `capture`, `leads`, `account`, `intake` and `upgrade` all use `/assets/icon.png` — the 598KB, 1024×1024 app-store icon carrying drifted red — as their header logo. `upgrade.html` and `success.html` declare no favicon.
- **`manifest.json` still unfixed:** both icon entries point at `/assets/icon.png` with wrong `sizes`, **no `purpose: "maskable"`** entry, so the Decision 012 safe-zone geometry is unused on Android. `background_color: #0A0A0A` ≠ locked `#1A1A1A`.

---

## Marketing's Own Follow-On Work

- **`WALKTHROUGH-30SEC-SCRIPT.md` needs a v1.3.** Decision 021 explicitly names it. v1.2's shot-1 montage was built neutral across the old four-audience set, including an FSBO sign — now out of scope. Replacement triggers should be construction-project signals: permit board, electrical rough-in visible through a framed opening, a fixture package staged on a slab. Not doing this in the same pass as the site plan; it's a separate deliverable.
- **`/changelog` initial content** once an owner and cadence are agreed.

---

## Open Questions for BD

| # | Question | Blocks |
|---|---|---|
| 1 | Approve the thesis framing ("Opportunity gets lost twice") as the site's narrative spine? | Sections 4, 5 |
| 2 | Confirm PI is described with no CTA and no waitlist | Section 5, card 2 |
| 3 | `/upgrade` — preview framing as specced, or take it dark during beta? | `/upgrade` rewrite |
| 4 | Who owns `/changelog` upkeep, and at what cadence? | Whether `/changelog` should exist at all |

---

## Handoff Order for Dev

1. Nav link to `/capture` — *minutes, and beta users are currently stranded*
2. Safe-use placement #1 on capture screen
3. R1b logo fixes across 5 pages + `manifest.json` maskable icons and `background_color`
4. Hero subhead + stats row
5. New sections 4, 5, 10
6. "Who It's For" rewrite per Decision 021
7. Footer additions
8. `/upgrade` reframe
9. `/changelog` page scaffold

---

*Marketing deliverable. Copy and structure only — no HTML. Decisions 021, 022, 023 resolved the three conflicts flagged in v1.0.*
