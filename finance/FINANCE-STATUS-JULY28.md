# FINANCE-STATUS-JULY28.md

**Company:** Bobert  
**Department:** Finance / FP&A  
**Date:** July 28, 2026  
**Owner:** Finance, with final budget approval reserved to Founder/CEO Rob Thomson  
**Status:** All Founder Decisions A–F closed. Model v1.1 Revenue Mandate issued. LLC formation is the only remaining launch blocker.  
**Supersedes:** FINANCE-STATUS-JULY20.md — do not use the July 20 document to resume Finance sessions.  
**Purpose:** Zero-context-loss handoff for future Finance sessions.

---

## 1. Executive Summary

Bobert is live. The product is deployed at bobert.ai on Vercel's free tier. Stripe Checkout is live in sandbox at bobert.ai/upgrade with all four tiers configured, a 30-day free trial, and webhooks active. The pricing page is live. End-to-end billing has been tested. The August 10–12 checkpoint is on track for a September paid-launch decision.

Finance completed a full session on July 27–28. All Founder Decisions A–F are closed. The model has been rebuilt under D012 (no outside capital, no contractor) and D013 (revenue-first mandate). The working model is now v1.1 Revenue Mandate.

**Current expected-case model — v1.1 Revenue Mandate:**

| Metric | Value |
|---|---:|
| Starting cash | $0 — D012 |
| Contractor contingency | $0 — D012 |
| Monthly recurring Bobert opex | $6/mo (Google Workspace only) |
| August startup cost | $86 (domain $80 + workspace $6) |
| Pre-revenue burn — Sep launch | $86 |
| Pre-revenue burn — Oct launch | $92 |
| Minimum paid conversions to break even | 2 Solo or 1 Professional |
| First charges target | October 2026 (after 30-day free trial) |
| First EBITDA-positive month | October 2026 (2+ accounts) |
| Year 1 revenue (expected case) | ~$94,575 (prior base; update when actuals available) |
| Month 12 MRR | $25,560 (301 accounts, expected case) |
| Month 12 ARR run-rate | $306,720 |
| Year 1 gross margin (est.) | ~79–82% (improves with web-first and zero AI tool cost) |
| AI dev tools (Bobert opex) | $0 — personal expense until banking + revenue live (D-F) |

---

## 2. Product and Billing State — as of July 28, 2026

| Item | Status |
|---|---|
| bobert.ai domain (Porkbun, $80/yr) | ✅ Live — confirmed July 27 |
| Vercel hosting | ✅ Free tier — live July 27 |
| Stripe Checkout — bobert.ai/upgrade | ✅ Sandbox live — July 28 |
| All 4 tiers configured | ✅ Solo $59 / Pro $119 / Team $349 / Enterprise $1,500 |
| 30-day free trial | ✅ Configured |
| Stripe webhooks | ✅ Active |
| End-to-end sandbox test | ✅ Complete |
| Pricing page | ✅ Live |
| Brand colors / logo | ✅ Per DECISION 009 |
| Email capture form (beta signups) | ✅ Live and wired to Brevo (/api/subscribe.js) — confirmed with a real test contact in Brevo Contacts, July 27 |
| Stripe live mode | 🟡 In progress — connecting to Rob's personal bank account per Decision 015, no longer blocked on LLC |
| Business bank account | N/A for now — using personal account until revenue funds LLC (Decision 015) |
| LLC formation | 🔴 Deferred — to be filed from first subscription revenue, not before (Decision 015) |
| Email signup backend / drip sequence | 🔴 Not yet built |

---

## 3. All Decisions — Complete Log

### Finance Governance Decisions (prior sessions)

**D001–D011** — See DECISIONS.md in repository. Finance has reviewed and accepted these. No substantive conflict identified.

### Decisions Closed July 27–28, 2026

**D012 — No outside capital / no discretionary spend / no contractor upfront**  
Effective July 27, 2026. Binding.  
- Starting cash: $0. No external funding.  
- Contractor contingency: removed entirely ($0).  
- All spend must be covered by revenue or a defined Founder contribution with CPA documentation.  
- Owner: Founder/CEO Rob Thomson.

**D013 — Revenue-first mandate**  
Effective July 27, 2026. Binding.  
- Fastest realistic path to first paid dollar through the beta funnel is the primary Finance objective.  
- Revenue generated is reinvested in the product. Not banked, not drawn.  
- Owner: Founder/CEO Rob Thomson.

**D-A — Starting cash: $0**  
Supersedes the $5,000 working assumption in FINANCE-STATUS-JULY20.md. No outside capital per D012.

**D-B — Contractor contingency: $0**  
Supersedes the $3,000 working assumption in FINANCE-STATUS-JULY20.md. Removed entirely per D012. Contractor triggers from the July 20 document remain valid — they define when a contractor conversation begins, not an approved budget.

