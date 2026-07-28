# Changelog

## 2026-07-27

### Brand — Wordmark lockup fixed on live site

**Assets**

- Regenerated `assets/bobert-wordmark-white.png` — white mark + white text, fully transparent background, red corner #DC2626 native. 2400×600.
- Regenerated `assets/bobert-wordmark-dark.png` — dark mark + #1A1A1A text, fully transparent background, red corner #DC2626 native. 2400×600.
- Both replace prior versions that shipped with solid non-transparent backgrounds and were unusable on the dark site.

**index.html**

- Nav: replaced `bobert-mark-dark.png` + typed `<span>Bobert</span>` with a single `bobert-wordmark-white.png` image.
- Footer: same swap.
- Removed `mix-blend-mode: screen` from both logo images. No CSS filter is applied to the logo anywhere.
- Removed now-unused `.nav-wordmark` and `.footer-wordmark` type rules.
- `.nav-logo-mark` → 38px height, auto width. `.footer-logo-mark` → 28px height, auto width.

**Decisions**

- Added DECISION 011 (horizontal wordmark lockup) to `business/DECISIONS.md`.

**Closes**

- CDE-JULY19 DIRECTIVE 001 — approved image assets replace recreated wordmark text.
- CDE-JULY19 DIRECTIVE 002 — live landing page logo fix.

**Not addressed this session**

- DIRECTIVE 003 — adaptive-icon.png transparency confirmation.
- DIRECTIVE 004 — 30-second walkthrough location.
- DIRECTIVE 005 — Android icon variants (background, foreground, monochrome) still absent from repo.
