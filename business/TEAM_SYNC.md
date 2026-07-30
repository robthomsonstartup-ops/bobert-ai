# Bobert — Team Sync
**Date:** July 2026 — updated July 29, 2026
**Status:** Active — web platform live at bobert.ai, beta UI shipped, entering closed beta
**Source of truth:** This file + DECISIONS.md. When in doubt, read both before acting.

**Standing rule (effective July 29):** Any commit that changes a locked decision, ships a feature, or changes department status must update the relevant section in this file in the same commit. Not a follow-up — the same push.

---

## The Product

Bobert is a field intelligence tool for outside sales reps. Point your phone at a construction sign. In under 30 seconds: developer, GC, leasing brokers, contacts, routing note. No manual research.

**Two delivery modes:**
- **Web PWA** — live at bobert.ai. Works on any phone browser, "Add to Home Screen" for app feel. This is the active beta track.
- **Native iOS app** — built, awaiting Apple Developer account for TestFlight. On hold until web beta validates the product.

**Live proof:** Lakepoint Commerce Center, Emerson GA — Core5 Industrial Partners (developer), Billy Snowden & Willie Candler at Lee & Associates (brokers). One photo. 30 seconds. Real data.

---

## The Team

| Department | Owner | Session / Tool |
|---|---|---|
| Business Development | Claude (VP BD) | This chat |
| Marketing | ChatGPT (VP Marketing) | ChatGPT session |
| Development | Dev AI (VP Product & Dev) | Separate dev session |
| Finance | Finance AI | Separate finance session |
| Founder / CEO | Rob Thomson | Indianapolis, IN |

**Rules:**
- GitHub is the single source of truth for all documents
- DECISIONS.md is the single source of truth for all locked decisions
- No department changes a locked decision without an RFI through BD
- Marketing owns all customer-facing visual assets — Dev implements, does not create
- Dev owns all code — Marketing and BD do not modify code
- Any commit that changes status must update this file in the same push

---

## What Is Locked (Do Not Revisit)

| Decision | Details | Ref |
|---|---|---|
| Product name | **Bobert** | DECISION 001 |
| Brand architecture | Bobert is the primary brand — company, product, and AI persona | DECISION 002 |
| Founder model | Solo, bootstrapped, no outside funding in 2026 | DECISION 003 |
| Launch market | Construction + commercial field sales | DECISION 004 |
| Pricing | $49–$299/mo SaaS, 30-day free trial (post-beta) | DECISION 005 |
| Logo direction | Concept 4 — Corner Signal (B mark + capture frame corners + red accent) | DECISION 006 |
| Primary tagline | **"See what others drive past."** — do not alter | DECISION 007 |
| Brand asset ownership | Marketing owns all customer-facing visual assets | DECISION 008 |
| Color palette | See below — all departments confirmed | DECISION 009 / 010 |
| Stripe billing | Stripe Checkout, 30-day trial, test mode only until capture MVP validated | DECISION 014 |
| Backend | Vercel serverless (api/ functions) — no Express, no separate host | DECISION 015 |
| Stripe live mode | HOLD — do not flip until /capture end-to-end validated and Finance signs off | DECISION 016 |
| Founder decisions A-F | Closed and logged July 28 | DECISION 017 |
| Apollo billing | Free credits for beta; Finance must model cost before paid upgrade | DECISION 018 |
| Beta strategy | Closed beta first (web PWA), no free trial gating during beta, then launch with trial → subscription | DECISION 019 |

---

## Official Color Palette

| Role | Hex |
|---|---|
| Primary Black | #0A0A0A |
| Bobert Red | #DC2626 |
| White | #FFFFFF |
| Mid Gray | #6B7280 |
| Card Background | #1A1A1A |

---

## Approved Messaging

**Primary tagline:** See what others drive past.

**Supporting messages (approved for use):**
- "Full project intel in under 30 seconds."
- "Built for reps who think in miles, not spreadsheets."
- "Snap it. Voice it. Bobert handles the rest."

**Voice rules:** No "AI-powered." No "seamless." Concrete numbers. Active voice. Field language. The user drives a truck, not a desk.

---

## Current Status by Department

### Business Development
- ✅ Business plan v2 complete
- ✅ Brand brief complete
- ✅ DECISIONS.md current through Decision 019
- ✅ Finance prompts sent: Apollo cost model + briefing (July 28)
- ✅ Contact enrichment direction set: free Apollo for beta, paid only after Finance sign-off (DECISION 018)
- ✅ Beta strategy locked: web PWA first, no billing during beta (DECISION 019)
- ✅ All-dept standing rule issued: TEAM_SYNC.md updated in same commit as status changes
- 🔲 Beta outreach — identify 5–20 field reps to invite (invite materials ready: BETA-INVITE-EMAIL.md)
- ✅ Beta brief complete (business/BETA-USER-BRIEF.md)
- ✅ 90-second demo script complete (business/DEMO-SCRIPT-90SEC.md)
- 🔲 App Store description draft (post-beta)