**D-C — Paid launch: October 2026 base / September 2026 alternate**  
October 2026 remains the conservative base. September 2026 is viable if all six August 10–12 checkpoint criteria are green. See Section 7 for the checkpoint framework.

**D-D — Banking: LLC formation triggers all subsequent steps**  
No business bank account until LLC is formed. Sequence: LLC formed → EIN issued → business checking opened → Stripe connected to live mode → first charges enabled. No revenue collected until this sequence is complete. First charges target: October 2026. Rob will operate the 30-day free trial period while the LLC is being formed.

**D-E / D014 — Expense approval thresholds**  
Approved July 28, 2026.

| Expense type | Approval required |
|---|---|
| Recurring software on approved opex list | Auto-approved within budget |
| New single expense under $50 | Rob notified within 24 hours |
| New single expense $50–$200 | Rob approval before payment |
| Any expense over $200 | Rob approval + Finance decision log entry |
| Any new recurring commitment (any amount) | Rob + Finance approval |
| Contractor, legal, or compliance spend | Rob + Finance approval regardless of amount |

**D-F — AI development tools: personal expense**  
All AI development tools (Claude, Cursor, and equivalents) are personal expenses paid by Rob. They are not Bobert operating expenses until: (1) business bank account is open and (2) first revenue has been received. Finance will update the model when the transfer is made. Estimated impact when transferred: +$50/mo Bobert opex.

---

## 4. Financial Model — v1.1 Revenue Mandate

### 4.1 Working files

| File | Status | Purpose |
|---|---|---|
| `Bobert_Projected_Budget_PnL_v1.1_RevenueMandate.xlsx` | Current working model | 5-tab workbook: Summary, Revenue Path, Monthly P&L, Spend Audit, Funnel Recs |
| `FINANCE-REVENUE-MANDATE-JULY27.md` | Current written plan | Revenue path, unit economics, funnel recs, spend audit — GitHub-ready |
| `FINANCE-STATUS-JULY28.md` | This document | Session-resumption handoff |
| `Bobert_Projected_Budget_PnL_v1.1.xlsx` | Superseded by Revenue Mandate version | Retain for reference |
| `FINANCE-STATUS-JULY20.md` | Superseded by this document | Do not use to resume Finance sessions |

### 4.2 Confirmed model inputs — v1.1

| Input | Value | Source |
|---|---|---|
| Domain — bobert.ai | $80/yr one-time (August 2026) | Confirmed — Porkbun — July 27 |
| Apple Developer | $0 | Deferred until mobile/TestFlight active |
| Vercel hosting | $0 | Confirmed — free tier — July 27 |
| RevenueCat | $0 | Deferred until mobile subscriptions launch |
| App Store commission (beta) | $0 | 100% direct web — confirmed |
| AI development tools | $0 Bobert cost | Personal expense — D-F |
| Google Workspace | $6/mo | Single user — Bobert opex |
| Accounting software | $0 until paid launch | ~$20/mo QuickBooks at launch |
| Contractor | $0 | D012 |
| Starting cash | $0 | D012 |
| Channel mix | 100% direct web | Web-only beta confirmed |
| Stripe fees | 2.9% + $0.30/transaction | Confirmed — stripe.com |

### 4.3 Pricing — confirmed in Stripe

| Tier | Monthly price | Gross profit/acct/mo | Notes |
|---|---:|---:|---|
| Solo | $59 | $53.99 | 30 briefs/mo est. |
| Professional | $119 | $105.25 | 100 briefs/mo est. |
| Team | $349 | $308.58 | 300 shared briefs, up to 5 users |
| Enterprise | $1,500 | Variable | Custom — placeholder |

Brief cost: ~$0.10 estimated. Must be replaced by telemetry before finalizing tier limits.

### 4.4 Pre-revenue cash burn (from $0)

| Launch scenario | August | September | Total burn before first charge |
|---|---:|---:|---:|
| September launch | $86 | $0 (trial month) | $86 |
| October launch | $86 | $6 | $92 |

**Minimum paid conversions to close the gap at first charge:**
- September launch: 2 Solo ($107.98 GP) or 1 Professional ($105.25 GP)
- October launch: 2 Solo ($107.98 GP) or 1 Professional ($105.25 GP)

### 4.5 Month-by-month cash waterfall — expected case, $0 start, October first charges

| Month | Accounts | EBITDA | Cumulative cash |
|---|---:|---:|---:|
| Aug-26 | 0 (beta) | −$86 | −$86 |
| Sep-26 | 0 (trial) | −$6 | −$92 |
| Oct-26 | 5 (first charges) | +$251 | +$159 |
| Nov-26 | 15 | +$1,062 | +$1,221 |
| Dec-26 | 35 | +$2,648 | +$3,869 |
| Jan-27 | 60 | +$4,762 | +$8,631 |

