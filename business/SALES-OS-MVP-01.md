# Bobert Sales OS — MVP 01

**Status:** Build target
**Date:** 2026-08-27
**Branch:** `sales-os-foundation`

## Objective

Get Rob out of the repetitive Claude → copy/paste → HubSpot → "log it" loop as quickly as possible.

The first MVP is not a full CRM replacement. It is a personal sales workbench with persistent memory, evidence, AI assistance, and one-click execution.

## First Working Loop

```text
INPUT
  company / contact / screenshot / URL / email / note
        ↓
IDENTIFY
  resolve exact company/contact
        ↓
RECALL
  load existing Bobert knowledge first
        ↓
RESEARCH
  use AI/search only for missing or stale information
        ↓
RECOMMEND
  determine next best sales action
        ↓
DRAFT
  prepare email/call/research output
        ↓
APPROVE
  Rob reviews
        ↓
EXECUTE + LOG
  send / log / update / timestamp / preserve evidence
        ↓
REMEMBER
  store outcome and useful learning
```

## MVP Screens

### 1. Sales Home

- today's hunt
- follow-ups due
- accounts requiring research
- recent responses
- active opportunities
- recommended next actions

### 2. Account Workbench

- identity
- company summary
- contacts
- evidence
- research
- activities
- opportunity
- next action
- AI actions

### 3. Capture

Accept:

- company name
- contact name
- screenshot/image
- URL
- article
- note
- email text
- pasted conversation
- uploaded document

### 4. Outreach

- draft response
- factual-claim check
- edit
- send
- log
- update contact/account
- create next action

## MVP Data Objects

### Company

`id, canonical_name, domain, identifiers, vertical, status, priority, score, score_reasoning, next_action, created_at, updated_at`

### Contact

`id, company_id, name, title, email, phone, linkedin_url, source, verification_state, buying_role, last_contacted_at, next_action`

### Evidence

`id, entity_type, entity_id, source_type, source_url, file_reference, source_name, source_date, captured_at, verification_state, extracted_content, created_by, ai_metadata`

### Fact

`id, entity_type, entity_id, statement, truth_state, evidence_ids, valid_from, valid_until, created_at, updated_at`

### Research

`id, entity_type, entity_id, question, findings, evidence_ids, confidence, created_at, provider, model`

### Activity

`id, entity_type, entity_id, activity_type, direction, subject, body, occurred_at, source, outcome, next_action`

### Task

`id, entity_type, entity_id, task_type, description, due_at, priority, status, source`

### AI Run

`id, task_type, provider, model, input_tokens, output_tokens, estimated_cost, context_ids, result_id, created_at`

## AI Gateway Requirement

No page should directly depend on Claude-specific memory behavior.

Use an internal interface such as:

```text
runAI({
  task,
  context,
  provider,
  model,
  output_schema
})
```

The implementation may initially call one provider. The application should consume a normalized result.

## Context Budgeting

Before every AI call:

1. Resolve entity identity.
2. Retrieve relevant persistent records.
3. Retrieve only applicable rules.
4. Retrieve recent activities.
5. Retrieve required evidence.
6. Identify missing/stale information.
7. Send the minimum useful context.

Never send the entire account history by default.

## First Automation

### Send + Log

When Rob approves an email:

1. send email through the configured email connector
2. save exact outbound content
3. associate with contact
4. associate with company
5. timestamp activity
6. update last contacted
7. update conversation state
8. create/update next action
9. preserve any factual evidence used in the message

Rob should not have to type `sent. log it`.

## Safety Gates

- No automatic outbound send without explicit Rob approval in MVP.
- No automatic company merge when identity is ambiguous.
- No unsupported factual claims in external-facing drafts.
- No silent overwrite of contradictory evidence.
- No NetSuite integration in MVP.
- No deletion of existing Bobert modules during foundation work.

## Definition of Done

MVP 01 is successful when Rob can:

1. open Bobert
2. find an existing account
3. see what Bobert already knows
4. drop in a screenshot or URL
5. have missing intelligence researched
6. see evidence behind important facts
7. ask for the next best action
8. generate an email
9. approve it
10. execute and log it without a second manual CRM step
11. return later and see the complete history

The first objective is not visual polish.

**The first objective is removing repetitive work from Rob's sales day.**
