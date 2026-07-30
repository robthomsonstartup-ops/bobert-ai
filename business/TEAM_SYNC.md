# Bobert — Team Sync
**Date:** July 30, 2026
**Status:** Active — web platform live at bobert.ai, FI in closed beta, PI in personal-use validation, site rebuild in progress (v2.0 plan)
**Source of truth:** This file + business/DECISIONS.md. Pull latest from main and read both before acting. **DECISIONS.md always wins if the two ever disagree — this file is a summary, not the ledger.**

**Process:** See `business/WORKFLOW.md` for the full cross-department protocol — read it before your first commit of any session.

**Standing rule (effective July 29):** Any commit that changes a locked decision, ships a feature, or changes department status must update the relevant section of this file in the **same commit**. Before writing a new numbered Decision, check the current highest number in DECISIONS.md first — collisions have happened twice (Decision 016, Decision 018) when sessions wrote independently without checking.

**Scope rule (effective July 29):** Every department has a defined lane in `business/WORKFLOW.md` ("Staying In Your Lane"). If you hit work outside your lane, don't attempt it — log it under the *owning* department's section here, and hand Rob the redirect prompt from WORKFLOW.md so it reaches the right chat without getting lost.

---

## The Platform

Bobert AI is the platform; Bobert is the brand (domain bobert.ai, "B" Corner Signal mark, "Bobert" name — Decision 010). Two sectors (Decision 018):

- **Bobert FI (Field Intelligence)** — LIVE, closed beta. Point your phone at a project, get GPS + AI-generated intel (developer, GC, contacts, routing note) in seconds. No billing/trial gating during beta (Decision 019) — full access, free, to gather accuracy feedback before charging anyone.
- **Bobert PI (Project Intake)** — LIVE, personal-use tool for Rob at CS Illumination. Bid invite / RFP / screenshot / file / URL in, structured project summary + RFI checklist + generic deal draft out. Multi-source intake shipped July 29. No CRM integration yet — CS Illumination's stack is unknown. **Current focus: PI UI build-out and expediting multi-source-to-structured-output speed, eliminating manual entry.**
- **Public site as of July 30:** the homepage is being rebuilt (`marketing/SITE-PLAN-JULY30.md` v2.0) to present both sectors — FI live, PI described as "in development," no CTA. Confirmed directly by Rob.

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