Cash turns positive in October with 2+ paid accounts. Self-sustaining from first revenue month.

---

## 5. What Is Estimated vs. Confirmed

| Item | Status | Action required |
|---|---|---|
| Domain $80 | ✅ Confirmed | None |
| Vercel $0 | ✅ Confirmed | None |
| Stripe fees 2.9% + $0.30 | ✅ Confirmed | None |
| All 4 tier prices | ✅ Confirmed in Stripe | None |
| AI tools $0 Bobert | ✅ Confirmed | Transfer trigger when banking + revenue live |
| Workspace $6/mo | ✅ Confirmed | None |
| Cost per brief ~$0.10 | ⚠️ Estimated | Replace with telemetry during beta |
| Trial brief allowance (10) | ⚠️ Estimated | Consider reducing to 5–7 — see Funnel Recs |
| Briefs per Solo (30/mo) | ⚠️ Estimated | Replace with beta usage data |
| Briefs per Pro (100/mo) | ⚠️ Estimated | Replace with beta usage data |
| Trial-to-paid conversion (20%) | ⚠️ Estimated | Replace with actual data post-beta |
| Monthly churn (5%) | ⚠️ Estimated | Replace with actual data post-launch |
| Month 12 accounts (301) | ⚠️ Projected | Track against actuals monthly |

---

## 6. Open Tasks and Blockers — as of July 28

### 6.1 LLC formation → banking → Stripe live (CRITICAL PATH)

**Task:** Form the Bobert LLC, obtain EIN, open business checking, connect Stripe live mode.

**Blocker:** Rob must initiate LLC formation. Indiana LLC filing fee ~$100. Typical processing: a few days to one week.

**Sequence:**
1. File LLC with Indiana Secretary of State
2. Obtain EIN from IRS (online, same day)
3. Open business checking account
4. Connect bank account to Stripe
5. Switch Stripe from sandbox to live mode
6. Collect first payment

**Target:** Complete before October 2026 first charges. September launch gives 30 days of trial runway to complete this while users are on free trials.

### 6.2 Wire the email capture backend

**Task:** Connect the beta signup form at bobert.ai to a backend (database + transactional email).

**Blocker:** Development task — zero spend. Recommended: Supabase (free tier) for storage + Resend (free tier, 3,000 emails/month) for transactional email. ~1–2 days of Development time.

**Why it matters:** Every signup sitting in a disconnected form is a potential paid customer being lost. The Aug 10–12 checkpoint requires measurable signup velocity — which is impossible to assess until the backend is live and signups are being captured.

### 6.3 Cost-per-brief telemetry

**Task:** Replace the $0.10 estimated cost with actual vendor usage data from beta.

**Blocker:** Requires Development to instrument each brief with a usage record (vendor, operation, units, cost, success/failure, processing time). See FINANCE-STATUS-JULY20.md §10 for the full telemetry specification.

**Why it matters:** Finance cannot protect gross margin or finalize tier brief limits without real cost data. This is the most important model input that remains estimated.

### 6.4 Annual pricing decision

**Task:** Approve monthly-to-annual discount structure.

**Current working annual prices** (approximately 2 months free):
- Solo: $590/yr (vs. $708 monthly × 12)
- Professional: $1,190/yr
- Team: $3,490/yr

**Finance position:** Do not finalize or offer annual pricing until at least one month of retention, conversion, and cash-flow data is available. The 25% discount (9-for-12) concept discussed previously conflicts with cash-flow needs at current subscriber counts — use 16.7% (10-for-12) as the working discount ceiling.

**Blocker:** Retention data. Do not offer annual pricing in beta without Finance review.

### 6.5 Accounting platform setup

**Task:** Open QuickBooks Online or equivalent when first revenue is received.

**Blocker:** LLC and banking must be established first. Finance recommends QuickBooks Simple Start (~$20/mo) at paid launch — already in the model as a launch-month opex trigger.

### 6.6 Monthly Finance reporting cadence

**Task:** Establish the first monthly Finance close and KPI review.

**Recommended timing:** After the first full month of paid subscriptions (November 2026 if October launch, October 2026 if September launch).

---

## 7. August 10–12 September Launch Checkpoint

Finance co-owns this checkpoint. All six criteria must be green to recommend pulling the launch forward to September.

| # | Criteria | Green threshold | Finance gate |
|---|---|---|---|
| 1 | Beta email signups by Aug 10 | ≥ 35 | Demand signal |
| 2 | Weekly signup run-rate (wk of Aug 11) | ≥ 15/week | Sustained momentum |
| 3 | Stripe live mode connected | Live and tested | Hard gate — no paid launch without this |
| 4 | Auth / security | No critical open issues | Dev confirmation required |
| 5 | Cost-per-brief — at least estimated | At least one tier measured | Finance gate |
| 6 | Founder confirms Go | Rob approves | Final gate |

