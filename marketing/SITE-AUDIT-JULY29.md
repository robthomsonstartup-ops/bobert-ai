# bobert.ai — Full Site Audit
**Date:** July 29, 2026
**Owner:** Marketing
**Requested by:** BD / Rob — "revisit the whole site with fresh eyes now that there's real product behind it"
**Scope:** `index.html`, `capture.html`, `leads.html`, `account.html`, `intake.html`, `upgrade.html`, `success.html`, `manifest.json`
**Method:** repo source analysis + live DOM inspection of bobert.ai

> **Deliverable:** the revised content/structure plan BD asked for is `marketing/SITE-PLAN-JULY29.md`. This document is the evidence behind it. The plan also covers `/upgrade` reconciliation and the consolidated safe-use placement spec.

---

## Finding 1 — The site does not connect to the product

**This is the most serious thing on the list, and it isn't a messaging problem.**

Every link on bobert.ai is an on-page anchor or a mailto. Verified against the live DOM:

```
(logo)            -> #
Join the Beta     -> #beta
Join the Beta     -> #beta
See How It Works  -> #how
How It Works      -> #how
Features          -> #features
Beta              -> #beta
Contact           -> mailto:hello@bobert.ai
```

There is **no link to `/capture`, `/leads`, `/account`, `/intake`, or `/upgrade`** anywhere on the homepage.

FI is in closed beta with real users. Those users land on bobert.ai and have no way in — they must type `/capture` from memory. The app pages form their own closed loop through a bottom nav (`/capture` ↔ `/leads` ↔ `/account`) that the marketing site never touches and never mentions.

The site still behaves like a pre-launch waitlist page. The product shipped; the front door didn't get cut.

**Recommendation:** add a persistent "Open Bobert" / "Sign in" affordance in the nav pointing to `/capture`. This is the highest-value change on this list and it's roughly a one-line Dev task. Everything else in this audit is discretionary; this one is a live beta member hitting a dead end.

---

## Finding 2 — The site is FI-only. It has not caught up to Decision 018.

Occurrences in `index.html` of "intake", "Project Intake", "PI", "sector", or "platform": **zero.**

`manifest.json` description: *"Capture field opportunities before they're forgotten."* — FI only.

So yes, the site reads as a single-purpose field-capture tool, exactly as BD suspected.

**But I do not recommend fixing this yet, and that's a deliberate disagreement with the framing of the ask.**

`PROMPT-MARKETING-JULY29-FI-PI-BRAND.md` is explicit: PI is *"currently a personal-use tool for Rob at CS Illumination — not a public product yet, no marketing push needed,"* and *"don't change any live copy or positioning yet — PI isn't public."*

Adding a second sector to public messaging now would:

- Advertise something a visitor cannot use or buy
- Dilute FI's message during the exact window when FI needs accuracy feedback from beta users (Decision 019)
- Repeat the `/upgrade` mistake — promising capability ahead of availability — in the highest-traffic place on the site

**Recommendation:** keep the public site FI-only until PI has an external audience. What the site *should* do now is stop implying Bobert is a single feature, so PI can be added later without a rebuild. That's an architecture change, not a copy change — see Finding 6.

**Structural note for whenever PI does go public:** `intake.html` is currently orphaned even inside the app. Its own bottom nav links to `/capture`, `/intake`, `/leads`, but `capture.html`, `leads.html`, and `account.html` contain zero references to `/intake`. Reachable only by direct URL. Correct for a personal tool; a blocker the day it isn't one.

---

## Finding 3 — The audience section contradicts a locked decision

The site's "Who It's For" names four verticals, in this order:

1. Real Estate
2. Construction & Trades
3. Landscaping & Exterior
4. Field Sales

**Decision 004 locks the beachhead as:** construction and commercial field sales — lighting, electrical, HVAC, roofing, solar, signage, manufacturers' reps. Expansion is *"CRE, nonprofit, corporate BD, healthcare, university development — after 10+ paying customers."*

Real Estate is not the beachhead and is not even in the expansion list. Landscaping is in neither. Yet Real Estate leads the section, and its copy is the most specific on the page ("FSBOs, expired listings, distressed properties before they hit the MLS").

Two of four featured audiences are outside the locked market, and the highest-priority one is listed second.

**This is a decision conflict, not a preference.** Either the site is wrong or Decision 004 is stale. Per WORKFLOW.md I'm not resolving it unilaterally — flagging to BD.

**My read:** Decision 004 is the better strategy. A bootstrapped solo founder with $0 marketing budget (Decisions 003, 013) cannot credibly serve four unrelated trades at once, and Rob's own domain expertise is lighting/electrical via CS Illumination. Leading with Real Estate spends the beachhead advantage.

**Self-correction:** `WALKTHROUGH-30SEC-SCRIPT.md` v1.2 is built to read neutrally across those four site verticals. If Decision 004 stands, I made it neutral across the wrong set — the montage should be construction and field-sales triggers, not FSBO signs. Not amending until BD rules, since the fix depends on the ruling.

---

## Finding 4 — Two homepage stats are unfalsifiable

| Stat | Label | Assessment |
|---|---|---|
| `<10s` | Capture time, curb to saved | Defensible — Dev has tested real captures |
| `GPS` | Auto-tagged location every time | Fine |
| **`0`** | **Opportunities forgotten** | Not a measurement. Nothing supports it. |
| **`∞`** | **Leads you used to miss** | Meaningless as a figure |

