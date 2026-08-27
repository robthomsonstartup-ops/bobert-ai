# Bobert — Sales Operating System Architecture

**Status:** Working architecture — August 27, 2026

## Purpose

Bobert is evolving from a field intelligence app into Rob's personal sales operating system.

The goal is not to recreate HubSpot, Claude, ChatGPT, Apollo, Outlook, or NetSuite. Those are tools. Bobert owns the operating workflow, evidence, memory, intelligence, and decisions. External systems can plug into Bobert where useful.

NetSuite is intentionally outside the Bobert architecture. It remains the corporate operating system and downstream execution system where required.

## Core principle

**Capture once. Preserve the evidence. Let AI reason over it. Automate the repetitive work.**

Rob should not repeatedly copy information between systems just to keep the system current.

## The five layers

### 1. Accounts

The account is the primary commercial object.

Store:
- Company identity
- Website/domain
- Account type and market
- Locations / footprint
- Strategic priority
- Current opportunity status
- Known buying/procurement model
- Relationship state
- Open opportunities
- Contacts
- Signals
- Evidence
- Activities
- Next actions

### 2. People

Contacts belong to a specific account and must never be matched only by a loose name search.

Identity confidence should consider:
- Email address
- Company/domain
- Source URL
- Screenshot/source evidence
- Job title
- Existing account association

If evidence conflicts, flag it rather than silently guessing.

### 3. Evidence

Evidence is the system's statement of truth.

Supported evidence types:
- Email
- Screenshot
- URL
- Article
- Document
- User note
- CRM record
- AI-generated inference, explicitly labeled as inference

Every important market or contact claim should retain its source and date where available.

**Rule:** AI may infer, but inferred information cannot silently become fact.

### 4. Activities

Activities are the work Rob is actually doing every day, including work that historically disappears because it happens inside other tools.

Examples:
- Prospect researched
- Apollo profile reviewed
- Screenshot captured
- Email received
- Email sent
- Reply drafted
- Reply sent
- Contact corrected
- Account researched
- Signal discovered
- Quote requested
- Quote delivered
- Follow-up committed
- Call completed
- Meeting scheduled
- Buying process learned
- Procurement path learned
- New EC identified
- GC relationship developed
- Opportunity advanced or deprioritized

Activities should be captured with the least possible user effort.

### 5. Intelligence

AI operates over Accounts + People + Evidence + Activities to answer questions such as:

- What do we actually know about this company?
- Why is this account worth pursuing?
- Who appears to own lighting/specification/procurement?
- What changed since the last touch?
- What is the next logical action?
- What patterns are emerging across accounts?
- Which accounts resemble successful accounts?
- What should Rob do today?
- What information is missing before outreach?

## The interaction model

The primary interface should feel like a sales workbench, not a CRM data-entry form.

A user action should produce multiple outcomes when possible.

Example:

**User receives an email reply → attaches/pastes/sends the message to Bobert → Bobert extracts the contact, account, facts, relationship change, and next action → user reviews → one click records the activity and updates the account.**

Likewise:

**User finds a person in Apollo → screenshot or URL goes into Bobert → Bobert identifies the account/contact and stores the evidence → AI evaluates relevance → user chooses whether to create/update the contact.**

## One-click execution

Repeated actions should become explicit actions rather than instructions to the AI.

Examples:
- **Send & Log**
- **Save Intelligence**
- **Add Contact**
- **Update Account**
- **Set Next Step**
- **Mark Sent**
- **Create Follow-up**
- **Attach Evidence**

The user should not have to tell the AI to "log it" after every normal sales action.

## Relationship intelligence

A response is not merely an email record.

For example, an Austin Commercial reply stating that project teams purchase lighting through electrical subcontractors and design teams specify it should generate:

1. A verified account fact about the buying path.
2. The source email as evidence.
3. A contact activity showing the response.
4. A relationship state update.
5. A possible EC-targeting next action.
6. A market pattern candidate when similar evidence appears at other GCs.

The system should distinguish between:

**Account-specific truth** — what Austin Commercial told us.

**Cross-account pattern** — a pattern observed across Austin Commercial, Gilbane, RiseUp, etc.

**Hypothesis** — an idea worth testing, not yet established.

This prevents one company's response from becoming a false statement about another company.

## Strategic follow-up memory

Important strategic observations should survive the individual conversation.

Example pattern:

> GC routes lighting through ECs; design teams specify.

The system should remember:
- Which accounts support the pattern
- Which accounts contradict it
- When the pattern was observed
- What outreach strategy it suggests
- Whether the strategy has been tested
- Results from the test

A later follow-up can then be generated from the accumulated evidence rather than from a blank chat.

## What Bobert does NOT do

- It does not replace NetSuite's corporate operating functions.
- It does not require every activity to be manually entered.
- It does not treat AI inference as verified fact.
- It does not assume a company identity from a single keyword.
- It does not delete the existing Field Intelligence, Market Intelligence, Finance, Marketing, or other modules.
- It does not lock the architecture to the original local-only MVP assumptions.

Existing modules remain available for incorporation as the Sales OS expands.

## Initial build order

1. Sales OS shell / workbench
2. Account + contact foundation
3. Evidence ingestion (email, screenshot, URL, notes/documents)
4. Activity timeline
5. One-click actions, beginning with Send & Log / Save Intelligence
6. AI intelligence layer over stored evidence
7. Next-action engine
8. Pattern / market intelligence layer
9. HubSpot sync as an optional integration
10. Additional Apollo, Outlook, and other integrations as capabilities rather than architectural dependencies

## Success test

If Rob can work a normal sales day without repeatedly stopping to:
- copy/paste information into HubSpot,
- tell an AI to log something he just did,
- reconstruct what happened in an account,
- remember why an account matters,
- or wonder whether a claim is actually verified,

then Bobert is doing its job.
