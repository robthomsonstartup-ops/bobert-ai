# FINANCE-PI-MONETIZATION-JULY29.md

**Company:** Bobert  
**Department:** Finance  
**Date:** July 29, 2026  
**Triggered by:** PROMPT-FINANCE-JULY29-PI-MONETIZATION.md  
**Status:** Exploratory — directional only. No locked model. PI is unvalidated personal-use.  
**Decision reference:** Decision 018 (two-sector structure), Decision 013 (no discretionary spend)

---

## 1. What Bobert PI Is (Finance's Understanding)

Bobert PI (Project Intake) is a tool for a field sales rep receiving bid invites, RFPs, and project documents. Input: bid invitation, RFP, screenshot, files, or a URL. Output: structured project summary, RFI checklist, and a generic deal draft. Currently a personal-use tool for Rob at CS Illumination. No CRM integration (CS Illumination's tech stack is unknown). No public product yet.

The buyer persona is different from FI: FI serves the rep finding opportunities in the field. PI serves the rep processing the opportunities that come to them. Both are the same person — a field rep — at different points in the sales cycle.

---

## 2. Comparable Product Categories

### 2a. Bid Management Platforms (GC-side tools)

These are not direct comps — they serve GCs posting projects and managing the bid process, not reps receiving bid invites. But they establish willingness-to-pay in the construction software category.

| Tool | Pricing | Notes |
|---|---|---|
| PlanHub | $1,199/yr base; $1,999–$3,299/yr for subs by geography | Subcontractor/supplier tool. Annual flat rate. Add-ons $91–141/mo. |
| BuildingConnected (Autodesk) | $149/mo subs; $399/mo+ GC; $400–500/seat enterprise | Monthly subscription. More feature-rich than PlanHub. |
| Procore (bid module) | $35K–$60K/yr for mid-market GC (volume-based) | Enterprise only. Not a comp — different buyer, different scale. |

**Signal:** Subcontractors pay $150–275/mo for access to bid opportunities. That's the market rate for the receiving side of the bid pipeline — which is adjacent to what PI solves.

### 2b. Plan Review / Markup Tools (adjacent workflow)

| Tool | Pricing | Notes |
|---|---|---|
| Bluebeam Revu | $260–$590/user/yr | Plan markup and review. Per-seat annual. Not doc extraction, but adjacent workflow. Construction reps already buy per-seat tools in this range. |

**Signal:** Construction professionals pay $22–49/user/month for dedicated workflow tools.

### 2c. AI-Native Document Extraction / RFP Intelligence (closest functional comp)

The field is emerging rapidly in 2026. Key players:

| Tool | What it does | Pricing signal |
|---|---|---|
| DeepRFP | AI doc analysis: summarizes RFPs into actionable outlines, chat-based Q&A on tender docs | Tiered by team size; SME-friendly entry. No public price found — likely $49–149/mo range based on category. |
| Quotr.ai | Upload PDF → AI extracts rooms/fixtures/symbols → structured estimate | Construction-specific. Pricing undisclosed. |
| Datagrid | Document ingestion, parsing, routing for GC workflows | Enterprise-oriented. Not a clean comp. |

**Signal:** AI-native doc extraction tools in adjacent verticals (legal, insurance) charge $50–200/mo for individual users. Construction-specific tools are earlier-stage and may be priced lower to drive adoption.

### 2d. The Real Comp: What a Sales Rep's Time Is Worth

This is Finance's most useful reference point:

- A field lighting/electrical rep at CS Illumination receives 50–100 bid invites per month (Finance estimate — Rob can correct).
- Manual processing: read the bid, extract project info, note the scope, figure out next steps, write a deal memo. Call it 15–20 minutes per invite.
- At 75 bids/mo × 15 min = 18.75 hours/mo of admin that PI theoretically eliminates.
- At $75/hr burdened cost for a field rep: ~$1,400/mo in reclaimed time value.
- At $100/hr: ~$1,875/mo.

A PI subscription at $49–99/mo is a 3–7% share of the value it delivers. That's deep value pricing with room to move up once validated.

---

## 3. Three Plausible Monetization Paths

### Path A: Bundle PI as a Pro/Team Feature

PI becomes a feature available at Pro ($119/mo) and above. Solo stays FI-only.

| Aspect | Detail |
|---|---|
| Implementation | No new pricing tier, no new checkout flow. Toggle PI access on/off by tier. |
| Revenue impact | Increases Pro and Team conversion (more value per dollar vs. FI-only competitors). Does not add a new revenue line — value captured through higher tier attachment. |
| Pricing signal | Pro already at $119. Adding PI makes $119 feel like better value vs. a $59 FI-only Solo tier. |
| Risk | Leaves value on the table if PI is independently useful to buyers who don't need FI (e.g., an inside sales admin who processes bid invites but doesn't do field capture). |
| When to use | Right path if PI and FI are mostly used by the same person in sequence. Validate first. |

