# Founder Decision Memo — Finance Sign-Off Required
**Date:** July 20, 2026
**From:** VP Business Development
**To:** Rob Thomson, Founder/CEO
**Re:** Six decisions needed to finalize the Finance model before commercial launch

Finance has delivered `Bobert_Projected_Budget_PnL_v1.0.xlsx` with a strong projected operating plan. The model cannot be finalized until you make the following six calls. Each decision is documented below with the options, the implications, and a space for your answer.

---

## DECISION A — Paid Commercial Launch Month

**What Finance needs:** The month Bobert opens to paying customers.

**Context:** Finance models a paid launch in **October 2026**. That assumes TestFlight ships in August, beta runs 6–8 weeks, and paid launch follows. The entire revenue and EBITDA timeline shifts with this date.

**Dependency:** Apple Developer account ($99) — unblocked the moment you purchase.

**Options:**
- October 2026 — holds the current model
- November 2026 — pushes first EBITDA-positive month to January 2027
- Later — Finance re-models on request

**Your call:** ANSWERED (2026-07-28) — tracked via the live Aug 10-12 checkpoint framework, further gated by Decision 016: Stripe live mode (and therefore any real paid launch) does not activate until the /capture MVP ships. October remains base case; September only if beta signals AND /capture are both ready.

---

## DECISION B — Starting Capital and Cash Buffer

**What Finance needs:** How much you are putting in and the minimum cash balance you will operate above.

**Context:** Finance models **$5,000 starting cash** and a **$2,000 minimum buffer**. The maximum projected capital gap to maintain that buffer is **$2,697** — meaning worst case, you need $4,697 to get to EBITDA-positive without going below $2K.

**Options:**
- Confirm $5,000 start / $2,000 buffer — holds the current model
- Adjust starting capital — Finance re-models
- Adjust minimum buffer — Finance re-models

**Your call:** ANSWERED (2026-07-28) — $0 starting capital, $0 minimum buffer. Per Decision 013 (no upfront spend) and Decision 014 (revenue-first mandate). Nothing is funded ahead of revenue.

---

## DECISION C — Exact Commercial Prices

**What Finance needs:** Final per-tier prices to lock the revenue model.

**Context:** Finance used these working figures, all inside DECISION 005 ranges:

| Tier | Finance Model | DECISION 005 Range |
|---|---|---|
| Solo | $59/mo | $49–79/mo |
| Professional | $119/mo | $99–149/mo |
| Team | $349/mo | $299+/mo |
| Enterprise | $1,500/mo | Custom |

**Your call (confirm or adjust each):**
- Solo: $59/mo — CONFIRMED, live in Stripe (sandbox)
- Professional: $119/mo — CONFIRMED, live in Stripe (sandbox)
- Team: $349/mo — CONFIRMED, live in Stripe (sandbox)
- Enterprise: $1,500/mo — CONFIRMED, live in Stripe (sandbox)

---

## DECISION D — Web Billing vs. App Store Billing

**What Finance needs:** Where customers pay — directly through the web (Stripe) or through the App Store (Apple/Google).

**Context:** This is the highest-impact margin decision in the model.

| Option | Take Rate | Gross Margin Impact |
|---|---|---|
| Direct web billing (Stripe) | ~2.9% + $0.30 per transaction | Preserves ~79% gross margin |
| App Store billing (Apple) | 15–30% of revenue | Reduces gross margin to ~55–67% |
| Hybrid (web default, App Store available) | Mixed | Depends on mix |

**BD recommendation:** Default to direct web billing (Stripe) for beta and commercial launch. App Store billing adds no value for B2B field sales reps — they will pay on a website. Revisit App Store billing only if consumer adoption becomes a factor.

**Your call:**
- [x] Direct web billing (Stripe) — ANSWERED (2026-07-28), CONFIRMED and BUILT. Checkout live at bobert.ai/upgrade, 4 tiers, 30-day trial, webhook active, tested end to end in sandbox. Per Decision 015, will go live on Rob's personal bank account (LLC deferred to post-revenue) once Decision 016's gate (/capture MVP) clears.

---

## DECISION E — Annual Plans and Discounts

**What Finance needs:** Whether to offer annual pricing at launch, and at what discount.

**Context:** Annual plans improve cash flow (collect 12 months upfront) but reduce headline MRR optics. Common SaaS discount is 15–20% off monthly rate (effectively 2 months free).

**Options:**
- No annual plans at launch — simplest, keep monthly only through beta
- Annual plans at launch — Finance models the cash flow impact on request
- Annual plans at a specific discount: ______%

**BD recommendation:** No annual plans until you have 30+ paying customers and know churn. Premature annual discounts lock in under-priced contracts before you understand the value.

**Your call:**
- [x] No annual plans at launch — ANSWERED (2026-07-28), CONFIRMED. Monthly only through beta and early commercial launch. Revisit once 30+ paying customers and churn data exist.

---

## DECISION F — Trade Show Spending

**What Finance needs:** An approval policy for trade show and event spending.

**Context:** Finance flags trade show spending should only be approved against a qualified pipeline and a defined objective — not as speculative brand exposure.

**BD recommendation:** No trade show spending in 2026. First 10 paying customers come from Rob's direct network, not booths. Revisit Q1 2027 if MRR is on track and a specific show has a defined ROI case.

**Options:**
- No trade show spending in 2026 — recommended
- Approved up to $______ per event against a defined objective
- Open — evaluate case by case

**Your call:**
- [x] No trade show spending in 2026 — ANSWERED (2026-07-28), CONFIRMED. Consistent with Decision 013/014 — no discretionary spend until beta proves revenue.

---

## Summary — Decisions Needed

| Decision | Status |
|---|---|
| A — Paid launch month | ANSWERED (2026-07-28) — Aug 10-12 checkpoint + Decision 016 gate |
| B — Starting capital + buffer | ANSWERED (2026-07-28) — $0 / $0 |
| C — Exact prices per tier | ANSWERED (2026-07-28) — $59 / $119 / $349 / $1,500 |
| D — Web vs. App Store billing | ANSWERED (2026-07-28) — direct web billing (Stripe), built, pending live activation |
| E — Annual plans | ANSWERED (2026-07-28) — none at launch |
| F — Trade show policy | ANSWERED (2026-07-28) — none in 2026 |

Once these are returned to BD, Finance will lock the model and the P&L becomes the operating plan for Year 1.

---

*BD — July 20, 2026 — Bobert*
