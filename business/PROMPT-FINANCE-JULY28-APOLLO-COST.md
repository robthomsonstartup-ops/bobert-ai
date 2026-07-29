# Finance Prompt — Apollo.io Cost Modeling
**Date:** July 28, 2026
**From:** Rob / Dev
**To:** Finance

---

## Context

Bobert's /capture feature uses Apollo.io for contact enrichment — when a rep photographs a job site, the app pulls real contact data (name, title, email, phone, LinkedIn) for the companies identified on the sign. This is a core part of the product value prop.

During beta, we're running on Apollo's free tier credits. Before beta closes and we move toward paid subscriptions, Finance needs to model Apollo's cost into the unit economics so we know what subscription price we need to cover it.

---

## What Finance needs to research

**1. Apollo.io pricing tiers**
- What does the free tier include (credits/month, export limits)?
- What are the paid tiers (Basic, Professional, Organization) — cost per seat or per credit?
- Is pricing per-contact-lookup or per-seat per-month?
- Are there volume discounts at scale?
- Source: apollo.io/pricing

**2. Estimate credit burn per active user**
- Assumption to model against: a field rep captures 3–10 opportunities per day in the field
- Each capture triggers 1 Apollo company lookup (returns up to 5 contacts)
- So: 3–10 Apollo credits/day per active user = ~90–300 credits/month per user
- Model low (3/day), mid (5/day), and high (10/day) scenarios

**3. Build into unit economics**
- Apollo cost per user per month (at each pricing tier)
- Add to existing COGS alongside: Groq (free), Tavily (~$0.01/search × 3 searches/capture), Google Vision API (first 1,000 units/month free, then ~$1.50/1,000)
- Total API cost per user per month at low/mid/high usage
- Required subscription price to maintain target gross margin (suggest modeling at 60%, 70%, 80% GM targets)

**4. Recommendation**
- At what user volume does free Apollo run out?
- Which Apollo tier makes sense at 50 users? 200 users? 500 users?
- Is there a break-even point where Apollo cost materially compresses margin?
- Should we consider alternatives (Hunter.io, Clearbit, Prospeo) at any scale point?

---

## Decision constraint

Per Decision 013: no discretionary API spend without Finance sign-off and Rob approval. Do not upgrade Apollo until this model is complete and reviewed.

Per Decision 018: if free Apollo credits run out before Finance review, enrichment pauses — do not auto-upgrade.

---

## Deliverable

A simple cost model (spreadsheet or doc) showing:
- Apollo cost/user/month at 3 usage tiers
- Total API COGS/user/month (Apollo + Tavily + Google Vision)
- Required subscription revenue per user to hit 60/70/80% gross margin
- Recommendation on Apollo tier timing (when to upgrade, triggered by what user count)

Bring to Rob before beta closes.
