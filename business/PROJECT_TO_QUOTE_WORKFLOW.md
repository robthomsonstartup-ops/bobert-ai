# Bobert Project → Quote Workflow

## Purpose
When a project arrives, that event starts the Bobert workflow. The raw project package becomes the input to a verified quote-preparation record.

## Workflow
1. Project arrives: PDF drawings, specs, bid invite/RFP, addenda, emails, screenshots, BOM or other files.
2. Read everything page by page and preserve source/page evidence.
3. Extract project identity, owner/customer, GC, architect/designer, engineer/MEP, electrical contractor, contacts, dates and bid information.
4. Extract lighting scope: plans, reflected ceiling plans, fixture schedules, fixture tags/descriptions, quantities when supported, manufacturers/catalog information when supported, lamps/drivers/voltage/CCT when supported, controls, emergency/exit lighting, mounting/accessories, specifications, alternates/substitutions, and furnish/install responsibility.
5. Build quote readiness: show what is present, what is missing, and pricing blockers. Do not infer missing facts.
6. Create the quote-prep package: project facts, people/organizations, lighting evidence by page, fixture schedule evidence, readiness checklist, missing questions, recommended next action, page intelligence map, and exportable structured record.
7. Human verification turns questions into calls, emails, web research or document requests.
8. Pricing handoff begins when scope and quantities are sufficiently verified.

## Product principle
Bobert should not become another place where a salesperson manually re-enters information. The project package is the trigger. Bobert does the reading, organizing, evidence linking, gap identification and next-action preparation.

## Current MVP
`project-intake.html` performs local browser PDF/text extraction with PDF.js, classifies pages, identifies lighting evidence and fixture-schedule pages, extracts basic contacts and project facts, builds a quote-readiness checklist, and exports the project record as JSON.

The first version is deliberately deterministic and evidence-first. AI synthesis comes after the extraction contract is proven.

## Next build stages
### Stage 2 — Document extraction
- OCR for scanned drawings
- table and fixture schedule parsing
- page thumbnails / visual review
- revision and addenda comparison
- source citations attached to extracted fields

### Stage 3 — Lighting takeoff intelligence
- normalized fixture schema
- fixture tag → description → manufacturer → catalog number → quantity
- duplicate / alternate handling
- controls schedule extraction
- scope responsibility mapping

### Stage 4 — Quote engine
- pricing input sheet
- vendor/manufacturer matching
- quote request package
- BOM generation
- exceptions and substitutions
- freight / lead-time inputs

### Stage 5 — Sales OS connection
- link project to working account
- identify contacts and decision makers
- preserve project intelligence as account intelligence
- generate follow-up actions
- push verified records to external systems only after review
