# Bobert — Team Sync
**Date:** July 29, 2026
**Status:** Active
**Source of truth:** This file + business/DECISIONS.md. Pull latest from main and read both before acting. Do not resume any department session without reading this file first.

---

## The Platform

Bobert AI is the platform. Bobert is the brand — domain bobert.ai, "B" Corner Signal mark, "Bobert" name (Decision 010). The platform now has two sectors (Decision 018):

- **Bobert FI (Field Intelligence)** — LIVE, public beta. `/capture`, `/leads`. Point your phone at a project, get GPS + AI-generated intel (developer, GC, contacts, routing note) in seconds.
- **Bobert PI (Project Intake)** — LIVE, personal-use tool for Rob at CS Illumination. `/intake`. Bid invite / RFP / screenshot in, structured project summary + RFI checklist + generic deal draft out. No CRM integration yet — CS Illumination's stack is unknown, not being guessed at.

Sector names (FI/PI) are working labels, not locked branding.

---

## The Team

| Department | Owner | Session / Tool |
|---|---|---|
| Business Development | Claude (VP BD) | Cowork session |
| Marketing | Claude (Bobert AI marketing project) | Claude project |
| Development | Claude (Bobert AI App Developer/Programmer project) | Claude project |
| Project Intake Dev | Claude (Bobert AI PI Development project) | Claude project |
| Finance | Claude (Bobert AI finance project) | Claude project |
| Founder / CEO | Rob Thomson | Indianapolis, IN — starting at CS Illumination Aug 3 |

**Rules:**
- GitHub is the single source of truth for all documents.
- `business/DECISIONS.md` is the single source of truth for all locked decisions.
- No department changes a locked decision without an RFI through BD.
- Marketing owns all customer-facing visual assets — Dev implements, does not create.
- Dev owns all code — Marketing and BD do not modify code.
- Before writing a new numbered Decision, check the current highest number in DECISIONS.md first — duplicate numbers have happened when two sessions wrote independently.
- **Standing rule — update this file on every push.** Any git commit that changes DECISIONS.md, ships a feature, or changes a department's status must update that department's section under "Current Status by Department" below **in the same commit**. Not a separate follow-up, not "next session" — same push. This is what keeps the hub honest instead of going stale like it did before July 29.

---

## What Is Locked (Do Not Revisit)

See `business/DECISIONS.md` for full text — currently through **Decision 018**. Highlights:

| Decision | Details | Ref |
|---|---|---|
| Product name | **Bobert** | 001 |
| Founder model | Solo, bootstrapped | 003 |
| Launch market | Construction + commercial field sales, incl. lighting/electrical/HVAC/roofing/solar/signage/manufacturer reps | 004 |
| Pricing | Solo $59 / Pro $119 / Team $349 / Enterprise $1,500, 30-day free trial | 005 |
| Logo | Corner Signal mark, must not be filtered/recolored/cropped | 006, 010 |
| Tagline | "See what others drive past." | 007 |
| Wordmark assets | Use pre-rendered transparent PNGs, never filter/blend-mode the mark | 011 |
| No upfront spend | $0 starting capital, no contractor spend until revenue | 013 |
| Revenue-first mandate | Finance finds the path to self-funded growth, doesn't ask for capital | 014 |
| Stripe bootstrap | Live mode on Rob's personal account when ready — LLC deferred to post-revenue | 015 |
| Stripe gate | **Stays in test/sandbox mode** — do not flip live until product justifies it | 016 |
| Two-sector platform | Bobert FI + Bobert PI under one brand | 018 |

---

## Current Status by Department — July 29, 2026

### Business Development
- ✅ Domain (bobert.ai), Vercel hosting, GitHub repo — all live
- ✅ Logo/wordmark rendering fixed on nav + footer
- ✅ Email capture wired to Brevo — confirmed working
- ✅ Stripe Checkout built (4 tiers, 30-day trial, webhook) — **sandbox only**, gated by Decision 016
- ✅ FI `/capture` + `/leads` live and tested (real capture: O'Shea Orthopaedic)
- ✅ PI `/intake` live and tested — extraction, checklist, deal draft, Copy/Print/Email/Save
- ✅ Founder Decisions A-F closed (Decision 017)
- 🔲 LLC formation — deferred until first paid subscriptions land (Decision 015)
- 🔲 Aug 10-12 checkpoint — tracking signups/run-rate/Stripe-live/auth/cost-per-brief toward Sep vs Oct launch

### Finance
- ✅ v1.1 Revenue Mandate model built ($0 start, $0 contractor)
- ✅ Founder Decisions A-F closed
- ✅ Working file: `Bobert_Projected_Budget_PnL_v1.1_RevenueMandate.xlsx`
- 🔲 PI monetization research — comparable products (ParSpec, PlanHub, BuildingConnected, Bluebeam, Procore) + directional pricing sketch — see PROMPT-FINANCE-JULY29-PI-MONETIZATION.md
- 🔲 Cost-per-brief telemetry — still estimated at $0.10, needs real usage data from Dev

### Marketing
- ✅ Wordmark/logo fix confirmed live
- 🔲 Gate 5 — one-pager / leave-behind
- 🔲 Gate 6 — LinkedIn launch assets
- 🔲 Gate 7 — adaptive icon transparent/monochrome PNGs
- 🔲 Distracted-driving copy for the site
- 🔲 FI/PI two-sector brand awareness — see PROMPT-MARKETING-JULY29-FI-PI-BRAND.md (no action required yet, awareness only)
- 🔲 `/upgrade` copy needs to match actual `/capture` MVP scope before Stripe goes live (Decision 016)

### Development (FI)
- ✅ `/capture` and `/leads` live — photo, GPS, note, follow-up date, AI intel card, save
- 🔲 Contact enrichment accuracy — intel card currently speculates ("possibly key staff") instead of verified data; explore free/public sources (county property records, contractor license lookups, permit databases) before any paid enrichment API
- 🔲 Stripe live-mode flip — blocked on Decision 016 gate (product must justify the trial promise)

### Development (PI)
- ✅ `/intake` live — text paste, AI extraction (Groq), checklist, deal draft, Box folder plan, Copy/Print/Email/Save
- 🔲 Multi-source intake (screenshots, PDFs, files, reference links combined into one intake) — see PROMPT-DEV-JULY29-INTAKE-IMAGE-UPLOAD.md, not blocking, post-Monday
- 🔲 CRM push — explicitly not in scope until CS Illumination's actual stack is known

---

## Blocked / Waiting

| Item | Blocked by | Who unblocks |
|---|---|---|
| Stripe live mode | `/capture` MVP being fully proven (Decision 016) | Dev + Rob sign-off |
| LLC formation | First paid subscriptions (Decision 015) | Revenue |
| PI → CRM integration | Knowing CS Illumination's actual tech stack | Rob, once on the job |
| Sep vs Oct launch decision | Aug 10-12 checkpoint results | Rob, Aug 10-12 |

---

## Reference Files in Repo (business/ and finance/)

| File | Purpose |
|---|---|
| DECISIONS.md | All locked decisions — single source of truth, currently through 018 |
| TEAM_SYNC.md | This file — cross-department status, read first |
| finance/FINANCE-STATUS-JULY28.md | Finance session-resumption doc — supersedes FINANCE-STATUS-JULY20.md |
| finance/FOUNDER-DECISIONS-JULY20.md | Closed — all six items answered (Decision 017) |

---

*Pull latest from main before starting any session. Read DECISIONS.md and TEAM_SYNC.md first. Update this file's "Current Status by Department" section at the end of any session that changes state — this is what keeps the hub honest.*
