# Bobert — Personal Sales Operating System

**Status:** Foundation architecture
**Date:** 2026-08-27
**Branch:** `sales-os-foundation`

## Purpose

Bobert becomes Rob's persistent personal sales operating system.

The goal is not to replace HubSpot, NetSuite, Claude, ChatGPT, email, or the company's operating systems. The goal is to give Rob one durable workspace that remembers the work, preserves the workflow, reduces repeated prompting, and turns AI into an intelligence engine rather than the place where business memory lives.

## Core Principle

**Bobert remembers. AI reasons. Rob decides.**

Persistent business knowledge, account history, contact history, research, sales rules, activity, outputs, and workflow state belong in Bobert.

AI providers are interchangeable reasoning services. Claude may be the primary engine today; OpenAI or another provider can be added without rebuilding the operating system.

## Current Operating Boundary

### In scope

- Rob's personal sales workflow
- Account and contact intelligence
- Market research and growth signals
- Prospect qualification and scoring
- Outreach preparation
- Call preparation
- Follow-up queue
- Activity/history capture
- Sales-manager pacing and pipeline diversification
- Reusable sales rules and prompt logic
- HubSpot as the current CRM system of record for CRM fields/activity where appropriate
- Structured output for downstream LPA CSI processes
- Project/job intelligence when a real opportunity enters the workflow

### Explicitly outside the first build

- NetSuite write-back or integration
- Replacing LPA CSI's corporate operating system
- Automated outbound sending without Rob's approval
- Full drawing-counting/estimating engine
- Full lighting design engine
- Public SaaS product requirements
- Billing/subscription work

## The User Experience

Bobert should open as a sales cockpit, not as a collection of disconnected AI tools.

Rob can enter a company, contact, project, task, or question and Bobert determines what existing information is available before invoking AI.

Example:

> Rob Thompson Incorporated

Bobert should surface:

1. Existing company record
2. Existing contacts
3. Prior research and source dates
4. Prior outreach and outcomes
5. Current opportunity/status
6. Market Signal Score
7. Open tasks and next action
8. Relevant sales rules
9. Recommended next move
10. AI research only for the information that is missing or stale

## Architecture

```text
                         BOBERT
              Persistent Sales Workspace

   ┌─────────────────────────────────────────────┐
   │             EXPERIENCE / UI                 │
   │ Dashboard | Account | Contact | Research    │
   │ Outreach | Calls | Projects | Daily Queue   │
   └──────────────────────┬──────────────────────┘
                          │
   ┌──────────────────────▼──────────────────────┐
   │           PERSISTENT KNOWLEDGE               │
   │ Companies | Contacts | Projects | Activities│
   │ Research | Sources | Outcomes | Rules       │
   │ Prompts | Decisions | Documents | History   │
   └──────────────────────┬──────────────────────┘
                          │
   ┌──────────────────────▼──────────────────────┐
   │             WORKFLOW ENGINE                 │
   │ Intake → Qualify → Research → Map →         │
   │ Outreach → Follow-up → Outcome → Nurture    │
   └──────────────────────┬──────────────────────┘
                          │
   ┌──────────────────────▼──────────────────────┐
   │               AI GATEWAY                    │
   │ Claude | OpenAI | Other Models              │
   │ Context selection | Prompting | Parsing      │
   │ Provider routing | Usage/cost telemetry     │
   └──────────────────────┬──────────────────────┘
                          │
        ┌─────────────────┼──────────────────┐
        ▼                 ▼                  ▼
     HubSpot           Web/Search        Documents
     current CRM       fresh signals      project files

        NetSuite remains outside this system.
```

## Persistent Data Model — First Pass

### Company

- name
- domain
- vertical
- account classification
- priority
- outbound priority
- Market Signal Score
- signal components
- current status
- next action
- outreach angle
- known business model
- scale
- geographic footprint
- growth trajectory
- construction/program signals
- procurement model
- last researched
- source history

### Contact

- name
- title
- company
- buying role
- email
- phone
- verification status
- source
- last contacted
- last response
- outreach outcome
- next outreach angle
- notes

### Research Record

Every material research action becomes a dated record rather than disappearing into an AI conversation.

- company/contact/project
- question asked
- findings
- source URLs
- source dates
- confidence
- created date
- AI provider/model
- human correction if applicable

### Activity

- call
- email
- response
- meeting
- referral
- research
- task
- outcome
- note

### Sales Rule

Rules extracted from Rob's working documents become structured, versioned knowledge.

Examples:

- confirm ownership before assuming decision-maker
- no flattery in cold prospecting
- first touch has one job
- don't fight what the prospect tells us
- don't invent contacts, projects, emails, or facts
- re-score when material information changes
- diversify long-cycle and short-cycle pipeline