### Marketing
- ✅ Logo concepts delivered — Concept 4 approved
- ✅ Brand assets delivered and implemented
- ✅ 30-second walkthrough plan approved
- ✅ Intel Card color correction approved
- 🔲 Beta one-pager / invite email for closed beta users
- 🔲 Digital one-pager PDF
- 🔲 Walkthrough recording
- 🔲 LinkedIn launch assets
- 🔲 Landing page content spec

### Development (Web Platform)
- ✅ bobert.ai live on Vercel
- ✅ Stripe Checkout integrated — test mode, 30-day trial, all 3 plans
- ✅ Stripe webhook live and verified
- ✅ Brevo email capture live on landing page
- ✅ /capture — photo (Vision OCR), GPS, note, follow-up date, IndexedDB save
- ✅ /api/capture-intel — Vision OCR → Tavily search → Groq synthesis → Apollo contacts
- ✅ /leads — list view, tap-to-open intel drawer, delete
- ✅ /account — beta member card, live stats, coming-soon roadmap
- ✅ Bottom nav (My List / Capture / Account) — consistent across all pages
- ✅ PWA: manifest.json + sw.js, Add to Home Screen capable
- ✅ All 4 intel API keys live in Vercel: GOOGLE_API_KEY, TAVILY_API_KEY, GROQ_API_KEY, APOLLO_API_KEY
- ✅ vercel.json: cleanUrls true
- ✅ Landing page nav: "Open Bobert → /capture" link added before "Join the Beta" (July 30)
- ✅ Landing page stats: replaced 0/∞ with single stat "1 photo — everything else fills itself in" (July 30)
- ✅ Landing page features: "Leads Dashboard" renamed "Your List"; 7th card "Project Intel Card" added (July 30)
- ✅ App headers: icon.png replaced with bobert-wordmark-white.png across capture/leads/account/upgrade (July 30)
- ✅ /upgrade reframed as beta preview — Stripe checkout removed, pricing displayed ($59/$119/$349/$1,500), unshipped features marked Planned (July 30)
- ✅ manifest.json: purpose fields added ("any" / "any maskable") (July 30)
- 🔲 Safe-use copy on /capture — BLOCKED: needs marketing/SAFE-USE-COPY.md (Marketing action)
- 🔲 /changelog page — BLOCKED: needs Marketing confirmation + CHANGELOG.md content
- 🔲 Improve contact enrichment accuracy — AI speculation vs. sourced data (see PROMPT-DEV-JULY28-CONTACT-ENRICHMENT.md)
- 🔲 Sharpen Groq prompt: cite real sources (permit records, assessor records) rather than infer
- 🔲 Add building permit + county assessor Tavily queries
- 🔲 Beta feedback collection mechanism
- 🔲 Stripe live mode flip — pending Finance sign-off + beta validation

### Development (Native iOS App)
- ✅ App V1 built, internal testing
- ✅ Core workflow functional: photo OCR → AI intel → contacts
- ✅ Bobert rebrand complete (July 16)
- 🔲 TestFlight — blocked on Apple Developer account ($99) — Rob's action
- 🔲 On hold until web beta validates product

### Finance
- 🔲 Apollo.io cost model — research pricing tiers, model cost/user/month at 3 usage levels (see PROMPT-FINANCE-JULY28-APOLLO-COST.md)
- 🔲 Include Apollo cost in unit economics: COGS per user vs. subscription revenue at 60/70/80% GM targets
- 🔲 Recommendation: which Apollo tier, at what user count
- 🔲 Compare alternatives: Hunter.io, Prospeo.io
- 🔲 Bring cost model to Rob before beta closes — this gates Stripe live mode

---

## Blocked / Waiting

| Item | Blocked by | Who unblocks |
|---|---|---|
| Stripe live mode | Finance cost model sign-off + beta validation | Finance → Rob |
| Apollo paid upgrade | Finance cost model | Finance → Rob |
| TestFlight beta (iOS) | Apple Developer account ($99) | Rob |
| USPTO trademark filing | Funds (~$350 x2) | Rob |
| Indiana LLC filing | Deferred to post-revenue | DECISION 015 |

---

## Rob's Action Items

1. Identify 5–20 beta users to invite to bobert.ai
2. Apple Developer account ($99) — unlocks TestFlight when ready
3. USPTO trademark — Class 042 + 009 — file before going public

---

## Reference Files in Repo

| File | Purpose |
|---|---|
| DECISIONS.md | All locked decisions — single source of truth |
| business/TEAM_SYNC.md | This file — cross-dept status hub |
| business/brand-brief.md | Brand personality, voice, colors, typography |
| business/PROMPT-DEV-JULY28-CONTACT-ENRICHMENT.md | Contact enrichment improvement direction |
| business/PROMPT-FINANCE-JULY28-APOLLO-COST.md | Apollo cost modeling ask |
| business/PROMPT-FINANCE-JULY28-BRIEFING.md | Finance context briefing |
| business/PROMPT-ALL-DEPTS-JULY29-TEAM-SYNC-RULE.md | Standing rule — update TEAM_SYNC in same commit |

---

*Pull latest from main before starting any session. Read DECISIONS.md and TEAM_SYNC.md first.*
