# CDE — Cross-Department Edict
**Number:** CDE-001  
**Date:** July 19, 2026  
**Issued by:** VP Business Development  
**Authority:** Rob Thomson, Founder/CEO  
**To:** All Departments — Marketing, Development, Business Development  
**Status:** BINDING — comply or submit written rewrite to BD before next session opens

This edict is issued after reviewing end-of-day reports from Marketing and Development. It confirms alignment where departments agree and issues mandatory directives where they conflict, are unclear, or require action before tomorrow's session.

---

## SECTION 1 — CONFIRMED AND CLOSED

| Item | Status |
|---|---|
| All 9 brand assets in assets/ on main | Confirmed by all departments |
| Brevo automation live — trigger + email firing | Confirmed by all departments |
| Email logo header — icon.png, #0A0A0A, 68px, linked to bobert.ai | Confirmed by all departments |
| Email subject: "You're on the Bobert beta list" | Confirmed by all departments |
| Email body — Marketing-approved copy, Lakepoint proof point | Confirmed by all departments |
| DECISION 007 — Tagline "See what others drive past." in use | Confirmed by all departments |
| DECISION 009 — Color palette correct in all approved assets | Confirmed by all departments |
| DECISION 010 — Corner Signal mark used as built | Confirmed by all departments |
| DECISIONS.md, TEAM_SYNC.md, ALL-HANDS-BRIEF live in repo | Confirmed by Dev |
| Rob's action items (Apple account, domain, trademark, LLC) | Documented — Rob's plate |

---

## SECTION 2 — MANDATORY DIRECTIVES

Hard gates. No department proceeds past items in their queue until resolved.

---

### DIRECTIVE 001 — Marketing Drafts: Wordmark Correction Required Before Any Release
**Affects:** Marketing

Marketing self-reported that the one-pager, LinkedIn image, and carousel all used a recreated "Bobert" text instead of the approved wordmark asset.

**Mandatory:** Before any asset is shared externally:
- Replace recreated "Bobert" text with assets/bobert-wordmark-dark.png or bobert-wordmark-white.png as appropriate
- Apply larger header treatment as noted in Marketing's own report
- Complete QA: approved wordmark, no recreated logo text, correct palette, correct tagline

Facebook/Instagram post: do not begin until LinkedIn announcement is corrected and approved by Rob.

**Standard:** DECISION 010 is absolute. No recreated logo text in any asset, ever.

---

### DIRECTIVE 002 — Landing Page Logo: Confirm Correction or Fix Before Tomorrow
**Affects:** Development, Marketing

Marketing flagged that the landing page nav/footer has a gray-background logo (incorrect). Dev's report states it was already corrected to the black-background Corner Signal mark.

Both departments cannot be right simultaneously.

**Mandatory:**
- Dev: Confirm the specific commit that fixed the nav/footer logo. State the exact change.
- Marketing: Pull main, load the live page, and visually confirm the nav and footer logo is the correct black-background Corner Signal mark.
- If not confirmed live before tomorrow's session, Dev corrects it as the first action of the day.

**Standard:** DECISION 010. Black background, white B, red top-right corner. No gray, no white background, no plain text.

---

### DIRECTIVE 003 — adaptive-icon.png Transparency: Marketing to Confirm
**Affects:** Marketing

Dev flagged that adaptive-icon.png may have a black fill background. Android adaptive icons require a transparent foreground layer.

**Mandatory:** Marketing confirms before tomorrow's session:
- (A) assets/adaptive-icon.png is already a transparent foreground layer — state explicitly
- (B) A separate transparent version is needed — deliver as assets/adaptive-icon-transparent.png

Dev cannot complete app.config.js adaptive icon wiring until this is confirmed.

---

### DIRECTIVE 004 — 30-Second App Walkthrough: Confirm Existence and Location
**Affects:** Marketing, Development

Marketing's report states "Completed the 30-second app walkthrough structure with Development." Dev's report does not reference this.

**Mandatory:**
- Marketing: State what was produced, in what format, and where it lives.
- Dev: Confirm whether this was a shared deliverable and where it is.

If it is a script or structure document, it belongs in business/ and should be committed.

---

### DIRECTIVE 005 — Android Icon Variants: Marketing to Clarify
**Affects:** Marketing

Dev referenced android-icon-background.png, android-icon-foreground.png, android-icon-monochrome.png. These files are not in the repo.

**Mandatory:** Marketing clarifies:
- (A) Not needed — adaptive-icon.png covers Android — no Dev action required
- (B) Needed — Marketing produces and pushes to assets/

Dev will not wire what doesn't exist.

---

## SECTION 3 — TOMORROW'S SESSION AGENDA

All departments pull main and read this CDE before any other work.

**BD:** Brevo signup form → Rob notification step → embed code to Dev → App Store description draft

**Marketing:** Corrected one-pager + LinkedIn image + carousel → adaptive-icon confirmation → Android variant clarification → 30-sec walkthrough confirmation → landing page content spec for full bobert.ai build

**Dev:** Confirm landing page logo fix with commit hash → confirm/deny 30-sec walkthrough → await Brevo embed code (wire immediately on receipt) → confirm app.config.js favicon/splash-icon status → standby for EAS/TestFlight (pending Rob's Apple Developer account)

---

## SECTION 4 — STANDING RULES REAFFIRMED

1. GitHub is the single source of truth. Pull main before every session.
2. Read business/DECISIONS.md and business/TEAM_SYNC.md before acting.
3. No department modifies DECISION 001–010 without a written RFI to BD.
4. Marketing owns all customer-facing visual assets. Dev implements only. Dev does not recreate or modify logo assets.
5. No marketing asset goes public with an uncorrected logo, recreated wordmark, or wrong color. DIRECTIVE 001 is a hard gate.
6. Brand logo red is always #DC2626. In-app UI may use #D01E1E. Do not swap.

---

## COMPLIANCE

Each department confirms compliance by pulling this file from main and reporting back to Rob at the start of tomorrow's session. If any directive cannot be met as written, submit a written rewrite proposal to BD before proceeding.

No exceptions. No workarounds. Report conflicts — do not absorb them silently.

---

*CDE-001 — Issued July 19, 2026 — VP Business Development — Bobert*
