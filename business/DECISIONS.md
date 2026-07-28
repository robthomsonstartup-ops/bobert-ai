# DECISIONS.md
**Bobert — Locked Decisions Log**  
This file is the single source of truth for locked decisions. Once logged here, a decision is final unless overridden with a dated entry below it.

---

## DECISION 001 — Company / Product Name
**Locked:** July 2026  
**Decision:** The name is **Bobert**.  
**Origin:** Rob's niece couldn't say her R's — "Robert" became "Bobert." Rob is the fun uncle. The name is personal, authentic, and impossible to forget.  
**USPTO Status:** 0 live marks as of July 2026. Clear in Class 042 and Class 009.  
**Domain:** bobert.ai confirmed available at $89.98/yr via Namecheap.  
**Risk accepted:** Rob is aware of the Lauren Boebert political association (different spelling). The authentic family origin story eliminates the practical risk. Decision stands.

---

## DECISION 002 — Brand Architecture
**Locked:** July 2026  
**Decision:** **Bobert is the primary brand** — company name, product name, and AI persona.  
- Company: Bobert (LLC, Indiana — pending filing)
- Platform: Bobert Opportunity Intelligence Platform
- AI assistant: Bobert (the AI inside the app is Bobert)

---

## DECISION 003 — Founder Model
**Locked:** July 2026  
**Decision:** Solo founder, fully bootstrapped through validation phase.  
**Hiring trigger:** $10–15K MRR or when customer support becomes unmanageable.  
**Outside funding:** Not pursued until proof of commercial traction.

---

