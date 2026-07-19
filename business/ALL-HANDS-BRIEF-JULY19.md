# Bobert — All-Hands Status Brief
**Date:** July 19, 2026  
**Purpose:** Cross-department status sync, intake prompt for new sessions, next step coordination

Paste this at the start of any new BD, Dev, or Marketing session to get up to speed instantly.

---

## What Bobert Is

Bobert is an AI-powered field intelligence iOS app for outside sales reps. Point your phone at a construction sign — developer, GC, leasing brokers, and direct contact info back in under 30 seconds. No manual research.

**Tagline (locked):** See what others drive past.  
**Founder:** Rob Thomson, Indianapolis IN — solo, bootstrapped  
**Status:** V1 app live on iOS internal testing. Pre-launch. Beta program being stood up.

---

## Locked Decisions — Do Not Revisit

| Decision | Detail |
|---|---|
| Product name | **Bobert** |
| Logo | Concept 4 — Corner Signal (B mark, capture corners, red top-right accent #DC2626) |
| Tagline | "See what others drive past." — do not alter |
| Brand colors | Primary Black #1A1A1A · Bobert Red #DC2626 · White #FFFFFF · Mid Gray #6B7280 · Light Gray #F0F0F0 |
| Pricing | $49–$299/mo SaaS, 30-day free trial |
| Email platform | Brevo (brevo.com) — free account at rob.thomson.startup@gmail.com |
| Landing page host | GitHub Pages — https://robthomsonstartup-ops.github.io/bobert-ai/ |

Full decisions in `business/DECISIONS.md`.

---

## Department Status as of July 19, 2026

### Development — VP Product & Dev
**Just completed (today):**
- ✅ App rebrand complete — Bobert branding throughout, `theme.js` at `#DC2626`
- ✅ `icon.png` pushed to bobert-ai GitHub repo root — live at https://robthomsonstartup-ops.github.io/bobert-ai/icon.png

**Blocked / Waiting:**
- 🔲 TestFlight setup — blocked on Apple Developer account ($99, Rob's plate)
- 🔲 Brevo form embed — waiting on embed code from BD (next BD session)
- 🔲 GitHub Pages custom domain setup — waiting on bobert.ai domain ($89.98, Rob's plate)

**Standing by:** No new feature work until TestFlight is live.

---

### Business Development — VP BD
**Just completed (today):**
- ✅ Brevo account live — rob.thomson.startup@gmail.com, list "Bobert Beta Waitlist - #5"
- ✅ Automation live — trigger: contact added to Bobert Beta Waitlist → confirmation email fires immediately
- ✅ Confirmation email (Email 1) — Marketing copy live, logo header (#0A0A0A bg, icon.png 68px centered, linked to bobert.ai), subject: "You're on the Bobert beta list"
- ✅ Brevo API key generated — stored locally only (do NOT push to GitHub)
- ✅ Pre-launch checklist, beta email automation spec, dev landing page instructions complete

**Next BD session:**
- 🔲 Build Brevo signup form (First Name, Last Name, Email, Company, Job Title, Industry dropdown)
- 🔲 Add "Notify by email" step to automation (Rob alert per signup)
- 🔲 Get form embed code → send to Dev
- 🔲 Configure contact tags: beta-waitlist, website-signup, bobert
- 🔲 Test end-to-end: form → Brevo contact → confirmation email fires
- 🔲 App Store description draft

**Blocked:** SPF/DKIM/DMARC (needs bobert.ai domain) · Emails 2-6 (needs TestFlight date)

---

### Marketing — VP Marketing
**Completed:**
- ✅ Logo concepts delivered, Concept 4 approved and locked
- ✅ Brand brief (Bobert_Marketing_Brief.docx) approved by all departments
- ✅ Confirmation email copy live in Brevo
- ✅ Brand asset packet delivered — all files in Bobert_BrandReview_Packet/ on Rob's Desktop:
  - icon.png (612 KB) — app icon / Corner Signal mark
  - adaptive-icon.png (612 KB)
  - splash.png (855 KB), splash-icon.png (18 KB), favicon.png (24 KB)
  - bobert-wordmark-dark.png, bobert-wordmark-white.png
  - bobert-mark-dark.png, bobert-mark-white.png

**ACTION REQUIRED — Rob:** Push Bobert_BrandReview_Packet/ assets to GitHub repo so Dev can pull them.

**Still needed from Marketing:**
- 🔲 Digital one-pager PDF — shareable leave-behind for beta outreach
- 🔲 LinkedIn announcement image — 1200x627px
- 🔲 LinkedIn carousel — 6 slides, 1080x1080px
- 🔲 Facebook/Instagram post — 1080x1080px
- 🔲 Landing page content spec + wireframe direction

---

## Cross-Department Dependencies

| Who needs it | What | Who provides it | Status |
|---|---|---|---|
| Dev | Brevo form embed code | BD | Next BD session |
| Dev | Brand assets in repo | Rob (push from Desktop) | Assets exist, need push |
| Dev | Apple Developer account | Rob ($99) | Rob's plate |
| Dev / BD | bobert.ai domain | Rob ($89.98) | Rob's plate |
| BD | TestFlight link | Dev (after Apple account) | Blocked |

---

## Rob's Money List (priority order)

1. USPTO trademark — Class 042 + 009 — ~$350 each — file before going public
2. bobert.ai domain — $89.98/yr — Namecheap
3. Indiana LLC — ~$50 — sos.in.gov
4. Apple Developer account — $99/yr — developer.apple.com

---

## Source of Truth Files (business/ in this repo)

| File | What's in it |
|---|---|
| DECISIONS.md | All locked decisions |
| TEAM_SYNC.md | Department status, team rules |
| beta-email-automation.md | Full 6-email beta sequence + Brevo setup |
| PRE_LAUNCH_CHECKLIST.md | Complete pre-launch checklist |
| dev-landing-page-instructions.md | Dev tasks for landing page |
| brand-brief.md | Brand voice, colors, typography |
| demo-script-90sec.md | Live demo script (Lakepoint proof point) |
| beta-outreach-email.md | Personal outreach to beta testers |

GitHub is the single source of truth. Pull from main before starting any session.

---

Read DECISIONS.md and TEAM_SYNC.md first. Do not revisit locked decisions. Marketing owns all customer-facing visual assets. Dev owns all code.
