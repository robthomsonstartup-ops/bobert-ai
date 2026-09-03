# Bobert Sales OS — Build Roadmap

## Phase 0 — Foundation (now)

- Preserve all existing Bobert modules
- Establish Sales OS architecture and boundaries
- Define persistent memory model
- Define evidence / truth model
- Define account-centered workflow
- Keep NetSuite outside the personal OS write path
- Use HubSpot as the current CRM integration
- Keep AI providers interchangeable

## Phase 1 — Daily-driver MVP

Goal: make Bobert useful during a normal outbound day.

- Account Workbench
- Company/contact records
- Evidence capture from text, URL, screenshot, article, note, and document
- Account timeline
- Sales strategy / current objective
- Next Best Action
- Email drafting from account context
- Specific-subject-line rules
- Send + Log workflow
- Activity capture
- Follow-up scheduling
- Search across accumulated sales memory

Success test:

Rob can open an account, say what happened, and Bobert already knows the history without Rob rebuilding the context in a new Claude or ChatGPT conversation.

## Phase 2 — Intelligence engine

- Research orchestration
- Account scoring
- Growth / construction / rollout signals
- Contact discovery and enrichment through Apollo
- Evidence-backed market research
- Entity resolution so similarly named companies do not contaminate one another
- Source freshness and confidence
- Relationship mapping
- Opportunity hypotheses

## Phase 3 — Tool orchestration

- HubSpot two-way activity/account synchronization where appropriate
- Email integration
- Calendar integration
- Apollo integration
- Structured exports for PM / quoting teams
- Optional NetSuite-compatible output format without writing to NetSuite

## Phase 4 — Learning system

- Outcome tracking
- Response classification
- Win/loss learning
- Successful outreach pattern detection
- Account-specific strategy memory
- Personal sales methodology memory
- Feedback loop for improving recommendations

## Phase 5 — Higher autonomy

- Automated research refreshes
- Automated account monitoring
- Triggered next-action recommendations
- Approved autonomous logging
- Approved autonomous administrative actions
- Carefully scoped outbound automation

Autonomy must remain auditable and reversible.

## Later modules / preserved work

Existing Bobert work is not discarded. Field Intelligence, Project Intake, Market Intelligence, Technical Intelligence, finance, marketing, and other modules remain available for integration when they support the sales machine.

## Explicit non-goals for the first build

- Replacing NetSuite
- Rebuilding Apollo
- Rebuilding HubSpot as a generic CRM
- Generic AI chatbot as the primary interface
- Fancy forecasting before the core workflow works
- Autonomous outbound before evidence, memory, and logging are reliable
