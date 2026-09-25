# Bobert Sales OS — Architecture

**Status:** Foundation
**Purpose:** Bobert is Rob's personal sales operating system. It is not a replacement for NetSuite, HubSpot, Apollo, email, or the existing Bobert intelligence modules. It is the orchestration and memory layer that makes those tools work together without forcing Rob to repeat work.

## North Star

**Find the right business. Understand the opportunity. Know what to do next. Execute with evidence. Remember everything.**

Core loop:

`Evidence → Intelligence → Strategy → Action → Outcome → Memory`

Product principle:

**Bobert remembers. AI reasons. Rob decides.**

## System boundaries

### Bobert owns

- Persistent sales memory
- Account and contact intelligence
- Evidence and source provenance
- Sales workflow and stage context
- Research orchestration
- Account prioritization
- Next Best Action
- Email drafting and response context
- Send + Log workflow
- Activity and outcome capture
- Personal sales methodology and rules
- Cross-tool orchestration

### Existing Bobert modules remain

- Market Intelligence
- Field Intelligence
- Project Intake
- Technical Intelligence
- Existing business, marketing, finance, and project documentation

These modules are preserved and incorporated over time. Do not delete or rewrite them simply to create the Sales OS.

### External systems remain systems of record where appropriate

- **HubSpot:** current CRM and relationship/activity store available to the personal Sales OS
- **Apollo:** contact discovery/enrichment source
- **NetSuite:** corporate operating/quoting/ERP system; intentionally outside the personal OS write path
- **Email/calendar:** execution and activity sources

The architecture must remain provider-agnostic so an AI provider or external platform can be changed without losing Bobert's memory or workflow.

## The Account Workbench

The primary screen is an account-centered workspace, not a generic chatbot.

An account should expose:

1. Identity — verified company/entity information
2. People — contacts, roles, relationship status
3. Evidence — URLs, articles, screenshots, documents, notes, dates
4. Intelligence — what the evidence means
5. Opportunity — why the account matters
6. Strategy — current pursuit approach
7. Activity — calls, emails, meetings, responses
8. Next Best Action — the single most useful next move
9. Draft / Execute — communication and action tools
10. Memory — durable facts, lessons, and decisions

## Truth model

Every important assertion should have one of these states:

- **FACT:** directly supported by captured evidence
- **INFERENCE:** reasoned conclusion derived from facts
- **HYPOTHESIS:** plausible but unverified
- **UNKNOWN:** information not established
- **SUPERSEDED:** previously believed information replaced by newer evidence

Never present an inference or hypothesis as a fact in outbound communication.

Evidence should retain source, capture date, source type, and the account/contact/project it supports.

## AI architecture

AI is an interchangeable reasoning layer, not the database.

Bobert should be able to route work to available models based on task, cost, speed, capability, or user preference. The model should receive only the context required for the task from Bobert's persistent memory.

This reduces repeated prompting and prevents the AI provider's chat history from becoming the only place where sales knowledge exists.

## Automation philosophy

Start with:

**AI recommends → Rob approves → Bobert executes/logs → Bobert remembers.**

Increase autonomy only after the workflow is reliable and auditable.

## First automation target

The repeated email workflow:

`Incoming reply → identify account/contact → retrieve thread + strategy + facts → draft response → Rob approves/sends → one-click Send + Log → update activity → set next action → store outcome`

The objective is to eliminate repetitive administrative work without eliminating Rob's judgment.

## Design test

For every proposed feature ask:

> Does this help Rob spend more time getting business and less time moving information between systems?

If not, it is not a priority.
