# Bobert — Team Sync
**Date:** July 29, 2026
**Status:** Active — web platform live at bobert.ai, FI in closed beta, PI in personal-use validation
**Source of truth:** This file + business/DECISIONS.md. Pull latest from main and read both before acting. **DECISIONS.md always wins if the two ever disagree — this file is a summary, not the ledger.**

**Process:** See `business/WORKFLOW.md` for the full cross-department protocol — read it before your first commit of any session.

**Standing rule (effective July 29):** Any commit that changes a locked decision, ships a feature, or changes department status must update the relevant section of this file in the **same commit**. Before writing a new numbered Decision, check the current highest number in DECISIONS.md first — collisions have happened twice (Decision 016, Decision 018) when sessions wrote independently without checking.

---

## The Platform

Bobert AI is the platform; Bobert is the brand (domain bobert.ai, "B" Corner Signal mark, "Bobert" name — Decision 010). Two sectors (Decision 018):

- **Bobert FI (Field Intelligence)** — LIVE, closed beta. Point your phone at a project, get GPS + AI-generated intel (developer, GC, contacts, routing note) in seconds. No billing/trial gating during beta (Decision 019) — full access, free, to gather accuracy feedback before charging anyone.
- **Bobert PI (Project Intake)** — LIVE, personal-use tool for Rob at CS Illumination. Bid invite / RFP / screenshot in, structured project summary + RFI checklist + generic deal draft out. No CRM integration yet — CS Illumination's stack is unknown.

---

## The Team

| Department | Owner | Session / Tool |
|---|---|---|
| Business Development | Claude (VP BD) | Cowork session |
| Marketing | Claude (Bobert AI marketing project) | Claude project |
| Development (FI) | Claude (Bobert AI App Developer/Programmer project) | Claude project |
| Development (PI) | Claude (Bobert AI PI Development project) | Claude project |
| Finance | Claude (Bobert AI finance project) | Claude project |
| Founder / CEO | Rob Thomson | Indianapolis, IN — starting at CS Illumination Aug 3 |

**Rules:**
- GitHub is the single source of truth for all documents.
- `business/DECISIONS.md` is the single source of truth for all locked decisions — never treat a citation in this file or any prompt as real until it's actually in DECISIONS.md.
- No department changes a locked decision without an RFI through BD.
- Marketing owns all customer-facing visual assets — Dev implements, does not create.
- Dev owns all code — Marketing and BD do not modify code.
- **brand-check.py ownership split:** rules R1, R1b, R2, R3 (code/markup issues) are Dev's to fix. Rules R6, R7, R8, R9, R10 (asset file properties) are Marketing's to fix. R4 is a warning-only palette-drift check, review as needed, no fixed owner.

---

## What Is Locked (Do Not Revisit)

See `business/DECISIONS.md` for full text — currently through **Decision 020**. Highlights:

| Decision | Details | Ref |
|---|---|---|
| Product name | **Bobert** | 001 |
| Pricing | Solo $59 / Pro $119 / Team $349 / Enterprise $1,500, 30-day free trial | 005 |
| Logo | Corner Signal mark — must not be filtered/recolored/cropped | 006, 010 |
| Tagline | "See what others drive past." | 007 |
| Wordmark assets | Pre-rendered transparent PNGs only, never filter/blend-mode | 011 |
| No upfront spend | $0 starting capital, no contractor spend until revenue | 013 |
| Revenue-first mandate | Finance finds the path to self-funded growth | 014 |
| Stripe bootstrap | Live mode on Rob's personal account when ready — LLC deferred to post-revenue | 015 |
| Stripe gate | **Stays in test/sandbox mode** until /capture is proven end-to-end | 016 |
| Founder Decisions A-F | Closed | 017 |
| Two-sector platform | Bobert FI + Bobert PI under one brand | 018 |
| Beta strategy | Closed beta, no billing gate during beta | 019 |
| Apollo free-tier | Free credits for beta enrichment; paid tier needs Finance sign-off | 020 (open dependency — see Finance section below) |

---

## Current Status by Department — July 29, 2026

