# bobert.ai — Revised Site Content & Structure Plan
**Version:** 1.0
**Date:** July 29, 2026
**Owner:** Marketing (copy + structure). **Implementation:** Dev.
**Status:** For BD review before it goes to Dev.
**Companion:** `marketing/SITE-AUDIT-JULY29.md` — findings and evidence behind these recommendations.

**Not in scope, per directive:** product name, tagline, logo, palette. All locked (001, 006, 007, 009, 010, 011). Nothing below changes a locked decision. Two items surface *conflicts* with locked decisions and are flagged to BD rather than decided.

---

## Section 0 — The One Change That Matters Most

**Add a way into the product.**

bobert.ai currently has no link to `/capture`, `/leads`, `/account`, `/intake`, or `/upgrade`. Every href is an on-page anchor or a mailto. FI is in closed beta with real users, and those users cannot reach the app from the homepage — they type `/capture` from memory.

**Nav, right side, before "Join the Beta":**

> **Open Bobert** → `/capture`

Plain text link, white, no button treatment — it should read as a utility for people who already belong, not a competing CTA. "Join the Beta" stays the primary red button for new visitors.

Everything else in this document is discretionary. This one is a dead end for existing users.

---

## Revised `index.html` — Section by Section

### 1. NAV
| | |
|---|---|
| **Keep** | Wordmark (`bobert-wordmark-white.png`), "Join the Beta" red CTA |
| **Add** | "Open Bobert" text link → `/capture` |

### 2. HERO
**Keep exactly:** "See what others drive past." (Decision 007), the subhead, both CTAs.

**Add one line** beneath the subhead, small, mid-gray:

> Built to be used stopped. Pull over, capture in seconds, get back on the road.

This is safe-use block 3 from `SAFE-USE-COPY.md`. It belongs in the hero rather than only the footer because the hero is where the driving imagery lands.

### 3. STATS — replace two of four

Current row: `<10s` · `GPS` · `0` · `∞`

`0 Opportunities forgotten` and `∞ Leads you used to miss` are not measurements. This audience is professionally allergic to being sold to, and those two numbers undercut `<10s`, which is real.

**Recommended row of three:**

| Figure | Label |
|---|---|
| `<10s` | Capture time, curb to saved |
| `GPS` | Auto-tagged, every capture |
| `1 photo` | Everything else fills itself in |

The third reframes the actual product truth — minimum input, maximum output — without inventing a metric. If BD prefers four, the fourth should wait until there's a real number from beta telemetry (Dev is instrumenting cost-per-brief; capture counts would come from the same work).

### 4. HOW IT WORKS
**Keep as-is.** "Three taps." / See It → Capture It → Follow Up. Accurate to the shipped product and consistent with the walkthrough script.

### 5. FEATURES
Current six: Photo Capture · Auto GPS Tag · Voice Notes · Follow-Up Reminders · Leads Dashboard · Built for Speed.

**One change.** "Leads Dashboard" oversells what shipped — `/leads` is a list, and `/account` itself labels Export, Notifications, and Team Sharing as *Coming Soon*.

> **Rename:** Leads Dashboard → **Your List**
> **Copy:** Every opportunity you've saved, in one place. Photo, location, note, follow-up date.

**Add a seventh card — the AI intel card, which is now real (Decision 020):**

> **Project Intel**
> Capture a job site and Bobert pulls what it can find — project, company, contacts, a routing note.

**Wording is deliberate.** "pulls what it can find" is honest about a system Dev reports still speculates ("possibly key staff"). Do not upgrade this to "verified" or "confirmed" until Dev closes the enrichment-accuracy item. This is the same discipline that `/upgrade` failed.

### 6. VIDEO
**Keep.** Existing embed stays. When the 30-second walkthrough is produced it replaces or joins this — pending the Finding 3 ruling below.

### 7. WHO IT'S FOR — ⚠️ blocked on BD

Current four: Real Estate · Construction & Trades · Landscaping & Exterior · Field Sales.

**Decision 004 locks the beachhead as** construction and commercial field sales — lighting, electrical, HVAC, roofing, solar, signage, manufacturers' reps. Real Estate is not the beachhead and is not in the expansion list. Landscaping is in neither. Yet Real Estate leads the section and carries the most specific copy on the page.