## DECISION 004 — Launch Market
**Locked:** July 2026  
**Decision:** Beachhead is construction and commercial field sales (lighting, electrical, HVAC, roofing, solar, signage, manufacturers' reps).  
**Expansion:** CRE, nonprofit, corporate BD, healthcare, university development — after 10+ paying customers in the beachhead.

---

## DECISION 005 — Pricing Model
**Locked:** July 2026  
**Decision:** Per-user SaaS, 30-day free trial, 4 tiers.

| Tier | Price | Users |
|---|---|---|
| Solo | $49–79/mo | 1 |
| Professional | $99–149/mo | Up to 3 |
| Team | $299+/mo | Up to 10 |
| Enterprise | Custom | Unlimited |

---

## DECISION 006 — Logo / Icon Direction
**Locked:** July 2026  
**Decision:** Working logo direction is **Concept 4 — Corner Signal**.  
**Description:** Bold geometric B monogram framed by capture-frame corners. Single red corner as accent (top right). Black background, white mark.  
**Status:** Approved for use. Refine with a real designer when budget is available.

---

## DECISION 007 — Primary Tagline
**Locked:** July 2026  
**Decision:** The tagline is **"See what others drive past."**  
**Use:** All marketing materials, App Store, pitch deck, website hero, one-pager, social. Do not alter.

---

## DECISION 008 — Brand Asset Ownership & Dev Handoff Protocol
**Locked:** July 2026  
**Decision:** Marketing owns the Bobert brand system and all customer-facing visual assets.

**Marketing provides:** Logo files, app icon, splash/onboarding graphics, App Store graphics, customer-facing copy.  
**Development implements:** Pull latest from main, read brand-brief.md and logo-icon-brief.md, implement only approved changes. Do not recreate or modify the logo independently.

---

## DECISION 009 — Official Brand Color Palette (FINAL — All Departments Confirmed)
**Locked:** July 2026  
**Agreed by:** Business Development, Marketing, Development

| Role | Hex |
|---|---|
| Primary Black | #1A1A1A |
| Bobert Red | #DC2626 |
| Light Gray (app bg) | #F0F0F0 |
| Mid Gray (secondary text) | #6B7280 |
| White | #FFFFFF |
| Graphite (reserve) | #1F2937 |

**Note:** Red in the logo is always #DC2626. In-app UI may use #D01E1E but never within the logo mark.

---

## DECISION 010 — Master Bobert Logo Mark
**Locked:** July 2026  
**Decision:** The Corner Signal mark is the single master Bobert logo for all brand applications.

**Approved construction:**
- Black background
- White geometric B
- White capture-frame corners
- Top-right capture corner in Bobert Red #DC2626

**The mark must not be redrawn, recolored, approximated, stretched, cropped, or replaced.**

**Prohibited variants:** Plain text B, white B inside red square, red-background variants, different-colored corners, department-created versions.

---

## DECISION 011 — Horizontal Wordmark Lockup
**Locked:** July 27, 2026

**Decision:** The horizontal lockup (Corner Signal mark + "Bobert" in Inter ExtraBold 800) ships as two pre-rendered transparent PNGs. Site and collateral use the image — never typed text alongside the mark.

**Approved assets:**

| File | Contents | Use |
|---|---|---|
| `assets/bobert-wordmark-white.png` | White mark + white text, transparent bg, red corner #DC2626 | Dark backgrounds — nav, footer, email header, dark one-pager |
| `assets/bobert-wordmark-dark.png` | Dark mark + #1A1A1A text, transparent bg, red corner #DC2626 | Light backgrounds — one-pager body, LinkedIn, social, print |

Both exported at 2400×600 (2× retina of 1200×300).

**Construction:** mark at 220px on a 300px canvas, 30px left pad, 44px gap, text at 200px Inter 800, vertically centered on cap-height.

**Rationale:** The prior wordmark PNGs in `/assets/` shipped with solid non-transparent backgrounds (light gray and near-white), making them unusable on the dark site. The nav worked around this by pairing `bobert-mark-dark.png` with typed HTML text and a blend mode — which rendered the mark nearly invisible on dark and put the red corner at risk.

**Prohibited:** Any CSS filter that alters logo color — specifically `filter: brightness(0) invert(1)` and `mix-blend-mode`. Both destroy the red corner (red → black → white). The correct variant already carries native white or dark pixels plus the red corner. Pick the right file; do not filter.

---

## DECISION 012 — Android Adaptive Icon Geometry
**Locked:** July 27, 2026

**Decision:** In the Android adaptive icon, the Corner Signal mark occupies **43.2% of the 1024×1024 canvas**, centered.

**Rationale:** Android composites a transparent foreground over a background layer, then applies an OEM mask — circle (Pixel/stock), squircle (Samsung), or rounded square. The mask crops to a 72dp viewport of the 108dp canvas, and only a **66dp centered circle** is guaranteed visible on every device.

The Corner Signal mark is a **square** frame, so its four capture-frame corners sit at the diagonal extremes — the worst case under a circular mask. For a square of side S to fit inside the 66dp safe circle: S × √2 ≤ 66, so S ≤ 46.7dp = **43.2%** of canvas.

Larger sizes were tested and rejected:

| Size | Diagonal | Result under Pixel circle mask |
|---|---|---|
| 55% | 84.0dp | Frame corners and red corner tip clipped |
| 50% | 76.4dp | Frame corners clipped |
| **43.2%** | **66.0dp** | **All four corners and red corner intact** |

DECISION 010 states the mark must not be cropped. 55% and 50% crop it on Pixel devices, so 43.2% is the only compliant option.

**Consequence:** The mark reads smaller than a typical app icon that fills its tile. This is accepted. Increasing visual weight would require an icon-specific lockup, which is a change to DECISION 010 and must be decided separately — not adjusted silently in an asset export.

**Also locked:** Logo red is normalized to exactly **#DC2626** in all generated assets. Source file `bobert-mark-white.png` carries drifted red (~#E41D1E) and must not be used as a generation source. Use `bobert-mark-dark.png`, recoloring ink #1A1A1A → #FFFFFF as needed.

---

*Add new decisions below with date and rationale.*


---

## Decision 012 — No Discretionary Spend Until Beta Proves Revenue
**Date:** 2026-07-27
**Owner:** Rob (BD)

Rob confirmed: no money committed up front. This supersedes the pending
$5,000 starting cash assumption and the $3,000 contractor contingency —
neither is approved right now.

**Rule going forward:** No new spend of any kind (contractor, ads, tools,
paid channels) until the beta demonstrates real revenue. Hiring/contractor
spend remains strictly triggered by MRR and support load, never pre-funded.
Finance should model the base case on $0 starting capital and revise
upward only if/when revenue creates room.

**Status:** Locked. Finance to rebuild v1.1 model on this assumption.

---

## Decision 013 — Revenue-First Mandate for Finance
**Date:** 2026-07-27
**Owner:** Rob (BD)

Finance's job is not to ask for capital — it's to find the path to
self-funded growth. If the model shows a minimum revenue threshold is
needed (e.g. the $2,697 max cash gap), that threshold becomes Finance's
target to hit through paid beta conversions, not something bridged with
outside cash or upfront spend.

**Directive:**
- Finance identifies the fastest realistic path to paid conversions that
  closes any modeled gap organically.
- Any revenue generated is reinvested directly into the product
  (development, infra, support) — not treated as founder draw or banked.
- Post-beta, Finance's primary output shifts from "what do we need" to
  "how do we generate enough revenue to fund the next phase ourselves."
- This does not relax the Stripe-live gate or the Aug 10–12 checkpoint
  framework — it sharpens the reason those checkpoints exist: paid
  conversions are the funding mechanism, not a nice-to-have metric.

**Status:** Locked. Finance's v1.1 model and all future recommendations
should be framed around self-funded revenue generation, not capital asks.
