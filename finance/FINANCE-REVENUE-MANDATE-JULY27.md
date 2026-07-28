# FINANCE-REVENUE-MANDATE-JULY27.md

**Company:** Bobert  
**Department:** Finance  
**Date:** July 27, 2026  
**Decisions logged:** D012 (no upfront spend), D013 (revenue-first mandate)  
**Status:** Finance position confirmed — model rebuilt, path to first revenue defined  
**Supersedes:** FINANCE-STATUS-JULY20.md §4.5 (starting cash) and §3.10 (contractor contingency)

---

## 1. Finance Acknowledgment of D012 and D013

Finance acknowledges both decisions as binding, effective July 27, 2026.

**D012 — No outside capital / no discretionary spend / no contractor upfront:** The $5,000 starting cash assumption is removed. The $3,000 contractor contingency is removed. The model now operates from $0. Any spend must be covered by revenue or by a defined Founder contribution treated as a loan or equity input with CPA documentation when volume warrants it.

**D013 — Revenue-first mandate:** The objective is the fastest realistic path to the first paid dollar through the beta funnel. Revenue generated is reinvested in the product. It is not banked, not drawn, and not used to fund opex that has not yet been earned.

Finance accepts both decisions and has no substantive conflict to flag. The financial model has been rebuilt accordingly.

---

## 2. The Real Cash Gap (Corrected)

The $2,697 figure from the prior model was the deficit relative to $5,000 starting cash — meaning the model showed cumulative pre-launch losses exceeding $5,000 before self-funding. That number assumed prior v1.0 costs (domain + Apple Developer + RevenueCat + App Store commissions + potential hosting costs).

With v1.1 corrections and $0 starting cash, the actual pre-launch cash burn is:

| Scenario | August spend | September spend | Total burn before first revenue |
|---|---:|---:|---:|
| **October paid launch (base)** | $136 | $56 | **$192** |
| **September paid launch (alt)** | $136 | — | **$136** |

August breakdown: domain $80 (confirmed, Porkbun) + AI dev tools $50 + Google Workspace $6.  
Monthly recurring (stripped): AI dev tools $50 + Google Workspace $6 = $56/mo.

**One open question on the $50/mo AI dev tools:** If Rob's Claude and Cursor subscriptions are already covered by CBMC, the Bobert-specific monthly burn drops to $6. That would make the pre-launch cash requirement $86 (Oct launch) or $86 (Sep launch, same August-only exposure). Finance flags this for Founder confirmation — it changes the minimum conversion count at launch.

---

## 3. Revenue Path — Conversions Needed to Close the Gap

### Unit economics per account per month (v1.1, 100% direct web)

| Tier | Price | Stripe fee | Net revenue | COR (~$0.10/brief) | **Gross profit** |
|---|---:|---:|---:|---:|---:|
| Solo | $59.00 | $2.01 | $56.99 | $3.00 (30 briefs) | **$53.99** |
| Professional | $119.00 | $3.75 | $115.25 | $10.00 (100 briefs) | **$105.25** |
| Team | $349.00 | $10.42 | $338.58 | $30.00 (300 briefs) | **$308.58** |

### Minimum conversions to close the gap — first revenue month

| Target | Gap to close | Solo only | Pro only | Minimum mixed |
|---|---:|---|---|---|
| September launch, break even | $192 | 4 Solo | 2 Pro | 2 Pro ($210) |
| October launch, break even | $268 | 5 Solo | 3 Pro | 3 Solo + 1 Pro ($267) |
| First $500 reinvestment buffer | $500 | 10 Solo | 5 Pro | 2 Pro + 3 Solo |
| Self-sustaining (opex + buffer) | ~$956 | 18 Solo | 10 Pro | 4 Pro + 6 Solo |

**The gap is now a 5-conversion problem, not a capital problem.** Five Solo accounts at $59 generate $270 in gross profit in the first month of paid launch, clearing the entire $192 pre-launch deficit with a small buffer. Finance's job is now to protect the conditions that make those 5 conversions happen — not to find capital to bridge the gap.