### Business Development
- ✅ Domain (bobert.ai), Vercel hosting, GitHub repo — all live
- ✅ Logo/wordmark rendering fixed on nav + footer
- ✅ Email capture wired to Brevo — confirmed working
- ✅ Stripe Checkout built (4 tiers, 30-day trial, webhook) — **sandbox only**, gated by Decision 016
- ✅ FI `/capture`, `/leads`, `/account` live — real capture tested (O'Shea Orthopaedic)
- ✅ PI `/intake` live and tested — extraction, checklist, deal draft, Copy/Print/Email/Save
- ✅ Founder Decisions A-F closed (017); Decisions 019/020 reconciled into the ledger (previously cited in TEAM_SYNC but never actually logged)
- 🔲 LLC formation — deferred until first paid subscriptions land (015)
- 🔲 Aug 10-12 checkpoint — tracking signups/run-rate/Stripe-live/auth/cost-per-brief toward Sep vs Oct launch

### Finance
- ✅ v1.1 Revenue Mandate model built ($0 start, $0 contractor)
- ✅ Founder Decisions A-F closed
- ✅ **Contact enrichment vendor cost model complete (July 29)** — PDL (People Data Labs) recommended over Apollo at $0.28/record; Apollo has a TOS conflict with Bobert's use case. 1 contact/brief cap protects 77%+ GM on Solo. Add-on reveals priced at $1.25/contact. File: `finance/FINANCE-APOLLO-COST-JULY28.md`.
- ✅ **PI monetization research complete (July 29)** — exploratory, directional only. Path A (bundle PI into Pro/Team tiers) recommended for validation phase. No standalone PI pricing until Rob validates through real use at CS Illumination. File: `finance/FINANCE-PI-MONETIZATION-JULY29.md`.
- ⚠️ **Open tension with Decision 020:** Decision 020 (Apollo free-tier for beta) and Finance's PDL recommendation are not yet reconciled — Decision 020 covers the free-during-beta arrangement only, not the paid-vendor choice once beta ends. **Blocking on Dev (FI) to confirm which vendor is actually in production** before this closes — see `business/PROMPT-DEV-FI-JULY29.md`.
- 🔲 Cost-per-brief telemetry — still estimated at $0.10, needs real usage data from Dev. Cannot close until Dev instruments and reports.
- ⚠️ **Flag for BD:** DECISIONS.md has a duplication bug — Decisions 019 and 020 each appear twice in full. BD should clean before the next numbered decision is appended.

### Marketing
- ✅ Wordmark/logo fix confirmed live
- ✅ Gate 7 (adaptive icon assets) — CLOSED, all six assets built and committed
- ✅ brand-check.py compliance tooling built and running (`scripts/brand-check.py`) — current result: 3 violations, all Dev-owned (see Dev section)
- 🔲 Gates 5 & 6 (one-pager, LinkedIn assets) — reclassified as **blocked on positioning**, not just open: `/capture`'s intel card currently speculates on contacts ("possibly key staff") rather than verifying, so the enrichment claim on `/upgrade` is half-true rather than plainly false. Copy built before this resolves will need rework.
- ✅ **Distracted-driving copy — DONE.** `marketing/SAFE-USE-COPY.md` v1.0. Six placement-specific copy blocks (capture screen, onboarding, site, footer, motion assets, paid pages), tone rules, do-not-say list. **Awaiting Dev implementation** — Marketing owns copy, Dev owns placement. Finding: the site currently has *zero* safe-use language while the whole pitch is driving-adjacent
- ✅ Walkthrough script corrected to v1.2 — v1.1's opening depicted capture while driving. New shot 1b: vehicle visibly stops before the phone appears. Self-flagged, not quietly amended
- ✅ FI/PI two-sector awareness acknowledged (`PROMPT-MARKETING-JULY29-FI-PI-BRAND.md`) — brand unchanged, FI/PI are sectors not sub-brands, no action required, nothing in flight affected
- 🔲 `/upgrade` copy vs actual scope. **Now partly superseded:** Decision 019 removes the billing gate for closed beta, so nobody is charged during beta — this lowers urgency but the page is still publicly promising features. Decision 020 makes "contact enrichment" a real capability (Apollo free tier), so the claim is no longer false. Open question for BD: is `/upgrade` still public during a no-billing beta, and if so does it describe beta or post-beta?
- ⚠️ **Ledger integrity — for BD, not Marketing to fix.** `DECISIONS.md` currently contains duplicate numbered entries: **016 twice (conflicting titles)**, **019 twice (identical)**, **020 twice (structurally malformed — a stray 019 block is nested inside the second 020)**. Per WORKFLOW.md, DECISIONS.md is BD-owned and Marketing does not edit locked decisions. Reported, not touched
- ⚠️ Attribution note: Decisions 019/020 are logged as "reconciled from Marketing session TEAM_SYNC.md draft." Marketing flagged that commit `f73c519` cited a Decision 019 absent from the ledger; Marketing did not author those decisions or mis-number anything as 018. Minor, but the ledger should be accurate about provenance

### Development (FI)
- ✅ `/capture`, `/leads`, `/account` all live — photo, GPS, note, follow-up date, AI intel card, save, beta-member dashboard
- ✅ Apollo wired into `/api/capture-intel` for contact enrichment (free tier, per Decision 020)
- 🔲 **Blocking Finance:** confirm whether Apollo (current) or PDL (Finance's recommendation) is the vendor going forward — see `PROMPT-DEV-FI-JULY29.md`
- 🔲 Contact enrichment accuracy — intel card currently speculates instead of verifying; explore free/public sources (county property records, contractor license lookups, permit databases) alongside the vendor decision
- 🔲 **brand-check.py fixes owed (all Dev-owned, all quick):**
  - `success.html` — add `<link rel="icon">`
  - `upgrade.html` — add `<link rel="icon">`
  - `upgrade.html` — nav/footer brand chrome uses `icon.png`, must use `bobert-wordmark-white.png` instead (same fix already applied on `index.html`)
- 🔲 Stripe live-mode flip — blocked on Decision 016 gate (product must justify the trial promise)

### Development (PI)
- ✅ `/intake` live — text paste, AI extraction (Groq), checklist, deal draft, Box folder plan, Copy/Print/Email/Save
- 🔲 Multi-source intake (screenshots, PDFs, files, reference links combined) — see `PROMPT-DEV-JULY29-INTAKE-IMAGE-UPLOAD.md`, not blocking, post-Monday
- 🔲 CRM push — explicitly out of scope until CS Illumination's actual stack is known
- 🔲 Open question: what did commit `f73c519`'s message mean by "Decision 019"? That number is now taken by the real, reconciled Decision 019 (beta strategy) above — if PI Dev meant something different, it needs its own number and proper logging, not a repeat of the collision pattern.

---

## Blocked / Waiting

| Item | Blocked by | Who unblocks |
|---|---|---|
| Stripe live mode | `/capture` MVP being fully proven (Decision 016) | Dev + Rob sign-off |
| LLC formation | First paid subscriptions (Decision 015) | Revenue |
| Contact enrichment vendor | Dev confirming Apollo vs. PDL against Finance's cost model | Dev (FI) |
| PI → CRM integration | Knowing CS Illumination's actual tech stack | Rob, once on the job |
| Sep vs Oct launch decision | Aug 10-12 checkpoint results | Rob, Aug 10-12 |
| Marketing Gates 5 & 6 | Contact-enrichment accuracy resolving (copy can't be finalized against a half-true claim) | Dev (FI) |

---

## Reference Files in Repo

| File | Purpose |
|---|---|
| DECISIONS.md | All locked decisions — single source of truth, currently through 020 |
| business/TEAM_SYNC.md | This file — cross-department status, read first |
| finance/FINANCE-STATUS-JULY28.md | Finance session-resumption doc |
| finance/FOUNDER-DECISIONS-JULY20.md | Closed — all six items answered (017) |
| business/FINANCE-APOLLO-COST-JULY28.md | Vendor cost model — PDL vs Apollo |
| business/PROMPT-DEV-JULY28-CONTACT-ENRICHMENT.md | Original contact-enrichment accuracy direction |
| business/PROMPT-DEV-FI-JULY29.md | Finance's PDL-vs-Apollo confirmation ask to Dev |
| business/PROMPT-FINANCE-JULY29-PI-MONETIZATION.md | PI monetization research ask |
| business/PROMPT-MARKETING-JULY29-FI-PI-BRAND.md | FI/PI brand awareness briefing |
| business/PROMPT-DEV-JULY29-PROJECT-INTAKE.md | Original PI MVP build spec |
| business/PROMPT-DEV-JULY29-INTAKE-IMAGE-UPLOAD.md | Multi-source intake spec (post-Monday) |
| business/PROMPT-DEV-JULY29-INTAKE-EXPORT-ACTIONS.md | Print/Email export spec |
| business/PROMPT-ALL-DEPTS-JULY29-TEAM-SYNC-RULE.md | Standing rule — update this file in the same commit as status changes |

---

*Pull latest from main before starting any session. Read DECISIONS.md and TEAM_SYNC.md first — and if anything in this file's "What Is Locked" table doesn't match DECISIONS.md exactly, DECISIONS.md is correct and this file needs fixing. Update this file's "Current Status by Department" section at the end of any session that changes state.*
