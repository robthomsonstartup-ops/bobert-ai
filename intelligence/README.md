# Bobert Intelligence Layer

## Purpose

The screenshot, email, URL, article, note, or document is an **entry point**, not the answer.

Bobert turns an incoming piece of evidence into a structured account intelligence record, then expands the record through research. The system must preserve the difference between what is directly supported, what is inferred, and what is still unknown.

## Core loop

`CAPTURE → IDENTIFY → EXTRACT → EXPAND → VERIFY → DECIDE → ACT → LEARN`

### 1. CAPTURE
Accept an image, pasted email, URL, article, note, document, or combination. Preserve the original evidence and source metadata.

### 2. IDENTIFY
Resolve the likely company, person, project, location, and source. Do not merge records solely because a name matches.

### 3. EXTRACT
Pull every useful field available from the input. Examples: name, title, email, phone, company, location, project, role, visible signals, dates, claims, and source links.

### 4. EXPAND
Research beyond the input. The input is a launch point for questions such as company scale, growth, active construction, projects, procurement structure, design/specification process, GC/EC relationships, and relevant people.

### 5. VERIFY
Every material claim receives an evidence trail. Conflicting sources remain visible rather than being silently reconciled. A claim may be `verified`, `supported`, `inferred`, `unknown`, or `conflicting`.

### 6. DECIDE
Bobert recommends the next useful action based on evidence and the user's sales workflow. Recommendations are not facts.

### 7. ACT
Generate the next email, call plan, research task, CRM activity, or follow-up. The user should be able to approve/execute with one action rather than re-entering the work.

### 8. LEARN
Capture the outcome. Replies, corrections, new contacts, buying-process discoveries, and successful/failed approaches become memory for the account and reusable market intelligence.

## Truth rules

1. Never manufacture a company, person, project, relationship, or buying process.
2. Never transfer a fact from one company to another because the pattern looks similar.
3. Every material claim must be traceable to evidence or explicitly labeled as inference.
4. A screenshot is evidence, not proof of facts outside the screenshot.
5. A research result is evidence for the claim it actually supports, not permission to generalize.
6. When sources disagree, mark the claim `conflicting` and show both sources.
7. Unknown is a valid state. Bobert should ask or research rather than guess.
8. Recommendations must identify the evidence that caused the recommendation.

## First-class input types

- `screenshot`
- `email`
- `url`
- `article`
- `note`
- `document`
- `manual_entry`

## First-class entities

- Account
- Contact
- Project
- Organization relationship
- Signal
- Claim
- Evidence
- Research question
- Action
- Outcome

## Confidence is not truth

Confidence describes how strongly the available evidence supports a claim. It must never turn an inference into a verified fact.

Example:

- Fact: `Kelvin Mullins is Senior Director, Construction at Burlington Stores.`
- Evidence: Apollo screenshot captured by Rob.
- Inference: `Kelvin may influence construction vendor decisions.`
- Unknown: `Who controls lighting specification?`
- Research question: `Determine whether Burlington's lighting specification is centralized or project/design-team driven.`

## MVP principle

Build the intelligence layer independently from external platform integrations. Apollo, HubSpot, email, web research, and future services are tools Bobert can use. They are not Bobert's operating system.

## Account workspace contract

The account workspace is the destination for durable intelligence. A capture should be able to become a reviewable record containing:

- account identity and identity confidence
- contacts and roles
- projects and locations
- claims with evidence
- signals with dates and evidence
- procurement / specification relationships
- open research questions
- recommended actions
- completed actions and outcomes
- corrections and lessons learned

The workspace should make it obvious which information is **known**, **supported**, **inferred**, **unknown**, or **conflicting**. It should never require the user to remember where a fact came from.
