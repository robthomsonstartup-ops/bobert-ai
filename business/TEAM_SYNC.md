# Bobert — Team Sync
**Date:** July 2026  
**Status:** Active  
**Source of truth:** This file + DECISIONS.md. When in doubt, read both before acting.

---

## The Product

Bobert is an AI-powered field intelligence app for outside sales reps. Point your phone at a construction sign. In under 30 seconds: developer, GC, leasing brokers, contacts, routing note. No manual research.

**Live proof:** Lakepoint Commerce Center, Emerson GA — Core5 Industrial Partners (developer), Billy Snowden & Willie Candler at Lee & Associates (brokers). One photo. 30 seconds. Real data.

---

## The Team

| Department | Owner | Session / Tool |
|---|---|---|
| Business Development | Claude (VP BD) | Cowork session |
| Marketing | ChatGPT (VP Marketing) | ChatGPT session |
| Development | Dev AI (VP Product & Dev) | Separate dev session |
| Founder / CEO | Rob Thomson | Indianapolis, IN |

**Rules:**
- GitHub is the single source of truth for all documents
- DECISIONS.md is the single source of truth for all locked decisions
- No department changes a locked decision without an RFI through BD
- Marketing owns all customer-facing visual assets — Dev implements, does not create
- Dev owns all code — Marketing and BD do not modify code

---

## What Is Locked (Do Not Revisit)

| Decision | Details | Ref |
|---|---|---|
| Product name | **Bobert** | DECISION 001 |
| Brand architecture | Bobert is the primary brand — company, product, and AI persona | DECISION 002 |
| Founder model | Solo, bootstrapped, no outside funding in 2026 | DECISION 003 |
| Launch market | Construction + commercial field sales | DECISION 004 |
| Pricing | $49–$299/mo SaaS, 30-day free trial | DECISION 005 |
| Logo direction | Concept 4 — Corner Signal (B mark + capture frame corners + red accent) | DECISION 006 |
| Primary tagline | **"See what others drive past."** — do not alter | DECISION 007 |
| Brand asset ownership | Marketing owns all customer-facing visual assets | DECISION 008 |
| Color palette | See below — all departments confirmed | DECISION 009 |

---

## Official Color Palette

| Role | Hex |
|---|---|
| Primary Black | #1A1A1A |
| Bobert Red | #DC2626 |
| White | #FFFFFF |
| Mid Gray | #6B7280 |
| Light Gray | #F0F0F0 |
| Graphite (reserve) | #1F2937 |

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
- ✅ Logo-icon brief complete
- ✅ Founder narrative updated
- ✅ DECISIONS.md current through Decision 010
- ✅ 90-second demo script (Lakepoint)
- ✅ Beta outreach email (10–15 TestFlight testers)
- ✅ Pre-launch checklist (PRE_LAUNCH_CHECKLIST.md)
- ✅ Dev landing page instructions (dev-landing-page-instructions.md)
- ✅ Beta email automation system (beta-email-automation.md) — 6-email sequence, Brevo, Tally survey
- ✅ Brevo automation live — confirmation email (Email 1) with logo and Marketing copy
- 🔲 Brevo signup form (next BD session)
- 🔲 Rob notification step in automation (next BD session)
- 🔲 App Store description draft

### Marketing
- ✅ Logo concepts delivered — Concept 4 approved
- ✅ Brand asset brief (Bobert_Marketing_Brief.docx) approved
- ✅ Confirmation email copy delivered and live in Brevo
- ✅ Brand asset packet delivered (Bobert_BrandReview_Packet/) — icon, adaptive-icon, splash, wordmarks, B marks
- 🔲 Digital one-pager PDF — highest priority remaining deliverable
- 🔲 LinkedIn launch assets (1200×627px announcement + 6-slide carousel)
- 🔲 Facebook/Instagram post (1080×1080px)
- 🔲 Landing page content spec and wireframe direction

### Development
- ✅ App V1 live on iOS (internal testing)
- ✅ Core workflow functional: photo OCR → AI intel → contacts → CRM push
- ✅ Bobert rebrand COMPLETE — July 15, 2026
- ✅ App name, icon, splash, onboarding, headers, email subject lines updated
- ✅ theme.js updated to #DC2626
- ✅ icon.png pushed to GitHub repo root (live on GitHub Pages)
- 🔲 TestFlight setup (requires Apple Developer account — Rob's plate, ~$99)
- 🔲 Brevo form embed (waiting on embed code from BD)
- 🔲 Standing by — no new feature work until TestFlight is live

---

## Blocked / Waiting

| Item | Blocked by | Who unblocks |
|---|---|---|
| TestFlight beta | Apple Developer account ($99) | Rob |
| bobert.ai domain | Funds (~$89.98) | Rob |
| USPTO trademark filing | Funds (~$350 x2) | Rob |
| Indiana LLC filing | Funds (~$50) | Rob |
| Brevo form on landing page | Form embed code from BD | BD next session |
| Brand assets in repo | Push from Rob's Desktop | Rob |
| SPF/DKIM/DMARC | bobert.ai domain | Rob |

---

## Rob's Money List (in priority order)

1. USPTO trademark — Class 042 + 009 — ~$350 each — file before going public
2. bobert.ai domain — $89.98/yr
3. Indiana LLC — ~$50
4. Apple Developer account — $99/yr

---

## Reference Files in Repo (business/)

| File | Purpose |
|---|---|
| ALL-HANDS-BRIEF-JULY19.md | Cross-department status sync — start here |
| DECISIONS.md | All locked decisions — single source of truth |
| brand-brief.md | Brand personality, voice, colors, typography |
| logo-icon-brief.md | Logo and app icon spec — Concept 4 locked |
| founder-narrative.md | Rob's story — use in pitch, App Store, press |
| bobert-one-pager.md | One-page product overview |
| demo-script-90sec.md | Live demo script (Lakepoint proof point) |
| beta-outreach-email.md | Personal outreach email to beta testers |
| beta-email-automation.md | Full 6-email beta sequence + Brevo setup + Tally survey |
| PRE_LAUNCH_CHECKLIST.md | Final inspection before launch |
| dev-landing-page-instructions.md | Dev tasks: Brevo form, GitHub Pages DNS, domain setup |

---

*Pull latest from main before starting any session. Read DECISIONS.md and TEAM_SYNC.md first.*
