# Bobert Sales OS — Capture Pipeline

## Objective

Turn the things Rob already does into structured, reusable sales intelligence without requiring manual CRM entry.

## Input types

1. Email reply / sent email
2. Apollo screenshot
3. LinkedIn/company screenshot
4. URL
5. Article / market signal
6. Document or project file
7. Freeform note / voice transcription
8. CRM activity import

## Processing pipeline

`Capture → Identify → Extract → Classify → Verify → Link → Recommend → Approve → Commit → Learn`

### Capture

Preserve the original input whenever possible. Never discard the source merely because structured fields were extracted.

### Identify

Resolve the company and person using multiple identifiers. Do not rely on a company name alone.

For contacts, prefer:
- email address
- company domain
- source URL
- existing account relationship
- title

Conflicts become review items instead of silent corrections.

### Extract

Pull out:
- people
- companies
- projects
- dates
- buying/procurement information
- market signals
- claims
- decisions
- commitments
- follow-up dates
- relationship changes

### Classify

Each extracted item receives a type such as:
- account fact
- contact fact
- project fact
- market signal
- activity
- strategy
- hypothesis
- unknown

### Verify

Attach provenance:
- source type
- source reference
- captured date
- supporting text/image/document
- confidence

Truth states:
- FACT
- INFERENCE
- HYPOTHESIS
- UNKNOWN
- SUPERSEDED

### Link

Associate extracted information with the correct account, contact, project, opportunity, and activity.

### Recommend

AI can propose:
- next best action
- account priority change
- contact correction
- research question
- follow-up timing
- email draft
- new market pattern

### Approve

Until reliability is established, Rob approves material changes and outbound communication.

### Commit

Approved changes are written to Bobert's persistent store and optionally synchronized to external systems such as HubSpot.

### Learn

Capture the result of the action so future recommendations can improve.

## Example: Austin Commercial email

Input: Brian Andrews replies that lighting is handled through electrical subcontractors and design teams specify.

Bobert should produce:

- Account: Austin Commercial
- Contact: Brian Andrews
- Contact correction: Brian, not Bernard, if supported by the email/signature and matching address
- Activity: email received
- Fact: lighting purchasing route described by Brian
- Fact: design team specification role described by Brian
- Evidence: original email
- Strategy implication: identify relevant EC relationships
- Follow-up: potential later conversation about centralized procurement, explicitly marked as a strategy hypothesis rather than a fact
- Market pattern candidate: GC → EC procurement / design specification pattern

The Austin-specific facts remain Austin-specific. A cross-account pattern must identify the supporting accounts and cannot be generalized from one reply alone.

## User experience target

Rob should be able to drop the source into Bobert and see a compact review card:

**WHAT I FOUND**

- Account
- Contact
- New facts
- New evidence
- Relationship change
- Suggested next action
- Questions / conflicts

Then:

**[Commit] [Edit] [Discard]**

The goal is not zero clicks. The goal is eliminating repetitive reconstruction and data entry while keeping Rob in control of consequential decisions.
