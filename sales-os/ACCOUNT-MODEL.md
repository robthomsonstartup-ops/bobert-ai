# Bobert Sales OS — Account Model v0.1

The account is the primary operating object. CRM records are inputs; Bobert intelligence is the accumulated evidence and decisions around the account.

## Account
- identity: name, domain, industry, location, external IDs
- classification: Working, Prospect, Nurture, Hold, Customer/Legacy
- people: contacts and roles
- opportunities: known projects/deals
- signals: growth, construction, procurement, organizational changes
- facts: verified account-specific statements
- inferences: hypotheses derived from facts
- evidence: original emails, screenshots, URLs, documents, notes
- activities: calls, emails, meetings, research
- strategy: current account thesis and approach
- next_action: owner, action, due date, reason
- history: immutable record of meaningful changes

## Truth rules
1. Evidence is retained whenever practical.
2. A fact must point to supporting evidence.
3. Inference never silently becomes fact.
4. Conflicting identity or account matches are surfaced for review.
5. Cross-account patterns are stored as patterns, not copied into individual accounts without evidence.
6. AI recommendations are proposals until committed.

## Daily operating loop
FIND → UNDERSTAND → CONTACT → CAPTURE → LEARN → NEXT

## v0.1 scope
- import the 67 LPA CSI Working accounts
- display account intelligence
- capture evidence
- review AI extraction
- commit facts/inferences/activities
- generate next-action queue

Integrations remain downstream. Bobert owns the workflow and memory model first.