See `business/DECISIONS.md` for full text — currently through **Decision 023**, deduplicated and clean (`fb46536`). Highlights:

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
| Beachhead scope | Construction-project ecosystem, not a fixed trade list; live beachhead = lighting/electrical (Rob's own vertical); Real Estate and Landscaping explicitly excluded | 021 |
| Operating principle | "How do we be better every day?" — internal principle, footer + `/changelog` only, not a tagline, not homepage hero | 022 |
| Pricing (fixed) | Solo $59 / Pro $119 / Team $349 / Enterprise $1,500/mo — supersedes 005's range language, trial terms unchanged | 023 |
| `/changelog` ownership | Marketing owns content — translates Dev's technical commits into plain, user-facing language. Cadence: triggered by any user-visible ship, not on a fixed schedule. | 024 |
| Beta access architecture | **Corrected July 30.** Both FI and PI are personal + colleague-testing phase right now — not open public beta for either. One live domain (bobert.ai) throughout: homepage is a general overview/portal for the Bobert system, linking out to each tool. No separate staging site — current build scales up in place to a public-launch-ready state once feedback lands, then opens for business signups. Both `/capture` (FI) and `/intake` (PI) get a lightweight passcode/invite gate — not full auth, just enough that only people Rob shares the link with can get in. Neither tool is open to the general public yet. | 025 |

---

## BD Rulings — July 30 (on SITE-PLAN-JULY30.md v2.0)

Rob ruled directly on Marketing's open questions before this goes further into Dev:

- **PI on the homepage: confirmed.** Describe-only, "in development," no CTA, no waitlist — as specced in v2.0 §5.
- **Thesis framing ("Opportunity gets lost twice"): build it, not locked yet.** Rob wants to see it live before final sign-off — copy may get revised after reacting to the real page, not treated as approved-final.
- **`/upgrade`: no change from prior direction.** Preview only, no checkout, testing-only — not a locked structure.
- **`/changelog` ownership/cadence: still open**, doesn't block Dev building the page shell.

See `business/PROMPT-DEV-FI-JULY30-SITE-V2.md` — supersedes the two earlier FI site prompts, consolidates everything into one directive.

---

## Current Status by Department — July 30, 2026

### Business Development
- ✅ Domain (bobert.ai), Vercel hosting, GitHub repo — all live
- ✅ Logo/wordmark rendering fixed on nav + footer
- ✅ Email capture wired to Brevo — confirmed working
- ✅ Stripe Checkout built (4 tiers, 30-day trial, webhook) — **sandbox only**, gated by Decision 016
- ✅ FI `/capture`, `/leads`, `/account` live — real capture tested (O'Shea Orthopaedic)
- ✅ PI `/intake` live and tested — extraction, checklist, deal draft, Copy/Print/Email/Save
- ✅ Founder Decisions A-F closed (017); Decisions 019/020 reconciled into the ledger and deduplicated (`fb46536`)
- ✅ Git lock incident (stale `HEAD.lock`/`ORIG_HEAD.lock`) resolved July 29 — two sessions writing to TEAM_SYNC.md around the same time meant BD's own push clobbered Finance's just-landed update. Reconciled, nothing lost.
- ⚠️ **July 30 incident history (condensed).** Three TEAM_SYNC accuracy issues hit in one day: (1) BD's own Decisions 021-023 push briefly reverted PI Dev's real status by building from a stale local copy; (2) Dev (FI) commit `7337723` claimed six items shipped that weren't, plus overwrote the ledger with a stale fork; (3) subsequent FI Dev reports claimed more than was actually live. Root cause on FI Dev's end: their Cowork sandbox has no browser/network access, so "shipped" meant "push succeeded," not "verified live" — surfaced by asking directly rather than guessing. **Resolved July 30 — full v2.0 site build independently verified live and correct** (see Dev (FI) section). Standing fixes that stay permanent: fetch `main` before any TEAM_SYNC edit; verify status claims against the live artifact, not the report.
- 🔲 LLC formation — deferred until first paid subscriptions land (015)
- 🔲 Aug 10-12 checkpoint — tracking signups/run-rate/Stripe-live/auth/cost-per-brief toward Sep vs Oct launch

### Finance
- ✅ v1.1 Revenue Mandate model built ($0 start, $0 contractor)
- ✅ Founder Decisions A-F closed
- ✅ **Contact enrichment vendor cost model complete (July 29)** — PDL (People Data Labs) recommended over Apollo at $0.28/record; Apollo has a TOS conflict with Bobert's use case. 1 contact/brief cap protects 77%+ GM on Solo. Add-on reveals priced at $1.25/contact. File: `finance/FINANCE-APOLLO-COST-JULY28.md`.
- ✅ **PI monetization research complete (July 29)** — exploratory, directional only, no locked model. Path A (bundle PI into Pro/Team tiers) recommended once PI is validated through real use; no standalone PI pricing until Rob has 4-6 weeks of real usage data at CS Illumination. File: `finance/FINANCE-PI-MONETIZATION-JULY29.md`.
- ⚠️ **Open tension with Decision 020:** Decision 020 (Apollo free-tier for beta) and Finance's PDL recommendation are not yet reconciled — Decision 020 covers the free-during-beta arrangement only, not the paid-vendor choice once beta ends. **Blocking on Dev (FI) to confirm which vendor is actually in production** before this closes — see `business/PROMPT-DEV-FI-JULY29.md`.
- 🔲 Cost-per-brief telemetry — still estimated at $0.10, needs real usage data from Dev. Cannot close until Dev instruments and reports.
- 🔲 PI usage data — waiting on Rob's real-world use at CS Illumination (intake volume, time saved) before any PI P&L gets built.

### Marketing
- ✅ Wordmark/logo fix confirmed live
- ✅ Gate 7 (adaptive icon assets) — CLOSED, all six assets built and committed
- ✅ brand-check.py compliance tooling built and running (`scripts/brand-check.py`). **Bug fixed July 29:** R1b matched only `logo|nav-brand|footer-brand` and was blind to `class="logo-mark"`, used by all four app pages — violations went 3 → 7 once corrected. **Current: 5 violations**, all R1b/R3, all Dev-owned per the ownership split.
- ✅ **Site audit + content plan.** `marketing/SITE-AUDIT-JULY29.md` (findings/evidence) and `marketing/SITE-PLAN-JULY30.md` v2.0 (the deliverable — supersedes the July 29 v1.0 plan). v2.0 resolves the three conflicts flagged in v1.0 (audience → Decision 021, motto → Decision 022, pricing → Decision 023) and adds a new narrative spine tying FI + PI together, now that PI is going public per Rob's July 30 direction.
- ✅ **Verified Dev's site work independently — partially real.** Confirmed in code on `main`: nav link to `/capture`, the fixed stats row, and 2 of 7 brand-check violations resolved (7 → 5). Credit given for real progress after the earlier false-claim incident.
- ⚠️ **Caught a regression Dev introduced:** `manifest.json`'s new maskable icon entry points at `/assets/icon.png`, whose content spans 59.2% of canvas — outside Android's safe zone. Declaring it maskable is worse than not declaring it: Android will crop to the safe zone and clip the corner-signal mark, violating Decision 012. Fix specced: point at `/assets/adaptive-icon.png` instead (verified safe, 43.2% content). Flagged to Dev in `PROMPT-DEV-FI-JULY30-SITE-V2.md`.
- 🔲 Remaining manifest issues: `sizes` wrong for a 1024×1024 file, `background_color` ≠ locked `#1A1A1A` (Decision 009), `description` still FI-only.
- 🔲 **`WALKTHROUGH-30SEC-SCRIPT.md` needs v1.3** per Decision 021 — v1.2's montage includes an FSBO sign, now out of scope. Replacement triggers: construction signals (permit board, electrical rough-in, staged fixture package). Separate deliverable from the site plan.
- 🔲 **Write `/changelog` initial content** — translate `CHANGELOG.md` to plain, user-facing language per Decision 022. Owner/cadence still open (BD ruling above) — doesn't block Dev building the page shell.
- ✅ **Distracted-driving copy — DONE.** `marketing/SAFE-USE-COPY.md` v1.0. Six placement-specific copy blocks, tone rules, do-not-say list. Awaiting Dev implementation — placement #1 (persistent statement on `capture.html`) is highest priority, a footer line alone doesn't change behavior.
- ✅ Walkthrough script v1.2 — vehicle stops before capture, self-flagged and corrected (superseded by the v1.3 item above).
- ✅ FI/PI two-sector awareness acknowledged — now superseded by the July 30 direction to present both sectors publicly.
- 🔲 Gates 5 & 6 (one-pager, LinkedIn assets) — still blocked on positioning until Decision 021's beachhead correction lands on the live site.

### Development (FI)
- ✅ `/capture`, `/leads`, `/account` all live — photo, GPS, note, follow-up date, AI intel card, save, beta-member dashboard
- ✅ Apollo wired into `/api/capture-intel` for contact enrichment (free tier, per Decision 020)
- ✅ **Site implementation, partial — independently verified live on bobert.ai (July 30):** nav "Open Bobert" link, simplified stats row (`<10s` / `GPS` / `1 photo`), 7th "Project Intel Card" feature, and 2 of 7 brand-check.py fixes all confirmed genuinely shipped.
- ✅ **Diagnostic resolved — root cause found, most of v2.0 confirmed genuinely shipped (July 30).** FI Dev has no browser/network access (Cowork sandbox writes scripts to a separate folder, Rob runs them against the real repo and pastes terminal output back) — "shipped" meant "git push succeeded," not "verified live." After BD independently re-checked the live site directly: **manifest.json fix, `/upgrade` reframe, `/changelog` page, "Who It's For" rewrite, hero subhead, safe-use hero line, and nav link are all genuinely live and correct.** Real, high-quality work — commit `a210ade`'s status claims were accurate for these items, unlike the earlier `7337723` incident.
- ✅ **Gap closed — full v2.0 site build confirmed complete and live (commit `32895fb`).** The four missing `index.html` sections (thesis §4, FI/PI "Two Ways Bobert Works" §5, "Built in the Open" teaser §10, footer additions §12) are now independently verified live on bobert.ai — fetched directly, all four render correctly and match SITE-PLAN v2.0 copy exactly, including PI's card correctly showing no CTA/"In development." Root cause per FI Dev: a guard check in their build script was matching CSS comments instead of HTML content, fixed by switching to HTML-specific anchors. **Full SITE-PLAN-JULY30.md v2.0 build is done.**
- ✅ Favicon/apple-touch-icon added across capture/leads/account/intake/success/upgrade per changelog — reduces brand-check violations; page-by-page logo-image swap (icon.png → wordmark) not yet independently re-verified by BD.
- ✅ Safe-use copy placement #1 (persistent "Park first" banner on `capture.html`) — live per changelog, first of six planned placements.
- 🔲 **Blocking Finance:** confirm whether Apollo (current) or PDL (Finance's recommendation) is the vendor going forward — see `PROMPT-DEV-FI-JULY29.md`
- 🔲 Contact enrichment accuracy — intel card currently speculates instead of verifying.
- 🔲 Stripe live-mode flip — blocked on Decision 016 gate.
- 🔲 **New: lightweight passcode/invite gate on `/capture`, `/leads`, `/account`** per Decision 025 (corrected). FI is currently open to anyone who finds the domain — no gate exists despite "closed beta" intent. Same minimal approach as PI's gate: single shared passcode or invite token, no full auth system, no sessions/DB needed. See `PROMPT-DEV-FI-JULY30-ACCESS-GATE.md`.

**Full consolidated task list:** `business/PROMPT-DEV-FI-JULY30-SITE-V2.md` — supersedes the two earlier FI site prompts (`PROMPT-DEV-FI-JULY30-SITE-IMPLEMENTATION.md`, `PROMPT-DEV-FI-JULY30-FOLLOWUP.md`). Work from the V2 file.

### Development (PI) — **current focus area**
- ✅ `/intake` live — text paste, AI extraction (Groq), checklist, deal draft, Box folder plan, Copy/Print/Email/Save
- ✅ **Multi-source intake shipped (commit `39b35b7`)** — images, PDFs, screenshots, and reference URLs now all supported alongside pasted text (`api/intake-ocr.js`, `api/intake-url.js`). Closes `PROMPT-DEV-JULY29-INTAKE-IMAGE-UPLOAD.md`.
- ✅ **PI UI build-out — parallel extraction + inline editing shipped (commit `0473b34`)** — parallel source extraction (`Promise.all` across OCR/PDF/URL) and inline field editing (Edit/Done toggle on Project Info, Quote Checklist, Deal Draft cards with `contenteditable` + `saveEdit`/`cycleChecklist`).
- ✅ **Speed-to-structured-output shipped (commit `0473b34`)** — multi-source ingestion now parallel: all attachments extract simultaneously in one pass before AI synthesis. Goal (zero manual re-entry) met for the multi-attachment case.
- 🔲 **New: lightweight passcode/invite gate on `/intake`** per Decision 025 — PI stays personal-use only, but Rob needs to be able to share the real link without it being publicly discoverable or crawlable. Not a full auth system — a single shared passcode or invite-token check is enough. See `PROMPT-DEV-PI-JULY30-ACCESS-GATE.md`.
- 🔲 Remaining UI polish — visual refinements, input flow, brand consistency (next sprint, awaiting go-ahead)
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
| PI monetization model | 4-6 weeks of real PI usage data | Rob, from Aug 3 |
| Sep vs Oct launch decision | Aug 10-12 checkpoint results | Rob, Aug 10-12 |
| Marketing Gates 5 & 6 | Contact-enrichment accuracy resolving (copy can't be finalized against a half-true claim) | Dev (FI) |
| Safe-use copy live on site | Dev implementation, placement #1 first | Dev (FI) |
| Thesis framing final sign-off | Page is now live — Rob's explicit reaction/approval to the built "Opportunity gets lost twice" copy not yet captured | Rob |

---

## Reference Files in Repo

| File | Purpose |
|---|---|
| DECISIONS.md | All locked decisions — single source of truth, currently through 023, deduplicated |
| business/TEAM_SYNC.md | This file — cross-department status, read first |
| business/WORKFLOW.md | Cross-department protocol — four-step loop, roles, verification rule, scope table |
| finance/FINANCE-STATUS-JULY28.md | Finance session-resumption doc |
| finance/FOUNDER-DECISIONS-JULY20.md | Closed — all six items answered (017) |
| business/FINANCE-APOLLO-COST-JULY28.md | Vendor cost model — PDL vs Apollo |
| finance/FINANCE-PI-MONETIZATION-JULY29.md | PI monetization research — Path A recommended once validated |
| business/PROMPT-DEV-JULY28-CONTACT-ENRICHMENT.md | Original contact-enrichment accuracy direction |
| business/PROMPT-DEV-FI-JULY29.md | Finance's PDL-vs-Apollo confirmation ask to Dev |
| business/PROMPT-FINANCE-JULY29-PI-MONETIZATION.md | PI monetization research ask |
| business/PROMPT-MARKETING-JULY29-FI-PI-BRAND.md | Original FI/PI brand awareness briefing — superseded by July 30 direction to go public |
| business/PROMPT-MARKETING-JULY29-SITE-REFRESH.md | Original site-refresh ask — fulfilled by SITE-AUDIT-JULY29.md + SITE-PLAN v2.0 |
| marketing/SITE-AUDIT-JULY29.md | Full site audit — findings behind the site plan |
| marketing/SITE-PLAN-JULY29.md | v1.0 site plan — superseded by v2.0 |
| marketing/SITE-PLAN-JULY30.md | **v2.0 site plan — current, build against this** |
| business/PROMPT-DEV-FI-JULY30-SITE-V2.md | **Current consolidated Dev (FI) directive — supersedes the two earlier FI site prompts** |
| business/PROMPT-DEV-JULY29-PROJECT-INTAKE.md | Original PI MVP build spec |
| business/PROMPT-DEV-JULY29-INTAKE-IMAGE-UPLOAD.md | Multi-source intake spec — shipped `39b35b7` |
| business/PROMPT-DEV-JULY29-INTAKE-EXPORT-ACTIONS.md | Print/Email export spec |
| business/PROMPT-ALL-DEPTS-JULY29-TEAM-SYNC-RULE.md | Standing rule — update this file in the same commit as status changes |
| marketing/SAFE-USE-COPY.md | Distracted-driving copy, six placements — awaiting Dev implementation |
| marketing/WALKTHROUGH-30SEC-SCRIPT.md | Walkthrough script v1.2 — needs v1.3 per Decision 021 |

---

*Pull latest from main before starting any session. Read DECISIONS.md and TEAM_SYNC.md first — and if anything in this file's "What Is Locked" table doesn't match DECISIONS.md exactly, DECISIONS.md is correct and this file needs fixing. Update this file's "Current Status by Department" section at the end of any session that changes state.*
