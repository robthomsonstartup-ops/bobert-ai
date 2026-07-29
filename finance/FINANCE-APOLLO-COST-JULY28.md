# FINANCE-APOLLO-COST-JULY28.md

**Company:** Bobert  
**Department:** Finance  
**Date:** July 28, 2026  
**Triggered by:** PROMPT-FINANCE-JULY28-BRIEFING.md + PROMPT-FINANCE-JULY28-APOLLO-COST.md  
**Status:** Complete — Finance sign-off on enrichment cost model. Pending Rob's vendor decision.  
**Deliverable:** Bobert_Apollo_Cost_Model_July28.xlsx (see finance/ folder)

---

## 1. Critical Flag — Apollo TOS Violation

**This is the most important finding in this document.**

Apollo's standard pricing page states explicitly:

> "The plans shown on this page are permitted for internal business use only. Use of these plans to power external products, share data with customers, or resell Apollo data is not allowed under our standard terms. These use cases require a separate agreement with custom pricing and terms."

Bobert is using Apollo to pull contacts and deliver them to Bobert's users as part of the /capture brief. That is exactly the prohibited use case: powering an external product with Apollo data.

The current Apollo integration is operating outside of standard terms. This needs to be resolved before beta users go live — not before /capture is validated as working, but before the product is in the hands of any real user receiving Apollo-sourced contact data.

**Finance does not have authority to resolve this. This is a Founder decision.**

Two paths:

1. **Switch to a compliant alternative before launch.** Hunter.io and Prospeo.io both permit API integration in products. Developer switches the enrichment call. Zero timeline risk.

2. **Negotiate an Apollo Data Reseller agreement.** Apollo has a formal program for this. It requires contacting their partnership team, getting a trial key, signing an agreement. Timeline: 1–4 weeks. Pricing: custom (unknown). Finance cannot model this cost until a quote is received. This path blocks launch if it isn't completed before beta invites go out.

**Finance recommendation: switch to Hunter.io Starter now. Revisit Apollo Reseller after $10K MRR if data quality becomes a competitive advantage.**

---

## 2. Vendor Comparison

| Factor | Apollo Standard | Apollo Reseller | Hunter.io Starter | Prospeo Basic |
|---|---|---|---|---|
| Monthly base (Bobert pays) | $79+/mo | Custom | **$49/mo** | $39/mo |
| Credits/month | ~1,200 | Negotiated | **2,000** | 1,000 |
| Cost per email lookup | ~$0.066 | Unknown | **$0.025** | $0.039 |
| Phone numbers | ~$0.66 (10× credit) | Unknown | Not included | Not included |
| API access | Pro+ only | Yes | **All plans** | All plans |
| TOS: external product use | ❌ **Prohibited** | ✓ (with agreement) | **✓ Permitted** | ✓ Permitted |
| Time to activate | Immediate | 1–4 weeks | **Immediate** | Immediate |
| Finance risk | **HIGH** | Medium | **LOW** | Low |

**Winner: Hunter.io Starter at $49/mo.** 2× the credits of Prospeo at a similar price, API on all plans, no TOS risk, no timeline dependency.

---

## 3. Cost Per User Per Month — Email Enrichment

Usage levels:

| Level | Briefs/Month | Bobert Tier |
|---|---:|---|
| Low | 10 | Solo (casual) |
| Mid | 30 | Solo (typical) |
| High | 100 | Pro (typical) |
| Max | 300 | Team (5-seat combined) |

Enrichment cost per user per month (email only, 1 contact per brief):

| Vendor | $/credit | Low (10) | Mid (30) | High (100) | Max (300) |
|---|---:|---:|---:|---:|---:|
| Hunter Starter | $0.025 | $0.25 | $0.75 | $2.50 | $7.50 |
| Prospeo Basic | $0.039 | $0.39 | $1.17 | $3.90 | $11.70 |
| Apollo Standard ❌ | $0.066 | $0.66 | $1.98 | $6.60 | $19.80 |
| Apollo Reseller (est.) | $0.25 | $2.50 | $7.50 | $25.00 | $75.00 |

Note: Hunter Starter is a flat $49/mo subscription covering up to 2,000 credits. Bobert pays $49 regardless of whether 100 or 1,900 credits are used in a given month. Per-credit rate above reflects effective cost at full utilization.

---

## 4. Bobert Aggregate Monthly Cost — All Accounts

How much Bobert pays for enrichment each month, in aggregate, as accounts grow:

| Growth Stage | Account Mix | Total Briefs/Mo | Hunter Cost | Prospeo Cost |
|---|---|---:|---:|---:|
| Beta launch | 5 Solo + 2 Pro + 1 Team | 950 | **$49 (flat)** | $37.05 |
| Oct month 1 | 10 Solo + 5 Pro + 2 Team | 1,400 | **$49 (flat)** | $54.60 |
| Nov growth | 25 Solo + 12 Pro + 5 Team | 3,450 | **$113** (overage) | $134.55 |
| Jan 2027 target | 60 Solo + 25 Pro + 10 Team | 7,300 | **$179** (Growth plan) | $292.00 |

