# Bobert Marketing — Department Status
**Date:** July 20, 2026
**Platform:** Migrated from ChatGPT → Claude (Bobert - Marketing project)
**Source of truth:** GitHub `/marketing/` directory

---

## Gate Status

| Gate | Description | Status |
|---|---|---|
| Gate 1 | Wordmark asset confirmed in repo | ✅ CLOSED — `assets/bobert-wordmark-white.png` confirmed in repo |
| Gate 2 | Landing page nav/footer updated to wordmark | ✅ CLOSED — committed July 20 (commit `34ea5d0`) |
| Gate 3 | Mobile responsiveness verified | ✅ CLOSED — overflow-x fix committed July 20 (commit `3caca06`) |
| Gate 4 | YouTube demo video live and embedded | ✅ CLOSED — embedded in landing page |
| Gate 5 | One-pager / leave-behind created | 🔴 OPEN — not started |
| Gate 6 | LinkedIn launch assets created | 🔴 OPEN — not started |
| Gate 7 | Adaptive icon assets delivered | ⚠️ OPEN — `adaptive-icon-transparent.png` and `adaptive-icon-monochrome.png` not yet created |
| Gate 8 | Promotional video produced | ⏸️ POST-GATE — queued after gates 1–6 clear |

**Rule:** No new creative work begins until all gates are cleared.

---

## Assets in Repo

| Asset | Location | Status |
|---|---|---|
| bobert-mark-white.png | `assets/` | ✅ |
| bobert-mark-dark.png | `assets/` | ✅ |
| bobert-wordmark-white.png | `assets/` | ✅ |
| bobert-wordmark-dark.png | `assets/` | ✅ |
| adaptive-icon.png | `assets/` | ✅ (standard, not transparent) |
| favicon.png | `assets/` | ✅ |
| adaptive-icon-transparent.png | `assets/` | 🔴 Missing |
| adaptive-icon-monochrome.png | `assets/` | 🔴 Missing |

---

## Branding Rules (Locked — Do Not Change)

- Product name: **Bobert** — no renaming
- Visual identity: locked — no redesign without BD approval
- Wordmark file: `assets/bobert-wordmark-white.png` is the approved asset
- All branding changes require BD sign-off before implementation

---

## Brevo Email Sequence

- 10-email 30-day trial-to-paid sequence drafted and stored
- File: `Bobert_Brevo_Trial_Email_Sequence_v1.0.md` (in Claude outputs)
- Status: Awaiting Marketing review and BD approval before Brevo implementation
- Do not activate in Brevo until approved and bobert.ai links are live

---

## Promotional Video

- Queued as post-gate Marketing deliverable
- Format: 30-second walkthrough, screen capture of app
- Script/storyboard: ready to build when gates clear
- Owner: Marketing (production method TBD — Claude or ChatGPT video tools)

---

## Finance Inputs Owed

- Marketing must deliver launch expense inputs to Finance
- Needed for Finance v1.1 model: trade show spend, creative production costs, any paid ad budget
- No approved spend without Finance sign-off and defined pipeline objective

---

## Next Actions (Priority Order)

1. Visual inspection of live landing page — confirm Gates 1 & 2 render correctly (bobert.ai / GitHub Pages)
2. Create `adaptive-icon-transparent.png` and `adaptive-icon-monochrome.png` → close Gate 7
3. Build one-pager / leave-behind → close Gate 5
4. Build LinkedIn launch assets → close Gate 6
5. Deliver launch cost inputs to Finance
6. BD approval on Brevo sequence before implementation
7. Promotional video (post-gate)

---

## Key Context

- Web-first beta strategy adopted July 20 (Decision 011) — no App Store or TestFlight during beta
- Landing page live at: `robthomsonstartup-ops.github.io/bobert-ai`
- Production domain: `bobert.ai` (Rob purchasing this week — Porkbun ~$80/year)
- PWA "Add to Home Screen" is the iPhone install path during beta

---

*This file is the Marketing department handoff document. Any AI session — Claude or ChatGPT — should read this file first before working on Marketing tasks.*