**Finance decision rule:** Stripe live (criteria 3) is a non-negotiable hard gate regardless of signup count. If Stripe is not connected to live mode and tested by Aug 10, September launch does not proceed — period. All other criteria are weighted but not individually blocking.

**Note on criteria 3:** Stripe live mode requires the LLC and bank account (D-D). LLC formation must begin immediately if September launch is the target.

---

## 8. Revenue Path — Minimum Targets

### To close the pre-revenue cash gap at first charge

| Path | Accounts needed | By when |
|---|---|---|
| 2 Solo ($107.98 GP vs. $92 gap) | 2 | First charge month (Oct or Nov) |
| 1 Professional ($105.25 GP vs. $92 gap) | 1 | First charge month |
| First $500 reinvestment buffer | ~10 Solo or 5 Pro | Month 2 of paid launch |

### Beta funnel — zero-spend actions before Aug 10

Ordered by revenue impact:

1. Wire email capture backend (Development — highest priority, zero spend)
2. Set up transactional email sequence (Resend free tier — zero spend)
3. Reduce trial briefs from 10 to 5–7 (preserves API budget, creates conversion urgency)
4. Set conversion prompt at brief #4, not day 30
5. Rob personally contacts first 10–20 signups

---

## 9. Flags and Risks

**LLC timing risk:** September launch requires Stripe live mode, which requires a bank account, which requires LLC formation. If LLC formation is not started within the next few days, the September window closes on timeline alone. Finance recommends treating LLC formation as a task to complete this week.

**Cost-per-brief uncertainty:** The $0.10/brief estimate could be materially wrong. If actual cost is $0.25+/brief, Solo pricing at $59 with 30 briefs becomes a gross-margin problem. Telemetry during beta is the only fix.

**Email capture not wired:** The beta form is collecting signups into nowhere. Until the backend is live, Finance has no conversion pipeline to model and the Aug 10 checkpoint cannot be meaningfully assessed.

**Annual pricing risk:** Do not offer annual pricing commitments during beta. Any early-subscriber pricing promise made before Finance approves annual structure creates a deferred revenue and margin risk.

**Founder-capacity risk:** Rob is simultaneously Founder, developer, sales, product manager, and budget approver. The model is cash-efficient but accumulates unpaid operational risk. Track Founder hours. The contractor trigger list from the July 20 document remains the operative guide for when to involve outside help.

**No CPA or attorney engaged:** Entity formation, sales tax, revenue recognition, contractor classification, founder distributions, and enterprise contracts all require professional guidance. Finance is not a substitute. Engage a CPA before first revenue exceeds $1,000/mo or before any enterprise contract is signed.

---

## 10. Finance Session Resumption Checklist

A new Finance AI session must complete the following before any new work:

1. Read `FINANCE-STATUS-JULY28.md` (this document). Do not use the July 20 version.
2. Pull current `main` from GitHub and read `business/DECISIONS.md`.
3. Read `business/TEAM_SYNC.md`.
4. Confirm LLC formation status — has the LLC been filed? EIN obtained? Bank open? Stripe live?
5. Confirm email capture backend status — is the form wired?
6. Check whether the Aug 10–12 checkpoint has been completed and what the launch decision was.
7. Confirm whether September or October is now the operative launch date.
8. Review any new vendor costs or telemetry from beta usage.
9. Check for new BD pipeline, pricing requests, or customer commitments requiring Finance review.
10. Confirm the working budget version is `Bobert_Projected_Budget_PnL_v1.1_RevenueMandate.xlsx`.
11. Route all material budget changes to Finance and Founder before proceeding.

---

## 11. Current Finance Position — July 28, 2026

- The working financial model is v1.1 Revenue Mandate. All prior versions are superseded for decision-making purposes.
- All Founder Decisions A–F are closed. No open Finance decisions pending Founder action.
- The business requires $86–92 in pre-revenue cash — closable with 2 paid accounts in the first revenue month.
- LLC formation is the single most time-sensitive task. It is the trigger for banking, Stripe live mode, and revenue collection.
- The email capture backend is the second most time-sensitive task. The Aug 10–12 checkpoint is meaningless without signup data.
- Finance and the Founder remain the only budget approval authorities. No department may independently commit spending, promise pricing, or create recurring obligations.
- Cost-per-brief ($0.10) is the most important financial estimate that remains unvalidated. Replacing it with telemetry data is the highest-value Finance input Development can provide.
- The business is positioned to be self-funding from its first revenue month with 2 or more paid accounts. No outside capital is required.