### Month-by-month cash waterfall — October launch, $0 start

| Month | Accounts | Net MRR | Gross profit | EBITDA | Cumulative cash |
|---|---:|---:|---:|---:|---:|
| Aug-26 | 0 | $0 | $0 | −$136 | **−$136** |
| Sep-26 | 0 | $0 | $0 | −$56 | **−$192** |
| Oct-26 | 5 | $285 | $270 | +$194 | **+$2** |
| Nov-26 | 15 | $1,166 | $1,094 | +$1,018 | **+$1,020** |
| Dec-26 | 35 | $2,862 | $2,710 | +$2,634 | **+$3,654** |
| Jan-27 | 60 | $5,095 | $4,832 | +$4,756 | **+$8,410** |

Cash turns positive in October with 5 accounts. Surplus grows rapidly through Q1 2027 as the subscriber base scales and fixed costs remain flat.

### September launch alternate (if Aug 10 checkpoint clears)

| Month | Accounts | Gross profit | Cumulative cash |
|---|---:|---:|---:|
| Aug-26 | 0 | $0 | **−$136** |
| Sep-26 | 8 | $360 | **+$148** |
| Oct-26 | 20 | $957 | **+$1,029** |

September launch with 8 accounts clears the deficit in its first revenue month and generates a $148 buffer. The September path is financially superior in every dimension — it accelerates positive cash by one month and reduces total pre-revenue exposure by $56.

---

## 4. Beta Funnel Recommendations (Zero Spend)

Finance is not prescribing product decisions. These are revenue-path observations ordered by impact on first-dollar timing. Development owns implementation.

**Wire the email capture backend immediately.** Every signup sitting in a disconnected form is a potential paid account being lost. Until the backend is live, Finance cannot measure conversion, cannot model the funnel, and cannot assess whether the Sep or Oct launch path is viable. This is the single highest-priority operational task. Zero spend. ~1–2 days of Development time.

**Set up a transactional email sequence on Resend free tier.** A signup who receives nothing after joining will not convert. Three emails — confirm, value demo at brief #3, trial-ending prompt — will materially increase conversion rate. Resend's free tier (3,000 emails/month) is sufficient for all of beta and early launch. Zero spend.

**Reduce trial brief count from 10 to 5–7.** Ten briefs may exhaust free-tier API limits at small user counts, delays the conversion moment to peak engagement, and may under-price the urgency to convert. Five briefs is enough to demonstrate value. Fewer briefs also extends free-tier API runway before first revenue is available to cover API costs.

**Trigger the conversion prompt at brief #4, not at day 30.** Usage-based urgency (4 of 5 briefs used) fires at the moment of highest engagement and product value realization. A 30-day timer fires at an arbitrary calendar date with no relationship to value experienced.

**Rob personally contacts the first 10–20 signups.** No spend. No marketing budget needed. The first 5 paid accounts are almost certainly going to come from Rob's direct outreach, not organic funnel conversion. That is how software sells before it has a marketing machine.

**Founding member offer (optional — requires Founder approval):** At $49/month Solo, founding members give up $10/month vs. $59 list price but receive a permanently locked rate. Five founding members generate $220 in monthly gross profit — enough to close the $192 gap. Finance supports this as a limited, expiring offer capped at 25 accounts, explicitly labeled as a founding rate, and not extendable without a formal pricing decision. This needs a Founder decision before offering it to any prospect.

---

## 5. What Is Genuinely Blocked Without Spend vs. Assumed to Need Spend

### Genuinely blocked at paid-user scale (not during beta)

**AI inference (Claude API production tier).** Free-tier API limits will be reached once active beta users are running briefs at volume. This is not a barrier during early beta — 100 total briefs across 10–20 trial users is well within free limits. It becomes a cash-in-advance requirement at launch if first month's revenue is not available to cover it. Finance recommendation: track cumulative brief count during beta, plan to load the first month's revenue into API credits within the first week of paid launch.

