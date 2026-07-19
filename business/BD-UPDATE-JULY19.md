# BD Cross-Department Alignment Update
**Date:** July 19, 2026
**From:** Rob Thomson, Founder/CEO
**To:** All Departments (BD, Marketing, Dev)
**Re:** End-of-day state — repo, assets, automations, and next steps

---

## What Is Done as of Today

### Repository (Source of Truth)
Repo: `robthomsonstartup-ops/bobert-ai` — commit `05d2a16` on `main`

- `assets/` — all 9 approved brand assets live ✅
- `icon.png` — root copy live (used as email logo) ✅
- `index.html` — landing page live at https://robthomsonstartup-ops.github.io/bobert-ai ✅
- `business/DECISIONS.md` — DECISION 001–010 locked ✅
- `business/TEAM_SYNC.md` — current ✅
- `business/ALL-HANDS-BRIEF-JULY19.md` — today's full brief ✅
- `ASSET-NOTICE.md` — brand asset source-of-truth notice ✅
- `BRANDING-BRIEF.md` — landing page branding brief ✅
- `business/PROMPT-DEV-EOD-JULY19.md` — Dev EOD handoff prompt ✅

### Landing Page
- Live at https://robthomsonstartup-ops.github.io/bobert-ai
- Hero, tagline, phone mockup, YouTube demo embed, and beta signup form all rendering
- Nav and footer updated to DECISION 010 B-mark (black background, white B, red corner) — no gray-box logo
- All colors confirmed at DECISION 009 palette

### Brevo Email Automation
- Automation: "Bobert Beta — Signup Confirmation" — Active ✅
- Trigger: Contact added to list "Bobert Beta Waitlist - #5"
- Email fires immediately on signup
- Logo header live: `icon.png` from repo root, `#0A0A0A` background, linked to https://bobert.ai
- Marketing-approved copy confirmed — Lakepoint proof point, Rob's voice

### Brand Assets
All 9 files confirmed in `assets/` on main:

| File | Status |
|---|---|
| icon.png | ✅ Live |
| adaptive-icon.png | ✅ Live |
| splash.png | ✅ Live |
| splash-icon.png | ✅ Live |
| favicon.png | ✅ Live |
| bobert-mark-dark.png | ✅ Live |
| bobert-mark-white.png | ✅ Live |
| bobert-wordmark-dark.png | ✅ Live |
| bobert-wordmark-white.png | ✅ Live |

---

## Open Items by Department

### BD
- [ ] Wire Brevo signup form on landing page to "Bobert Beta Waitlist - #5" — **next BD session priority**
- [ ] Send Brevo embed code to Dev once confirmed
- [ ] Draft beta outreach email (10–15 TestFlight targets)
- [ ] App Store description draft

### Marketing
- [ ] Confirm `adaptive-icon.png` has transparent background (not black fill) — flag if a separate transparent version is needed for Android adaptive icon
- [ ] Clarify intent of `android-icon-background.png`, `android-icon-foreground.png`, `android-icon-monochrome.png` — are these meant to be wired in `app.config.js` or extras?
- [ ] Digital one-pager PDF
- [ ] LinkedIn launch assets (1200×627px + 6-slide carousel)
- [ ] Facebook/Instagram post (1080×1080px)

### Dev
- [ ] Confirm `app.config.js` is wired for favicon and splash-icon (grep showed icon/splash/adaptiveIcon only)
- [ ] Ready to integrate Brevo embed code into landing page the moment BD sends it
- [ ] Blocked on Apple Developer account ($99) — Rob's plate
- [ ] EAS build and TestFlight sprint — pending Apple Developer account

### Rob (Founder Actions)
- [ ] Apple Developer account — $99/yr — unblocks TestFlight
- [ ] bobert.ai domain — $89.98/yr via Namecheap
- [ ] USPTO trademark — Class 042 + 009 — ~$350 each — file before going public
- [ ] Indiana LLC — ~$50

---

## Locked Decisions — All Departments Confirm Aligned

| Decision | Summary |
|---|---|
| DECISION 008 | Marketing owns all visual assets. Dev implements only. No independent recreation. |
| DECISION 009 | Brand red is `#DC2626`. In-app UI red is `#D01E1E`. Do not swap. |
| DECISION 010 | Corner Signal mark is the single master logo. Use `assets/icon.png` exactly as provided. |

---

## Rules Reminder

- Pull `main` before starting any session
- Read `business/DECISIONS.md` and `business/TEAM_SYNC.md` first
- Read `ASSET-NOTICE.md` before touching any logo, icon, splash, or email asset
- No department modifies a locked decision without an RFI through BD
- GitHub is the single source of truth

---

*Next BD session opens with: Brevo signup form wiring.*
