# Marketing → BD Handoff
**Date:** July 27, 2026
**From:** Marketing (Cowork session)
**To:** Business Development (VP BD)
**Re:** CDE-JULY19 directives closed, two decisions locked, four items needing BD action

---

## Summary

All five CDE-JULY19 directives are now addressed. Three needed real work, two were audits that turned up defects. Two new decisions are locked (011, 012). Four items below need BD follow-up — one of them is a product-definition conflict that affects go-to-market, not just assets.

---

## Done

### Directives 001 + 002 — Wordmark lockup (CLOSED, live)

The live site's nav and footer logo were broken. Root cause: `bobert-mark-dark.png` was being rendered on the black nav with `mix-blend-mode: screen`, which erases dark pixels — the B disappeared and only the frame corners survived. It read as a black square.

Two prior commits (`0268e1f`, `9f20772`) attempted to fix this with CSS filters (`invert`, then blend modes). Both failed for the same structural reason: a filter recolors the entire image, so the red corner cannot survive independently of the B.

**Fix:** two pre-rendered transparent PNGs, correct variant chosen per background, zero CSS filters. Shipped in commit `5e11291` and verified live — `blend=normal`, `filter=none`, red corner rendering.

### Directives 003 + 005 — Icon assets (built, awaiting commit)

`adaptive-icon.png` was **not transparent**. It was `mode=RGB` with no alpha channel, and byte-identical (md5 `ccd7b69e`) to both `assets/icon.png` and root `icon.png` — a renamed copy of the app icon, not an adaptive foreground layer.

Two further defects found in the same pass:

- `splash-icon.png` was transparent but had **zero red pixels** — red corner missing entirely (DECISION 010 violation, shipped and unnoticed).
- `index.html` declared **no favicon at all**. `favicon.png` existed in the repo but was never referenced.

Seven assets generated, all verified against circle, squircle, and rounded-square masks. Favicon and theme-color tags added to `index.html`.

### Directive 004 — 30-second walkthrough (drafted)

No script existed. `MARKETING-STATUS-JULY20.md` stated "Script/storyboard: ready to build when gates clear" — that was an intention recorded as a status, and it read as an artifact.

Drafted at `marketing/WALKTHROUGH-30SEC-SCRIPT.md`, v1.1, vertical-neutral per Rob's direction. Eight shots, 48-word VO, production checklist. **Not approved for production.**

---

## Needs BD Action

### 1. Sign-off: adaptive icon sizing has a visible brand cost — DECISION 012

The Corner Signal is a **square** mark, so its four frame corners sit at the diagonal extremes. Android only guarantees a 66dp centered circle is visible across all OEM masks. For a square to fit inside that circle, its side must be ≤ 43.2% of the canvas.

Tested and rejected:

| Size | Diagonal | Pixel circle mask result |
|---|---|---|
| 55% | 84.0dp | Frame corners and red corner tip clipped |
| 50% | 76.4dp | Frame corners clipped |
| **43.2%** | **66.0dp** | **All corners intact** |

DECISION 010 forbids cropping the mark, so 43.2% was the only compliant option. **Consequence:** the mark reads smaller in the app tile than a typical icon that fills its space. This is a real aesthetic cost accepted to protect the locked construction.

**BD decision needed:** accept, or authorize an icon-specific lockup — which is an amendment to DECISION 010 and should not be handled as an asset tweak.

### 2. Product definition conflict — affects the video and the pitch

`business/TEAM_SYNC.md` describes Bobert as:

> "Point your phone at a construction sign. In under 30 seconds: developer, GC, leasing brokers, contacts, routing note. No manual research."

The repo's product objective and the live site describe something different — the Phase 1 capture workflow: photo → GPS → note → save → remind. No enrichment, no contact lookup, no research.

These are **not the same product**. One is an AI research engine; the other is a capture tool that prevents forgetting.

The walkthrough script was written against the Phase 1 capture flow, because that is what the beta actually ships and what the site promises. If BD is pitching the TEAM_SYNC version, the video will undersell it — and worse, the beta will under-deliver against the pitch.

**BD decision needed:** which product is being sold during beta? Everything downstream — video, one-pager, LinkedIn assets, Brevo sequence — depends on this answer. Recommend resolving before any further creative is produced.

### 3. Gate numbering is inconsistent across departments

`MARKETING-STATUS-JULY20.md` uses a Gates 1–8 scheme. CDE-JULY19 uses Directives 001–005. They do not map to each other, and both are in active use.

Two concrete problems this caused:

- That file reports **Gates 1 and 2 as CLOSED since July 20** ("committed July 20, commit `34ea5d0`"). They were not. The logo was broken on the live site until tonight. A gate was marked closed on the basis of a commit landing, not on the basis of the result being verified.
- Its Gate 7 names the required files as `adaptive-icon-transparent.png` and `adaptive-icon-monochrome.png`. I had built `adaptive-icon-foreground.png`. I added a file under the gate's exact name so it closes literally, which leaves `adaptive-icon-foreground.png` as a redundant byte-identical duplicate that should be deleted.

**BD action needed:** collapse to one numbering scheme, and change the closure criterion from "committed" to "verified in the live artifact." The logo bug survived two fix attempts and a status report saying it was done.

### 4. Brand hygiene — red drift in a source file

`assets/bobert-mark-white.png` carries red at approximately **#E41D1E**, not the locked **#DC2626**. `bobert-mark-dark.png` is correct.

All assets generated tonight were built from the dark mark and normalized to exact #DC2626. But the drift is inherited by anything previously generated from the white mark — including the wordmarks now live on the site. Visually imperceptible; measurably out of spec.

**BD action needed:** decide whether to regenerate the affected assets or accept the drift and correct the source file. Logged in DECISION 012 as a prohibition on using the white mark as a generation source.

---

## Decisions Locked This Session

- **DECISION 011** — Horizontal wordmark lockup. Two approved transparent PNGs; prohibits any CSS filter on the logo.
- **DECISION 012** — Adaptive icon geometry at 43.2%, with the math; red normalization to exact #DC2626.

Both appended to `business/DECISIONS.md` with rationale. No prior entries overwritten.

---

## Still Open (not Marketing-blocked)

- No `app.json` / `eas.json` / manifest exists in the repo, so nothing currently consumes the Android icon layers. They are staged, not wired. **Dev handoff, not Marketing.**
- `assets/icon.png`, root `icon.png`, and `splash.png` still carry the old drifted red and were left untouched.
- Brevo 10-email sequence still awaiting BD approval per `MARKETING-STATUS-JULY20.md`.
- One-pager and LinkedIn launch assets not started — and per item 2 above, should not start until the product definition is settled.

---

## Recommended BD Sequence

1. Resolve the product definition conflict (item 2) — it gates all remaining creative.
2. Sign off or amend on adaptive icon sizing (item 1).
3. Reconcile gate numbering and tighten the closure criterion (item 3).
4. Rule on red drift remediation (item 4).
5. Approve or revise the walkthrough script; four open questions are listed in it.

---

*Marketing has no further blocking work until items 1 and 2 are resolved.*
