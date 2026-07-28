# Changelog

## 2026-07-27 (later) — Icon assets: Directives 003 + 005

### Audit finding (Directive 003)

`assets/adaptive-icon.png` was **not transparent** — `mode=RGB`, no alpha channel, opaque #0F0F0F. It was byte-identical (md5 `ccd7b69e`) to `assets/icon.png` and root `icon.png`: a renamed copy of the app icon, not an adaptive foreground layer.

Two further defects found in the same pass:

- `splash-icon.png` was transparent but contained **zero red pixels** — red corner missing entirely (DECISION 010 violation).
- `index.html` declared **no favicon at all**. `favicon.png` existed but was never referenced.

### Generated (Directive 005)

All built from `bobert-mark-dark.png` with ink recolored to white and red snapped to exactly #DC2626.

| File | Size | Mode | Content | Purpose |
|---|---|---|---|---|
| `adaptive-icon.png` | 1024² | RGBA | 43.2% | Android foreground (transparent) |
| `adaptive-icon-foreground.png` | 1024² | RGBA | 43.2% | Explicit-name duplicate of above |
| `adaptive-icon-background.png` | 1024² | RGB | solid | Background layer, #1A1A1A |
| `adaptive-icon-monochrome.png` | 1024² | RGBA | 43.2% | Android 13+ themed icons |
| `splash-icon.png` | 1024² | RGBA | 69.9% | Splash — red corner restored |
| `favicon.png` | 192² | RGB | 62% | Browser tab |
| `apple-touch-icon.png` | 180² | RGB | 62% | iOS home screen |

Verified: all four frame corners and the red corner survive circle, squircle, and rounded-square masks.

### index.html

- Added `<link rel="icon">`, `<link rel="apple-touch-icon">`, and `<meta name="theme-color" content="#1A1A1A">`.

### Decisions

- Added DECISION 012 (adaptive icon geometry, 43.2% sizing, red normalization) to `business/DECISIONS.md`.

### Open

- No `app.json` / `eas.json` / manifest exists in the repo, so nothing currently consumes the Android layers. They are staged, not wired. Wiring is a dev task.
- `icon.png` (assets/ and root) and `splash.png` still carry the old drifted red and remain untouched this session.

---

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