At Jan 2027 scale (~95 accounts), enrichment cost is approximately $179/mo on Hunter Growth ($149/mo plan). That represents roughly $1.88/account/month — negligible against a blended $100+ ARPU.

---

## 5. Updated Unit Economics

Prior model used $0.10/brief as total COR (AI inference). Contact enrichment is a separate, additive cost.

**With Hunter Starter at $0.025/brief:**

| Tier | Revenue | Stripe | AI COR | Enrichment COR | Gross Profit | GM% |
|---|---:|---:|---:|---:|---:|---:|
| Solo (30 briefs) | $59.00 | $2.01 | $3.00 | $0.75 | **$53.24** | **90.2%** |
| Professional (100 briefs) | $119.00 | $3.75 | $10.00 | $2.50 | **$102.75** | **86.3%** |
| Team (300 briefs) | $349.00 | $10.42 | $30.00 | $7.50 | **$301.08** | **86.3%** |

**With Apollo Reseller at $0.25/brief (estimated, if pursued later):**

| Tier | Revenue | Gross Profit | GM% |
|---|---:|---:|---:|
| Solo | $59.00 | $46.24 | **78.4%** |
| Professional | $119.00 | $80.25 | **67.4%** |
| Team | $349.00 | $233.58 | **66.9%** |

Both scenarios comfortably exceed the 60/70/80% GM targets at current pricing.

---

## 6. Minimum Price to Hit 60/70/80% Gross Margin

At Hunter pricing, what does Bobert need to charge to hit each GM target?

| Tier | Current Price | 60% GM Floor | 70% GM Floor | 80% GM Floor |
|---|---:|---:|---:|---:|
| Solo | $59 | **$9.91** | **$13.16** | **$18.97** |
| Professional | $119 | **$28.96** | **$38.48** | **$55.47** |
| Team | $349 | **$80.35** | **$106.78** | **$153.91** |

At Hunter pricing, current Bobert prices are 3–6× the minimum required for 80% gross margin. **Pricing is not a constraint. TOS compliance is the constraint.**

Even at Apollo Reseller estimated high-end ($0.50/brief), Solo needs to be priced at $29+ to hit 80% GM — still well under $59.

---

## 7. Finance Decision Log — Enrichment Cost

**D-ENRICH-01 (July 28, 2026): Apollo TOS Violation — Requires Founder Action**  
Apollo's standard plans are TOS-prohibited for Bobert's use case. Finance cannot sign off on any plan that uses Apollo standard plans to power /capture in production. Status: OPEN — awaiting Rob's vendor decision.

**D-ENRICH-02 (July 28, 2026): Finance Approves Hunter.io Starter**  
Hunter.io Starter at $49/mo is compliant, sufficient for beta and October launch scale, and within the operating model. Finance approves this as the recommended enrichment vendor. Status: APPROVED (pending Rob confirmation and Dev switch).

**D-ENRICH-03 (July 28, 2026): Budget Impact — Updated Burn**  
Pre-revenue monthly burn updated: $56/mo (existing) + $49/mo (Hunter) = $105/mo. Breakeven now requires 2 Solo conversions (gross profit $106.48) vs. 1 previously. Model updated. This does not materially change the launch math.

**D016 Addendum (July 28, 2026):** The Apollo TOS issue is a new gate condition under D016. Stripe does not go live until: (1) /capture is validated, (2) Finance signs off on cost model (complete — Hunter approved), AND (3) Apollo TOS issue is resolved (vendor switch or reseller agreement signed). Finance updates D016 gate to include item 3.

---

## 8. Open Items for Rob

1. **Apollo vs. Hunter decision:** Switch to Hunter now, or pursue Apollo Reseller agreement? Finance recommends switch. Dev can complete this quickly. If Rob wants to pursue Apollo Reseller in parallel, contact apollo.io/partners/api-reseller — but do not launch beta with Apollo standard plan in production.

2. **Hunter.io account setup:** Once Rob approves, Dev needs a Hunter.io API key. Starter plan at $49/mo. Rob or Dev registers at hunter.io.

3. **D016 gate 3 confirmation:** Once vendor switch is confirmed by Dev, Finance can update the D016 status log.

---

## 9. What This Clears for D016

When Rob decides on vendor and Dev makes the switch:

| Gate | Status |
|---|---|
| /capture MVP built and working | Dev to confirm |
| Finance signed off on cost model | ✅ **COMPLETE — this document** |
| Enrichment vendor TOS compliance | Pending Rob's vendor decision |
| LLC formed + banking open | Pending Rob |

Finance has done its part. Cost model is complete, vendor is identified, GM targets are protected at all realistic usage levels. D016 can lift when Dev confirms /capture works end-to-end with a compliant enrichment vendor.

---

## 10. Version Control

| Version | Date | Change |
|---|---|---|
| v1.0 | July 28, 2026 | Initial Apollo cost model. TOS violation flagged. Hunter recommended. |