**Web research (Tavily or equivalent).** 1,000 free searches per month works for beta. At 5 paid users × 30 briefs × variable calls per brief, it will be consumed. Same resolution as above — free tier bridges to first revenue.

**OCR and image processing** (if used in brief generation). Finance cannot assess this without Development confirming which services are in the brief stack and what their free-tier limits are. Finance flags this as an open question for Development.

### Not blocked — available on free tiers with no spend

| Item | Free tier | Notes |
|---|---|---|
| Vercel hosting | $0 — confirmed | bobert.ai live July 27 |
| Stripe billing | $0 upfront | 2.9% + $0.30 deducted from each charge |
| Supabase / database | $0 — 500MB, 2 projects | Covers auth, DB, storage through early launch |
| Resend (transactional email) | $0 — 3,000/mo | Signup confirm, trial drip, conversion prompt |
| Sentry (error monitoring) | $0 — 5K errors/mo | More than enough for beta |
| PostHog (product analytics) | $0 — 1M events/mo | Install before first beta user |
| RevenueCat | $0 — deferred | Not needed until mobile subscriptions |
| Apple Developer | $0 — deferred | Not needed until TestFlight active |
| HubSpot CRM | $0 — free tier | Covers beta and early pipeline |
| Contractor | $0 — D012 | No contractor until a defined technical trigger |

**Finance conclusion on spend before first revenue:** The only confirmed cash requirement before first revenue is $80 (domain, already committed July 27) plus $56/mo recurring (AI tools $50 + workspace $6), with the $50/mo subject to confirmation of whether it is already covered by CBMC. The model does not require outside capital, a credit card, a business bank account with a balance, or a contractor — all of which can be established using first-month revenue.

---

## 6. Open Questions for Founder (in priority order)

1. **Are Rob's AI dev tools (Claude, Cursor) already covered by CBMC?** If yes, Bobert's recurring cash burn before first revenue is $6/mo, not $56/mo. This changes the minimum conversion count from 5 to essentially 2.

2. **Founding member offer ($49 Solo, capped at 25 accounts)?** Finance can model this as a decision scenario if Rob wants to evaluate. Needs a yes/no before any prospect conversations include pricing.

3. **August 10–12 go/hold checkpoint for September launch.** Rob needs to set the date and confirm he will review all six criteria on that date.

4. **PostHog or equivalent analytics — install now.** Finance cannot update the model with real conversion data if there is no product analytics in place. This is a Development ask, zero spend.

---

## 7. Finance Position as of July 27, 2026

The business does not need capital to launch. It needs 3–5 paid conversions in the first month of paid operation. The conditions to achieve that are:

1. Email capture wired and signups being nurtured (Development task, not done)
2. Stripe billing live and tested (Development task, not done)
3. Aug 10–12 checkpoint reviewed and Sep/Oct decision made (Founder + Development)
4. Rob personally outreaching to the first 10–20 signups (no dependency)

Everything else — the model, the scenarios, the tier economics, the funnel math — is Finance's contribution to making those 3–5 conversions land. Finance will update the model as soon as real signup and usage data is available.

---

## 8. Version Control

| Version | Date | Change | Owner |
|---|---|---|---|
| v1.0 | Prior | Initial projected budget, $5K starting cash | Finance |
| v1.1 | July 27, 2026 | Domain $80 confirmed, Apple $0, Vercel $0, RevenueCat $0, 100% web | Finance |
| v1.1 Revenue Mandate | July 27, 2026 | $0 starting cash (D012), $0 contractor (D012), revenue-first path (D013) | Finance / Rob Thomson |

Prior versions retained. This document supersedes the starting-cash and contractor assumptions in FINANCE-STATUS-JULY20.md and becomes the operative Finance position until the first real signup or usage number changes the inputs.
