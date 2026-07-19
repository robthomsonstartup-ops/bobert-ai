# PROMPT FOR DEV — End of Day July 19, 2026

---

You are VP Product & Dev for Bobert. This is an end-of-day sync from Rob (Founder/CEO) via BD. A lot moved today. Read everything below, confirm your current state, and report back in the exact format specified at the bottom.

---

## What Happened Today — Full Update

**Brevo email automation is live.**
- Automation: "Bobert Beta — Signup Confirmation" — Active
- Trigger: Contact added to list "Bobert Beta Waitlist - #5"
- Email 1 fires immediately on signup
- Subject: "You're on the Bobert beta list"
- Email now has the official logo header: #0A0A0A background, icon.png centered at 68px, linked to https://bobert.ai
- Logo URL in email: https://robthomsonstartup-ops.github.io/bobert-ai/icon.png (resolves — icon.png is live in repo root)
- Full Marketing-approved copy in the email body (Lakepoint proof point, Rob's voice)
- Brevo API key generated and stored locally by BD — do NOT expose publicly

**Brand assets are in the repo.**
All 9 files are live at: https://github.com/robthomsonstartup-ops/bobert-ai/tree/main/assets

| File | Purpose |
|---|---|
| icon.png | App icon / Corner Signal master mark |
| adaptive-icon.png | Android adaptive icon |
| splash.png | Splash screen |
| splash-icon.png | Splash icon variant |
| favicon.png | Browser favicon |
| bobert-wordmark-dark.png | Wordmark on light backgrounds |
| bobert-wordmark-white.png | Wordmark on dark backgrounds |
| bobert-mark-dark.png | B mark on light backgrounds |
| bobert-mark-white.png | B mark on dark backgrounds |

**GitHub repo structure as of today:**
- `/assets/` — all 9 brand assets
- `/icon.png` — root copy (for email/GitHub Pages)
- `/index.html` — landing page
- `/business/DECISIONS.md` — all 10 locked decisions
- `/business/TEAM_SYNC.md` — team status and rules
- `/business/ALL-HANDS-BRIEF-JULY19.md` — today's full cross-department brief

**Locked decisions that affect Dev (confirm you are aligned):**
- DECISION 008: Marketing owns all visual assets. Dev implements, does not recreate or modify.
- DECISION 009: Colors are #1A1A1A (black), #DC2626 (red), #FFFFFF, #6B7280, #F0F0F0. theme.js must be at #DC2626.
- DECISION 010: The Corner Signal mark is the single master logo. Use assets/icon.png exactly as provided. Do not redraw, recolor, or approximate.

**What Dev is still waiting on (from others):**
- Brevo signup form embed code — coming from BD next session
- Apple Developer account — Rob's plate ($99)
- bobert.ai domain — Rob's plate ($89.98)

**Tomorrow's direction:**
BD is going to start pulling the website and next steps together. Dev should be ready to execute on landing page form integration the moment BD sends the Brevo embed code.

---

## Report Back to Rob in This Exact Format

Copy this section, fill it in, and send it back to Rob. He will paste it to BD for cross-department confirmation.

```
## DEV END-OF-DAY REPORT — July 19, 2026

### Completed Today
[List everything Dev finished today]

### Current App State
[What is working in the app right now — be specific]

### Brand Assets — Confirmed
[ ] Pulled assets/ from main
[ ] icon.png implemented as app icon
[ ] adaptive-icon.png implemented
[ ] splash.png implemented
[ ] theme.js confirmed at #DC2626
[ ] No FieldIQ or legacy references remaining

### Locked Decisions — Confirmed Aligned
[ ] DECISION 008 — Marketing owns assets, Dev implements only
[ ] DECISION 009 — Color palette correct in app
[ ] DECISION 010 — Corner Signal mark used as provided, not recreated

### Blockers
[List anything blocking Dev right now]

### Ready For Tomorrow
[What Dev is staged and ready to execute the moment blockers clear]

### Questions or Conflicts
[Anything that needs BD or Marketing response before proceeding]

### Signed
VP Product & Dev — [date]
```
