# Bobert Sales OS — Evidence, Identity & Truth Layer

**Status:** Foundation requirement
**Date:** 2026-08-27
**Branch:** `sales-os-foundation`

## Purpose

Bobert must never turn an ambiguous company name, contact, project, screenshot, article, or AI inference into an unqualified sales fact.

The system is being built to help Rob pursue real business. False identity, crossed-company information, invented contacts, stale project claims, or unsupported statements can directly damage a relationship.

## Core Rule

**Evidence before assertion.**

Bobert may infer, rank, recommend, and hypothesize. It must clearly distinguish those outputs from verified facts.

A fact used in external communication should be traceable to evidence.

## Identity Resolution

A name alone is not a sufficient identifier.

For every company or contact, Bobert should use multiple available identifiers such as:

- canonical company name
- company domain
- website
- address
- city/state/country
- phone
- email domain
- LinkedIn URL
- Apollo URL
- contact name
- contact title
- source-specific record ID

### Ambiguous identity

If multiple entities could match the input, Bobert must not silently merge them.

Instead:

> **Identity conflict — verification required**

The user can select the correct record or create a new one.

## Evidence Object

Every material fact or research finding should be able to reference one or more evidence records.

### Evidence types

- screenshot/image
- URL
- web page
- article
- email
- CRM record
- Apollo record
- LinkedIn record
- uploaded document
- user statement
- prior verified Bobert record
- external API result

### Evidence fields

- evidence ID
- related company/contact/project
- source type
- source URL when available
- captured image/file when available
- source name
- source date
- captured date
- extracted facts
- source text/quote where appropriate
- verification state
- expiration/staleness guidance
- created by
- AI provider/model if AI extracted the information

## Truth States

Bobert should use explicit states rather than one generic confidence number.

### VERIFIED

The evidence directly supports the statement and identity is resolved.

### CORROBORATED

Multiple independent sources support the statement.

### REPORTED

A source reports the statement, but Bobert has not independently verified it.

### INFERRED

AI or Bobert derives the statement from evidence. It is useful for strategy but should not be presented externally as established fact without verification.

### USER-STATED

Rob supplied the information. It is valuable context but should not automatically be treated as independently verified.

### UNVERIFIED

Potentially useful information exists but evidence is insufficient.

### STALE

The information may once have been supported but requires current verification before external use.

## External Communication Gate

Before Bobert places a factual claim into an outbound email, call script, meeting brief, or other external-facing output, it should evaluate each material factual claim.

The system should prefer:

1. VERIFIED
2. CORROBORATED
3. REPORTED with explicit attribution when appropriate

It should not silently convert INFERRED, USER-STATED, UNVERIFIED, or STALE information into a factual assertion.

If a claim is important but unsupported, Bobert should either:

- ask Rob to verify it,
- remove the claim,
- phrase it explicitly as a question/hypothesis, or
- cite the source when appropriate.

## Screenshot-First Capture

Screenshots are first-class evidence, not temporary working material.

A typical Apollo workflow should become:

```text
Apollo account/contact
      ↓
Screenshot / URL dropped into Bobert
      ↓
OCR / extraction
      ↓
Identity resolution
      ↓
Evidence record created
      ↓
Facts extracted and linked to evidence
      ↓
Rob confirms / corrects if needed
      ↓
Company/contact record updated
```

The original screenshot remains attached to preserve provenance.

## Notes and Articles

A note, article, or user-provided signal can materially change account strategy.

Bobert should capture it rather than burying it in a chat.

For example:

> Article indicates Wingstop is changing its development strategy.

The system stores:

- article
- source URL
- publication date
- extracted claim
- affected account
- verification state
- strategic interpretation

The strategic interpretation may be AI-generated, but the underlying article remains the evidence.

## Separation of Fact and Strategy

Bobert should maintain two distinct layers:

### FACT

What the evidence supports.

### STRATEGY

What Bobert recommends doing because of those facts.

Example:

**Fact:** A source reports 50 new locations planned.

**Inference:** This may indicate a meaningful rollout opportunity.

**Strategy:** Research the person responsible for national construction/development.

These must not be collapsed into one statement.

## Research Deduplication

Before spending AI/search usage, Bobert should search existing evidence and research history.

If the requested fact already exists and is sufficiently current, reuse it.

If it exists but is stale or contradicted, flag it for refresh.

This is a core mechanism for reducing repeated AI usage.

## Contradiction Handling

When sources disagree, Bobert should preserve both sources and surface the conflict.

Example:

> **Conflicting employee count**
>
> Apollo: 2,100
> Company source: 1,850
>
> Status: Needs verification

Never silently choose a number simply because one source looks convenient.

## Sales Memory

Bobert should remember not only facts, but why they were accepted, rejected, corrected, or acted upon.

Useful memory includes:

- Rob corrected an AI assumption
- contact confirmed or denied responsibility
- a source proved inaccurate
- an outreach angle generated a response
- a buyer role was incorrect
- a company identity was resolved after ambiguity

This allows the system to improve without turning every correction into another manual instruction.

## Design Principle

**The more important the external claim, the stronger the evidence requirement.**

Internal exploration can tolerate hypotheses.

External communication should not.

## First Implementation Target

The first usable evidence workflow should support:

1. Drop screenshot
2. Paste URL
3. Paste note/article
4. Identify company/contact
5. Extract structured facts
6. Show source/evidence
7. Save to Bobert
8. Mark verification state
9. Reuse that information in future research and outreach

This becomes a foundational service used by Market Intelligence, Sales Intelligence, Outreach, and eventually Project Intelligence.