**Two of four featured audiences sit outside the locked market.** Per WORKFLOW.md I'm not resolving this. Options for BD:

| Option | Consequence |
|---|---|
| **A — Site follows 004** | Lead with construction/electrical/HVAC/roofing/solar/signage/rep firms. Sharper, matches Rob's own CS Illumination expertise. Drops two audiences currently being courted. |
| **B — Amend 004** | Formally widen the beachhead to include real estate and exterior services. Honest about what's being marketed, but a solo founder at $0 spend serving four unrelated trades is thin. |
| **C — Status quo** | Site and ledger stay in conflict. Not recommended — this is exactly the drift WORKFLOW.md exists to catch. |

**Marketing's recommendation: A.** Rob's credibility is in the trades. Leading with Real Estate spends the beachhead advantage on the audience he knows least.

**Dependency:** Gates 5 and 6 (one-pager, LinkedIn assets) and the walkthrough script all inherit this. `WALKTHROUGH-30SEC-SCRIPT.md` v1.2 is built neutral across the current four verticals — if A is chosen, its montage needs reshooting toward trades triggers rather than FSBO signs. Holding that edit until BD rules.

### 8. WHAT'S SHIPPING — new section

This is the answer to "show, not just claim" continuous improvement. See the `/changelog` spec below. On the homepage it appears as a short teaser, not the full list:

> **Section label:** Built in the Open
> **Heading:** We ship every week.
> **Body:** Bobert is early, and improving fast. Here's what changed recently — dated, specific, no roadmap promises.
>
> *[three most recent changelog entries, dated]*
>
> **Link:** See everything that's shipped → `/changelog`

Placed after the video and before beta signup: it converts a skeptic who liked the product but doubts a one-person company will still exist in six months.

### 9. BETA SIGNUP
**Keep.** Brevo capture works. Add nothing — this section converts.

### 10. FOOTER
**Add three things:**

1. **Safe use** (block 4, `SAFE-USE-COPY.md`):
   > **Safe use:** Bobert is intended for use while stopped. Never use a mobile device while driving. Obey all applicable traffic laws.
2. **Approach line** — see motto proposal below.
3. **Link:** What's shipped → `/changelog`

---

## New Page — `/changelog`

**Purpose:** demonstrate continuous improvement rather than assert it. The repo already has the raw material in `CHANGELOG.md`.

**Structure:** reverse-chronological, dated, plain language. No version numbers, no commit hashes, no roadmap.

**Voice rules:**

| Do | Don't |
|---|---|
| "Follow-up reminders now survive a reload." | "Refactored IndexedDB persistence layer." |
| "Fixed: the logo was invisible on dark backgrounds." | Silently omit the embarrassing ones. |
| Name what broke and that it's fixed. | Promise what's next. |

**Including the fixes is the point.** A changelog of only features reads like marketing. A changelog that says *"the nav logo was broken for a week — fixed"* reads like a company that watches its own work. That is the motto demonstrated instead of stated.

**Header copy:**

> **Built in the open**
> Bobert is early. Here's exactly what's changed, and when. We'd rather show you the work than tell you about it.

**Maintenance:** entries derive from `CHANGELOG.md`, which departments already update per WORKFLOW.md. Marketing translates dev-language to user-language. **Flag:** this needs an owner and a cadence or it goes stale in three weeks and becomes evidence *against* the claim. Recommend Marketing owns translation, triggered by any user-visible ship.

---

## `/upgrade` — Reconciliation

**Current state contradicts itself across two live pages:**

| Page | Says |
|---|---|
| `/account` | "You're in beta. **Full access, no charge.** Help us get the intel right." |
| `/upgrade` | "All plans include a 30-day free trial. **Credit card required to hold your spot.**" |

A beta member told they owe nothing can navigate to `/upgrade` and be asked for a card. That contradicts Decision 019 (no billing gate during beta).

**Further mismatches against what actually ships:**

| `/upgrade` sells | Reality |
|---|---|
| Professional: "team sharing" | `/account` lists Team Sharing under **Coming Soon** |
| Team: "usage reporting" | Not shipped |
| Enterprise: "White-label, API access, SLA, custom integrations" | None exist |
| Solo: "contact enrichment" | Real (Decision 020), but Dev reports it speculates rather than verifies |

**Recommendation: `/upgrade` should not offer checkout during closed beta.**