**Finance gut check:** If Rob uses both FI and PI in the same day regularly, bundling is the right model. If PI is useful to someone who never uses FI (like a bid coordinator), standalone makes more sense.

### Path B: Standalone PI Subscription

PI is sold as a separate product at a separate price point.

| Aspect | Detail |
|---|---|
| Price range | $39–$79/mo. Lower than FI Solo ($59) because PI has lower COR — no GPS, no photo processing, no contact enrichment. Primary cost is AI inference (Groq is cheap; Groq free tier covers personal use scale). |
| Revenue model | Separate subscription line. Can be bought alone or combined with FI (bundle discount optional). |
| Cost of revenue | AI inference only — far cheaper than FI. A project summary + checklist + deal draft at Groq rates is probably $0.01–$0.05/intake. Even at 100 intakes/mo, COR is $1–5. PI gross margins at standalone pricing would exceed 90%. |
| Risk | Requires a separate sales motion and marketing message. Bobert can barely drive FI signups right now — splitting attention on two products before FI has traction is premature. |
| When to use | After FI reaches $5K+ MRR and PI has been validated through Rob's real use at CS Illumination. |

### Path C: Usage-Based Per-Intake Pricing

Each bid document processed costs a credit. Subscription optional.

| Aspect | Detail |
|---|---|
| Example structure | Free: 5 intakes/mo. Pay-as-you-go: $3/intake. Monthly pack: 25 intakes for $49/mo ($1.96/intake). |
| Revenue model | Usage revenue tied directly to value delivered. Heavy users pay more; occasional users pay less. |
| COR per intake | ~$0.01–$0.05 (AI inference only). Margin on $3/intake is ~98%. |
| Risk | Creates friction at the moment of use ("do I spend a credit on this?"). Reduces trial-to-conversion speed. Harder to forecast revenue than subscription. |
| When to use | If PI becomes a high-volume workflow tool for large teams processing hundreds of bids. Not the right model for early validation. |

---

## 4. Finance's Directional Recommendation

**For now:** Don't monetize PI separately. It's a personal-use validation tool. Revenue clock on PI doesn't start until Rob has used it real-world at CS Illumination for 4–6 weeks and can report whether it actually saves meaningful time and produces useful output.

**When PI is validated:** Start with Path A (bundle into Pro/Team). It's the fastest path to incremental value — existing FI subscribers get PI access, which justifies the tier, with zero new pricing complexity. This is also consistent with Decision 013 (no spend without validated revenue) and the bootstrapped operating model.

**Reserve standalone pricing (Path B)** for when there's evidence that buyers want PI without FI — i.e., a bid coordinator persona separate from the field rep. That's a genuine separate product with its own acquisition motion. Don't build for it before seeing the signal.

**On usage-based (Path C):** Keep it in the toolkit for a potential enterprise or team upsell model once volume data exists. Not for MVP monetization.

---

## 5. Blocked Dependencies — Do Not Model Past These

Finance is explicitly flagging these rather than guessing through them:

| Dependency | Why it matters | Who unblocks |
|---|---|---|
| PI validated through real use | All monetization paths assume PI is useful. Rob using it at CS Illumination is the only way to find out. | Rob (Aug 3 onward) |
| CS Illumination tech stack unknown | CRM integration (if that's key to value) can't be modeled until the actual stack is known. If PI without CRM is already valuable, this dependency may not matter. | Rob, once on the job |
| Whether PI and FI serve the same person | Bundle (Path A) vs. standalone (Path B) hinges entirely on this. | Rob's field use reveals this. |
| How many intakes/mo is a real workload | $3/intake vs. $49/mo pack is a radically different unit economics story at 5 vs. 100 intakes. | Rob's usage data |

Finance will not build a full PI P&L until at least one of the following happens: (a) Rob reports 30 days of real PI usage with an intake count and time-saved estimate, or (b) a beta user outside of Rob uses PI and gives usage data.

---

## 6. Version Control

| Version | Date | Change |
|---|---|---|
| v1.0 | July 29, 2026 | Initial PI monetization research. Exploratory — no locked model. Path A (bundle) recommended for validation phase. |
