# Bobert Technical Intelligence — R&D Concept

**Status:** Parked / R&D concept — not approved for build

**Date:** 2026-08-12

## Purpose

Capture the emerging concept of a potential fourth Bobert capability: **Technical Intelligence**.

This is intentionally a thinking/R&D document. It does **not** authorize implementation, schema changes, UI work, API work, or product commitments.

## Current Bobert architecture

Bobert currently has three distinct intelligence/workflow modules:

### 1. Field Intelligence

**Physical-world signal → public intelligence → lead**

A user can start with a photo/location/address or recognizable brand. Bobert researches publicly available information to identify the project/location, companies involved, relevant contacts, construction signals, and potential opportunity.

Field Intelligence is a lead-generation and research workflow. It does **not** generate construction drawings or infer a complete building design from a photograph.

### 2. Market Intelligence

**Market/company signal → researched opportunity**

Researches companies, projects, people, construction activity, market signals, fit, timing, priority, and potential reasons to engage.

### 3. Project Intake

**Bid opportunity → structured quote package**

Takes bid/RFP/project information and organizes the information needed to work the opportunity, including drawings, counts, fixture information, specifications, controls information, scope, bid details, missing items, and quote-related requirements so the information can feed the quoting workflow/Excel process.

## Proposed fourth capability: Technical Intelligence

### Working concept

**Technical information → understandable, reviewable, actionable intelligence**

The goal is not to replace professional designers, engineers, or existing lighting design/calculation software.

The goal is to help the person working the project understand sophisticated technical information that otherwise requires significant experience or repeated access to a specialist.

### Why this is being explored

Lighting is a particularly interesting first domain because it combines:

- mathematical calculations
- photometric data
- IES files
- manufacturer product data
- fixture schedules
- drawings
- specifications
- application requirements
- mounting heights
- spacing and uniformity
- controls
- standards/recommendations
- expert judgment

Much of the underlying information already exists. The potential gap is making that information **machine-readable, connected, understandable, and useful to people who work with lighting every day but are not necessarily lighting designers or engineers.**

## Potential lighting implementation

The first domain explored under Technical Intelligence would be **Lighting Intelligence**.

Potential inputs could eventually include:

- lighting plans/drawings
- fixture schedules
- fixture counts
- specifications
- cut sheets
- manufacturer product data
- IES files
- photometric reports
- project/application information
- mounting height
- spacing
- controls information
- applicable standards/recommendations
- validated expert review

Potential outputs could include:

- plain-English explanation of technical information
- fixture/application interpretation
- comparison of proposed fixture characteristics
- identification of missing technical information
- design-review flags
- spacing/uniformity review support
- photometric interpretation
- questions that should be escalated to a designer/engineer
- explanation of why something was flagged
- preliminary technical direction with clear confidence/provenance

## Important product boundary

Bobert should **not** initially attempt to become AGi32, DIALux, Revit, AutoCAD, or a replacement for a qualified lighting designer/engineer.

The preferred position is:

> **Bobert sits above existing technical tools and expertise, making technical information understandable and actionable.**

The system should distinguish between:

- known facts/data
- calculations
- standards/recommendations
- inference
- uncertainty
- expert judgment

Where professional design or engineering judgment is required, Bobert should surface the issue and provide the information needed for expert review rather than pretending certainty.

## The Scott / second-set-of-eyes use case

A particularly relevant workflow is design review.

An experienced lighting professional may look at a drawing and immediately notice:

- questionable spacing
- inconsistent fixture application
- potential uniformity issues
- distribution that may not fit the intended application
- unusual fixture changes
- missing information
- areas that deserve further review

The R&D question is:

> Can Bobert eventually recognize and explain the types of things an experienced reviewer would flag?

The objective is not to replace that expert. It is to give sales reps, project managers, and other day-to-day lighting professionals a useful **second set of eyes** and a better starting point for expert conversations.

## Relationship to Project Intake

Project Intake already establishes an important bridge into this concept.

Project Intake can identify/organize items such as:

- lighting drawings
- fixture schedules
- counts
- lighting specifications
- controls information
- BOM information
- approved manufacturers
- alternates/substitutions
- bid requirements
- missing project information
- items needing designer or quote review

Technical Intelligence would potentially operate on that structured project context rather than asking the user to start from scratch.

The conceptual progression is:

**Project Intake:** "Here is what is in the bid package."

**Technical Intelligence:** "Here is what the technical information means, what appears reasonable, what is missing, and what deserves another set of eyes."

## IES database concept

An early idea was to build an "IES recommendations database."

This should remain a research question rather than a product assumption.

The more promising long-term concept may be:

> **Bobert understands lighting.**

An IES/standards knowledge layer could be one source of that intelligence, alongside manufacturer data, photometry, drawings, specifications, application context, and validated expert decisions.

Before building anything, research is required into:

1. What IES standards and recommendations can legally/licensably be used.
2. What information can be derived independently from standards.
3. What manufacturer data can be obtained/licensed.
4. What public technical data is available.
5. Existing photometric/IES databases and tools.
6. Existing lighting design/calculation software and APIs.
7. Existing AI/lighting products and competitive gaps.
8. Liability and professional-practice boundaries.
9. What technical information can be reliably machine-read.
10. What the smallest useful user workflow would be.

## Long-term intelligence flywheel

The larger hypothesis is that Bobert can eventually capture validated technical judgment without exposing confidential project information.

**User work**

→ questions

→ comparisons

→ reviews

→ corrections

→ expert decisions

→ outcomes

→ structured technical knowledge

→ better future assistance

This supports three broader Bobert hypotheses:

### 1. One person gets the equivalent of a team

Bobert helps an individual operate with access to more research, workflow, and technical knowledge than they could personally maintain.

### 2. Expert judgment becomes machine-readable

The valuable asset is not just raw product data or standards. It is the relationships between application, technical characteristics, decisions, exceptions, and outcomes.

### 3. Collective intelligence grows from use

If appropriate permissions, privacy, provenance, and validation are established, generalized knowledge can improve as more professionals use the system.

## Strategic framing

Do not think of this initially as:

- an AI lighting designer
- an IES database
- a replacement for lighting design software
- a new CAD platform

Think of it as:

> **A technical intelligence layer that helps people understand and act on the technical information already surrounding their work.**

Lighting is the first domain worth investigating because Bobert already operates in lighting/electrical sales workflows and Project Intake naturally encounters the technical documents required for this type of intelligence.

## Research questions before any build

1. What is the single highest-value technical problem for a lighting sales rep or PM that Bobert could solve in 10 minutes or less?
2. Can a user provide an actual project package and receive useful technical interpretation without requiring a full lighting design engine?
3. Which parts of expert lighting judgment can be formalized reliably?
4. Which parts should remain explicitly human/expert review?
5. What data sources are legally usable and commercially sustainable?
6. What existing tools already solve portions of this problem?
7. Where is the gap between sophisticated lighting software and the people who use its outputs?
8. Can Technical Intelligence be designed as a reusable domain layer rather than a lighting-only architecture?

## Working architecture hypothesis

**Field Intelligence**

Find it.

↓

**Market Intelligence**

Understand the opportunity.

↓

**Project Intake**

Structure the bid/project.

↓

**Technical Intelligence**

Understand the technical work.

↓

**Expert Intelligence**

Capture validated decisions and judgment.

↓

**Collective Intelligence**

Make validated knowledge increasingly useful across future work.

## Current decision

**Park this concept. Do not build yet.**

Continue market research, competitive research, data/licensing research, and workflow discovery until a narrow, high-value first use case is identified.