It is already unreachable from the homepage, so this is a small change with no traffic cost. Replace tier buttons with a preview framing:

> **Heading:** Pricing
> **Sub:** Bobert is in closed beta — free, no card, no trial clock. Pricing below is what we expect at launch, published early so you can plan. Nothing to buy yet.
>
> *[four tiers, prices shown, feature lists trimmed to what ships or is genuinely near]*
>
> **CTA:** Join the beta instead → `#beta`

Then strip unbuilt features from the tier lists, or mark them explicitly `Planned`. Enterprise in particular should not list four capabilities that don't exist.

**Note for BD — ledger drift:** `DECISIONS.md` Decision 005 records pricing as *ranges* ($49–79 / $99–149 / $299+ / Custom). TEAM_SYNC and the live page use fixed figures ($59 / $119 / $349 / $1,500). The live page is presumably right, but 005 was never updated. Flagging, not editing.

---

## Safe-Use — Consolidated Placement Spec

Per the directive, confirming placements so Dev builds against one spec. Copy is unchanged from `marketing/SAFE-USE-COPY.md` v1.0; this is the final placement list.

| # | Placement | Block | Priority |
|---|---|---|---|
| 1 | `capture.html` — persistent on capture screen | "Park first. Bobert works best stopped. Never capture while driving." | **Highest** |
| 2 | `capture.html` — first-run one-time acknowledgment | Onboarding block (block 2) | High |
| 3 | `index.html` — hero, under subhead | "Built to be used stopped..." | High |
| 4 | `index.html` — footer | Standing statement (block 4) | Medium |
| 5 | `upgrade.html` + `success.html` — footer | Standing statement | Medium |
| 6 | Terms of Service | Distracted-driving clause — separate from the above, not a substitute | Medium |

**Confirmed, no changes.** Placement 1 is the one that changes behavior; a footer line does not. If Dev implements only one item, it's that.

---

## Motto — "How do we be better every day?"

**Recommendation: lock it as an operating principle, not as site copy.**

### Wording correction first

"Everyday" (one word) is an adjective — *an everyday occurrence*. The adverb is two words:

> **How do we be better every day?**

Worth fixing before it is set in type anywhere.

### Where it should and shouldn't go

**Should not:** the homepage hero, or anywhere adjacent to the tagline. "See what others drive past." is the customer-facing promise (Decision 007) and shouldn't share space with an internal principle. A landing page asserting "we improve continuously" is the same species of unfalsifiable claim as `0 opportunities forgotten`.

**Should:** one quiet footer line, plus the `/changelog` page as its proof.

> **Footer:** We ship, we listen, we fix it. Every day.

The motto's real expression is `/changelog`. The principle is *demonstrated* by dated evidence and merely *stated* by the footer line. That ordering is what makes it credible.

### What BD needs to decide

Locking this means a new Decision, and DECISIONS.md is BD-owned. If BD wants it locked, the entry should cover:

1. Corrected wording — "every day," two words
2. That it is an **operating principle**, explicitly not a tagline and not a replacement for Decision 007
3. Where it may appear (footer, `/changelog`, about page, internal docs) and where it may not (hero, wordmark lockup, paid ads)
4. That `/changelog` is its primary public expression

Proposal only — not written to the ledger.

---

## Open Questions for BD

| # | Question | Blocks |
|---|---|---|
| 1 | Decision 004 vs "Who It's For" — option A, B, or C? | Section 7, Gates 5 & 6, walkthrough script |
| 2 | Lock the motto as a Decision? | Footer line, `/changelog` framing |
| 3 | `/upgrade` — preview framing, or take it dark during beta? | `/upgrade` rewrite |
| 4 | Who owns `/changelog` upkeep and at what cadence? | Whether `/changelog` should exist at all |
| 5 | Update Decision 005 to fixed prices? | Ledger accuracy only |

---

## Handoff Order

1. **BD reviews this document** and answers the five questions above
2. **Dev implements** in priority order: nav link to `/capture` → safe-use placement 1 → R1b logo fixes + maskable icons in manifest → stats row → `/upgrade` reframe
3. **Marketing** writes `/changelog` initial content once question 4 is answered, and revises the walkthrough script once question 1 is answered

---

*Marketing deliverable. Copy and structure only — no HTML. Two locked-decision conflicts flagged to BD (Decisions 004, 005) rather than decided.*