The audience is tradespeople and field reps who are professionally allergic to being sold to. `0` and `∞` are the two numbers on the page that a skeptical buyer will notice, and they undercut `<10s`, which is real and impressive.

**Recommendation:** replace both with something true, or cut the row to two stats. A row of two credible numbers beats four where half are decorative.

---

## Finding 5 — Brand and asset issues

### 5a. `brand-check.py` was under-reporting — my bug, now fixed

Rule R1b matched only `class="logo|nav-brand|footer-brand"`. The four app pages use `class="logo-mark"`, which the pattern missed entirely.

**Violations went from 3 to 7** once corrected. `capture.html`, `leads.html`, `account.html`, and `intake.html` all use `/assets/icon.png` as their header logo — the 598KB, 1024×1024 app-store icon, which also carries the drifted red (~#E41D1E, not #DC2626).

That's the same violation Dev assessed as "no action needed" on `upgrade.html` on July 28, present on four more pages, including the one beta users see most. Per the ownership split now in TEAM_SYNC, R1b is Dev's to fix.

### 5b. Gate 7 assets are built but not wired

`manifest.json` declares two icon entries, both pointing at `/assets/icon.png`:

```json
{ "src": "/assets/icon.png", "sizes": "192x192" },
{ "src": "/assets/icon.png", "sizes": "512x512" }
```

Problems:

- Both `sizes` values are wrong — the file is 1024×1024
- **No `"purpose": "maskable"` entry.** The adaptive icon set built for Gate 7 (`adaptive-icon.png` and variants) is referenced nowhere. On Android home screens the icon will be letterboxed or auto-cropped rather than using the safe-zone geometry locked in Decision 012
- No `monochrome` purpose for Android 13+ themed icons
- `background_color: "#0A0A0A"` — not the locked `#1A1A1A` (Decision 009)
- `theme_color: "#DC2626"` while `index.html` declares `theme-color` as `#1A1A1A` — the two disagree

Gate 7 was closed on "assets exist." They exist and are unused. **Marketing owns the asset files (R6–R10); the manifest is code, so wiring is Dev's.** I should have caught this when I closed the gate.

---

## Finding 6 — "How do we be better everyday?" — recommendation

BD asked whether the motto deserves a locked place in the brand system. **My recommendation: yes, but not as copy — as a structure.**

### First, a mechanical note

"Everyday" (one word) is an adjective — *an everyday occurrence*. The adverb is two words: *every day*. As a question about frequency it should read:

> **How do we be better every day?**

Worth fixing before it's ever set in type, on a wall, or in a footer.

### Why bolting it on the homepage would be weak

A landing page that says "we improve continuously" is making the same category of claim as "0 opportunities forgotten" — an assertion the reader has no reason to accept. Every company says it. Saying it louder doesn't help.

### What would actually demonstrate it — answering "show, not claim"

The repo already contains the proof: `CHANGELOG.md`, dated entries, real shipped work.

**Proposal — a public "What's shipping" page at `/changelog`:**

- Dated, plain-language entries of what changed and when
- Written for users, not developers ("Follow-up reminders now survive a reload" not commit hashes)
- Linked in the footer, not the hero
- No roadmap promises — shipped things only

This is credible precisely because it's falsifiable and self-updating. A dated list going back weeks proves a pace of improvement in a way no adjective can. It is also the single most persuasive artifact available to a solo founder competing against incumbents: visible velocity.

**Second, smaller proposal — an "Our approach" line, footer or about:**

> We ship, we listen, we fix it. Every day.

Motto as operating principle, stated once, quietly, where someone looking for it will find it. Not in the hero, which belongs to the tagline (Decision 007, unchanged).

### What this needs from BD

A locked place in the brand system means a new Decision. I'm not writing one — DECISIONS.md is BD-owned and this is a proposal, not a Marketing call. If BD wants it locked, the decision should cover: the corrected wording, that it is an operating principle and **not** a tagline or a replacement for Decision 007, and where it may and may not appear.

---

## Priority Order

| # | Item | Owner | Effort | Why this rank |
|---|---|---|---|---|
| 1 | Link the site to the app (`/capture` in nav) | Dev | Minutes | Live beta users currently hit a dead end |
| 2 | Resolve the Decision 004 vs "Who It's For" conflict | BD | Decision | Blocks Gates 5/6 and the walkthrough script |
| 3 | Fix R1b on 5 pages + wire maskable icons in manifest | Dev | Small | Brand compliance + Gate 7 actually delivering |
| 4 | Replace the `0` / `∞` stats | Marketing | Small | Credibility with a skeptical audience |
| 5 | Decide on the motto proposal | BD | Decision | Unblocks `/changelog` and the approach line |
| 6 | FI/PI site architecture | Marketing | Medium | Deliberately deferred until PI is public |

---

## What I Am Not Doing, and Why

- **Not adding PI to public messaging.** The standing Marketing directive says PI isn't public and live copy shouldn't change. Advertising it now repeats the `/upgrade` error.
- **Not resolving the audience conflict myself.** Decision 004 is locked; changing the site's target market is a BD call routed per WORKFLOW.md.
- **Not editing any `.html`.** Marketing owns copy, Dev owns code. Everything above is specified for Dev to implement.
- **Not writing a Decision for the motto.** BD owns DECISIONS.md. Proposal only.
- **Not amending the walkthrough script yet.** The correct fix depends on how BD rules on Finding 3.

---

*Marketing audit. Findings 1, 3, and 5b are the ones I'd act on this week.*