### Prompt / Skill

Reusable AI instructions are stored once and referenced by workflow instead of repeatedly pasted into chats.

## Context Assembly

The key usage optimization is not simply choosing a cheaper model.

Before every AI request, Bobert assembles the smallest useful context package:

- relevant company record
- relevant contacts
- recent research
- applicable sales rules
- current task
- required output format

Do not send the entire Bobert history to the model.

This reduces repeated explanation, improves consistency, and makes provider usage measurable.

## AI Gateway

All model calls should eventually pass through one internal Bobert interface.

Conceptually:

```text
bobert.ai task
      ↓
context builder
      ↓
AI gateway
      ↓
selected provider/model
      ↓
structured result
      ↓
persist result + sources + usage
```

The first implementation can use Claude directly. The architecture should not hard-code the rest of Bobert to Claude-specific memory or UI behavior.

## Daily Operating Loop

### Morning — Hunt

Bobert prepares the highest-value work:

- accounts needing research
- contacts needing mapping
- new growth signals
- calls to make
- emails ready to send
- follow-ups due
- pipeline gaps by vertical

### During the day — Capture

Rob should be able to drop in:

- company name
- contact
- email response
- call note
- project
- screenshot
- document
- URL

Bobert converts the input into structured history and updates the appropriate record.

### Afternoon — Work the opportunities

When California/LPA CSI activity arrives, Bobert shifts from hunting to account/project support:

- prepare meeting context
- summarize project information
- identify missing information
- prepare questions
- organize handoff information
- format outputs for downstream teams

### End of day — Learn

Bobert records:

- what happened
- what changed
- what worked
- what failed
- what needs follow-up
- what should be researched next

## HubSpot Relationship

For the current phase, HubSpot remains connected to Bobert because Rob already owns and uses the subscription.

Bobert should eventually synchronize the minimum useful CRM information rather than blindly mirror everything.

Preferred pattern:

**Bobert = intelligence/workflow layer**

**HubSpot = CRM/activity destination**

**NetSuite = corporate operating system, untouched**

If HubSpot later becomes unnecessary, Bobert's persistent database should allow the CRM layer to be replaced without losing the intelligence/history layer.

## Project / Job Layer

When a prospect becomes a real project, Bobert can transition from sales intelligence to project intelligence.

The existing Project Intake work already provides the foundation for structured project information. The future workflow is:

**Account → Opportunity → Project Intake → Technical/Project Intelligence → Handoff**

The existing Project Intake output philosophy should be retained: structure the information first, then make it easy to export/copy into whatever corporate process is required.

## Existing Bobert Modules — Reframed

### Field Intelligence

Find the opportunity in the physical world.

### Market Intelligence

Understand the account, growth, construction activity, fit, timing, and opportunity.

### Sales Intelligence / Sales OS — NEW CORE

Remember the account, manage the relationship, pace the pipeline, prepare outreach, track outcomes, and coordinate the daily hunt.

### Project Intake

Turn a bid/project package into structured information.

### Technical Intelligence

Future layer for interpreting technical information and providing a second set of eyes. Existing R&D remains parked until the sales operating system is stable.

## Migration Strategy

Do not rebuild Bobert all at once.

### Phase 1 — Foundation

- preserve existing FI/MI/PI functionality
- establish persistent sales database/schema
- establish sales rules/skills library
- establish AI gateway abstraction
- establish account/contact/activity history
- create sales cockpit UI

### Phase 2 — HubSpot bridge

- import existing HubSpot exports
- match/merge company and contact records
- establish controlled synchronization
- capture outreach outcomes
- create activity history

### Phase 3 — Daily Sales Manager

- daily queue
- pipeline pacing
- vertical diversification alerts
- research queue
- follow-up queue
- next-best-action recommendations

### Phase 4 — Intelligence flywheel

- store research permanently
- avoid duplicate research
- detect stale information
- learn which signals/outreach angles produce responses
- improve recommendations from verified outcomes

### Phase 5 — Project bridge

- move qualified opportunities into Project Intake
- produce NetSuite-ready handoff formats without connecting to NetSuite
- preserve account/project history across the transition

## What Success Looks Like

Rob opens Bobert beside HubSpot and can work from one screen.

He does not have to remember which Claude conversation contains the company.

He does not have to explain the sales philosophy again.

He does not have to manually recreate research that already exists.

He does not have to rely on Claude's memory to preserve the business history.

He asks Bobert what to work on, picks an account, and hunts.

**The job is still sales. Bobert removes the administrative and repetitive work around it.**
