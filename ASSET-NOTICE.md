# BRAND ASSET STANDARD — ENFORCEABLE

**Version:** 2.0 — July 28, 2026
**Supersedes:** ASSET-NOTICE.md v1 (advisory)
**Authority:** DECISIONS 009, 010, 011, 012
**Enforcement:** `python3 scripts/brand-check.py` — must exit 0 before merge

---

## Why This Document Changed

v1 of this notice already contained the rule *"Do not recreate the Bobert wordmark with typed text."*

That rule was violated three times after it was written:

1. `index.html` nav — typed text beside a filtered mark
2. `index.html` footer — same
3. `upgrade.html` — typed text again, on a brand-new page, hours after the first two were fixed

The rule was never the problem. **The rule had no verification step.** Sessions read this file, agreed with it, and shipped violations anyway — because nothing failed when they did.

v2 exists to make compliance checkable by a command instead of by memory.

---

## The Check

```bash
python3 scripts/brand-check.py            # report
python3 scripts/brand-check.py --strict   # warnings fail too
```

Exit `0` = pass. Exit `1` = violations.

**Run it before every commit that touches HTML or `assets/`.** If it fails, fix the code. Do not edit the check to make it pass — each rule maps to a locked DECISION, and changing a threshold means amending that DECISION first.

---

## Hard Rules

| # | Rule | Authority |
|---|---|---|
| **R1** | The wordmark is an image. Never typed text. | D011 |
| **R1b** | Brand chrome uses an approved wordmark/mark file only. `icon.png`, `splash.png`, and `adaptive-icon.png` are app-store assets and must never be used as a page logo. | D011 |
| **R2** | No CSS `filter` or `mix-blend-mode` on any logo image, ever. Filters recolor the whole image and destroy the red corner. Choose the correct pre-rendered variant instead. | D010, D011 |
| **R3** | Every public page declares `<link rel="icon">`. | — |
| **R4** | Palette is locked. Off-palette saturated colors require justification. | D009 |
| **R5** | Logo red is exactly `#DC2626`. `#D01E1E` is in-app UI accent only and never appears in the logo. | D009 |
| **R6** | Wordmarks and marks must contain fully-transparent pixels. No solid backgrounds. | D011 |
| **R7** | Every mark and wordmark contains the red corner. Zero red pixels = broken asset. | D010 |
| **R8** | `adaptive-icon.png` must be transparent and its content must span ≤ 43.2% of canvas. | D012 |
| **R9** | Never generate derivatives from `bobert-mark-white.png` — its red has drifted to ~`#E41D1E`. Generate from `bobert-mark-dark.png` and recolor ink to white. | D012 |
| **R10** | `adaptive-icon.png` must not be byte-identical to `icon.png`. | D012 |

---

## Approved Assets

**Page and collateral logos — use these:**

| File | Use |
|---|---|
| `assets/bobert-wordmark-white.png` | Dark backgrounds — nav, footer, email header |
| `assets/bobert-wordmark-dark.png` | Light backgrounds — one-pager, social, print |
| `assets/bobert-mark-white.png` | Mark alone, dark backgrounds |
| `assets/bobert-mark-dark.png` | Mark alone, light backgrounds. **Generation source.** |

**App/store assets — never use as page logos:**

`adaptive-icon.png` · `adaptive-icon-foreground.png` · `adaptive-icon-background.png` · `adaptive-icon-monochrome.png` · `adaptive-icon-transparent.png` · `favicon.png` · `apple-touch-icon.png` · `icon.png` · `splash-icon.png` · `splash.png`

---

## The Filter Trap

Three separate attempts were made to fix the nav logo with CSS:

| Commit | Approach | Why it failed |
|---|---|---|
| `0268e1f` | `filter: invert()` | Inverts red toward cyan |
| `9f20772` | inverted mark | Same class of problem |
| pre-`5e11291` | `mix-blend-mode: screen` | Erases dark pixels; B vanished on black |

**The mark has three colors that must survive independently: white, near-black, and red.** No single CSS filter can preserve all three, because filters are global transforms. This is not a tuning problem. Stop reaching for filters.

The fix is always the same: **pick the variant whose pixels are already correct for that background.**

---

## Closure Criterion

A gate, directive, or task is closed when the **result is verified in the live artifact** — not when a commit lands.

`MARKETING-STATUS-JULY20.md` marked Gates 1 and 2 CLOSED on July 20, citing commit `34ea5d0`. The logo was broken on the live site until July 27. The commit existed. The fix did not work. Nobody looked.

**Required evidence to close anything visual:**

1. Commit hash
2. Deploy confirmed live (not just pushed)
3. Screenshot or DOM inspection of the deployed page
4. `brand-check.py` exit 0

Items 2 and 3 are what was missing.

---

## Before You Commit

- [ ] Pulled latest `main`
- [ ] Read `business/DECISIONS.md`
- [ ] Used only approved assets for brand chrome
- [ ] No CSS filter or blend on any logo
- [ ] `python3 scripts/brand-check.py` exits 0
- [ ] For visual changes: deploy finished, and you looked at the live page

---

## Known Open Debt

| Item | Detail |
|---|---|
| Red drift | `bobert-mark-white.png` reds are ~`#E41D1E`. Inherited by the live wordmarks. Visually imperceptible, measurably out of spec. Decide: regenerate or correct the source. |
| Legacy assets | `icon.png` (root + assets), `splash.png` still carry drifted red. |
| Duplicate | `adaptive-icon-foreground.png` and `adaptive-icon-transparent.png` are byte-identical. Gate 7 named the latter; keep one. |
| No manifest | No `app.json` / `eas.json`. Android layers are staged, not wired. |
| Open violations | `upgrade.html` and `success.html` currently FAIL the check — see below. |

---

## Current Status — July 28, 2026

`brand-check.py` reports **3 violations**:

- `upgrade.html` — brand chrome uses `icon.png` instead of an approved wordmark (R1b)
- `upgrade.html` — no favicon declared (R3)
- `success.html` — no favicon declared (R3)

These are Dev-owned files. Fixes are small and listed in the checklist above.

---

*Rules without verification are suggestions. Run the check.*
