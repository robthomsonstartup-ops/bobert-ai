# Bobert Lighting Alternate Configurator

## Business Development Handoff

**Owner:** Rob Thomson, Founder/CEO  
**Status:** Internal working pilot  
**Current baseline:** Potbelly Sandwich Works — Katy Hwy  
**Next validation project:** Valley Ford of Huron FS2.0  
**Product location:** Intended to operate within the Bobert platform at `bobert.ai`

## Purpose

Build a daily-use lighting tool that converts project drawings, fixture schedules, specifications, takeoffs, manufacturer documents, and human decisions into an accurate, review-ready alternate bill of material.

The tool must preserve the knowledge created by every project so the entire remote team benefits from work completed by any individual user.

> Upload project documents → establish drawing truth → add quantities → select and verify alternates → approve the BOM → export into the unchanged company proposal workbook.

## Problem Being Solved

Lighting alternates are currently assembled through repeated manual work:

- Reading fixture schedules and plans
- Finding current manufacturer documents
- Decoding long ordering strings
- Comparing products described differently by different manufacturers
- Counting fixtures or waiting for a takeoff
- Re-entering the same information into company spreadsheets
- Searching old quotes, emails, PDFs, and individual employee knowledge

One incorrect character in a catalog number can create a costly ordering mistake. The system must favor documented accuracy and human verification over unsupported AI inference.

## What Potbelly Proved

The Potbelly pilot completed the full workflow:

1. Read the project fixture schedule.
2. Established the specified fixture baseline.
3. Selected alternate manufacturers and products.
4. Configured catalog numbers using manufacturer evidence.
5. Added confirmed quantities.
6. Created an internal alternate-comparison BOM.
7. Populated a new copy of the company proposal workbook.
8. Preserved the company workbook's existing formatting, formulas, tabs, fonts, colors, borders, dimensions, and print settings.
9. Hid unused line-item rows so the proposal printed correctly without deleting or reformatting anything.

This proved that Bobert can populate the existing company process rather than forcing the company to adopt a replacement quote format.

## Non-Negotiable Company Excel Rule

The company workbook is an immutable master template.

The system may:

- Create a new project copy
- Write approved project information into specifically mapped cells
- Write approved fixture data into the permitted line-item cells
- Hide unused line-item rows in the populated copy
- Save the result under the project name

The system may not:

- Change fonts, colors, borders, shading, alignment, row heights, or column widths
- Insert or delete rows
- Rename, reorder, add, or remove worksheets
- Replace formulas
- Change pricing, margin, PM, invoice, or tracking sections
- Change logos, drawings, merged cells, validations, print areas, or page setup
- Modify the original master workbook

Every export must run a structural comparison and fail closed if any unauthorized workbook component changes.

## Ten-Stage Product Workflow

1. **Project intake** — Capture project name, location, customer/GC, scope, bid due date, bid platform, drawing date, package strategy, and quantity method.
2. **Drawing truth** — Extract the fixture schedule exactly as shown before recommending anything.
3. **Quantities** — Accept scheduled quantities, plan takeoff quantities, or manual quantities.
4. **Factory direction** — For each fixture type, keep specified, cross to a selected factory, update within the same factory, source separately, exclude, or research.
5. **Research** — Retrieve current manufacturer product pages, cut sheets, ordering guides, and documented replacement information.
6. **Configuration** — Decode the specified product and construct the proposed alternate catalog number.
7. **Review** — Require a human release gate and show evidence for every critical decision.
8. **Alternate BOM** — Produce the approved project bill of material and qualification language.
9. **Company Excel export** — Populate only authorized cells in a copied company workbook.
10. **Package** — Create the quote-ready workbook and, later, the combined cut-sheet/submittal package.

## Quantity Rules

Quantity is independent from the fixture schedule and must carry a source:

- **Schedule quantity** — Printed in the fixture schedule
- **Takeoff quantity** — Counted from the lighting plans
- **Manual quantity** — Entered and confirmed by a user

Missing quantity must remain blank. Bobert may not silently substitute `0`, `1`, or an AI estimate. Final quote export is blocked until every included line has a confirmed quantity.

## The Shared Intelligence Engine

The product becomes more valuable through normal team use. Users should not maintain a separate training database.

Each completed project should preserve reusable objects:

- Manufacturer
- Product family
- Complete manufacturer SKU
- Normalized lighting specifications
- Specified-to-alternate cross-reference
- Source document and revision date
- Reviewer and correction history
- Factory confirmation
- Project approval or rejection
- Quote, purchase, and repeat-use outcomes

Example knowledge chain:

`Specified product → decoded configuration → proposed alternate → documented differences → reviewer → factory confirmation → project outcome → purchase result`

When another user encounters the same product or a similar configuration, Bobert retrieves the existing company knowledge before starting new research.

## Confidence and Verification

An entered part number does not automatically become company truth.

| Status | Meaning |
|---|---|
| Unverified | Imported or AI-extracted |
| User reviewed | A user confirmed the entry |
| Second review | Another user independently confirmed it |
| Factory verified | Manufacturer or representative confirmed it |
| Project approved | Accepted for a specific project |
| Purchased | Successfully ordered |
| Proven | Approved or purchased repeatedly |
| Stale | Supporting document changed or aged out |

Project approval does not automatically establish universal equivalency. Historical records must remain versioned when source documents or products change.

## Normalized Lighting Data

Manufacturers use different names and catalog structures. Bobert converts them into a common comparison model, including:

- Fixture category and form factor
- Mounting
- Dimensions
- Voltage
- Wattage and lumen output
- CCT and CRI
- Optics or distribution
- Dimming and controls
- Finish
- Environmental rating and listings
- Emergency requirements
- Track type and accessory compatibility

Hard requirements must pass before an alternate can be ranked. A product that fails fixture category, mounting, electrical, listing, or other mandatory requirements is rejected rather than merely scored lower.

## Team Network Effect

With approximately 20 remote users, everyday activity creates the engine:

- A user corrects a catalog character.
- A factory confirms a configuration.
- A designer approves or rejects an alternate.
- A quote is exported.
- A product is purchased.
- A discontinued SKU is replaced.

Those actions strengthen or update the reusable knowledge record. Frequently used manufacturers develop deep company knowledge. A manufacturer used only once still retains a valuable long-tail record so the next employee does not start from zero.

The system may also identify internal subject-matter reviewers based on proven work history, while designated roles control who can mark information verified.

## Current Working Build

The internal pilot currently includes:

- Potbelly preloaded as the baseline project
- Ten-stage workflow display
- Searchable alternate BOM
- Fixture-by-fixture review panel
- Editable quantities
- Evidence and verification labels
- Review status controls
- Copyable BOM
- Downloadable quote BOM
- New-project intake based on the Valley Ford handoff
- Persistent project records
- Project switching
- Clean empty-project state for drawings and fixture extraction
- Database structure for projects, fixtures, documents, and reusable knowledge records

The current hosted pilot was created under Rob's former CBMC workspace. The next deployment should be created or transferred under an account/workspace associated with `robert.thomson@lpaenergygroup.com` and then connected to the Bobert GitHub source of truth.

## Next Validation Project: Valley Ford of Huron

**Project:** Valley Ford of Huron FS2.0  
**Location:** 1530 Berlin Road, Huron, OH 44839  
**Customer/GC:** CJI Construction  
**Scope:** New construction; approximately 33,000-square-foot showroom, service shop, and site development  
**Bid due:** September 16, 2026 at 4:00 PM ET  
**Bid platform:** Bid Planroom  
**Strategy:** Provide an alternate package rather than price the specified manufacturers  
**Quantity method:** Plan takeoff, with manual entry available when needed

Valley Ford is intended to stress-test:

- Larger fixture schedules
- Interior, exterior, showroom, service-shop, and site lighting
- Multiple manufacturers and product families
- Missing scheduled quantities
- Plan takeoffs
- Multiple alternate candidates
- Controls and emergency requirements
- Complicated catalog-number structures
- Outdoor performance and photometric requirements
- Final export into the unchanged company proposal workbook

## Required Next Development Work

1. Move or integrate the current configurator source into the Bobert GitHub repository.
2. Establish deployment ownership under Rob's current LPA-associated account/workspace.
3. Connect secure multi-user authentication and company roles.
4. Complete document upload storage for drawings, schedules, specs, cut sheets, factory quotes, and the company template.
5. Add drawing and fixture-schedule extraction with an approval screen.
6. Add fixture-row creation, editing, bulk import, and manual quantity entry.
7. Add takeoff workflow and quantity-source tracking.
8. Add manufacturer-document ingestion, dates, revisions, and source links.
9. Add normalized specification records and hard qualification gates.
10. Add catalog-number segment decoding and evidence tracking.
11. Add cross-reference recommendations based on prior company knowledge.
12. Add reviewer routing, corrections, status history, and audit trail.
13. Add Potbelly as the permanent automated baseline test case.
14. Add the protected company Excel population and structural validation service.
15. Run Valley Ford end to end and document every failure or manual intervention.
16. Add combined cut-sheet/submittal-package generation after the quote workflow is reliable.

## Success Measures

Track the following on Potbelly, Valley Ford, and future projects:

- Manual hours normally required
- Time required using Bobert
- Fixture types extracted correctly
- Quantities captured correctly by source
- Catalog numbers accepted without correction
- Corrections by reason
- Alternates approved or rejected
- Quote turnaround time
- Reused knowledge records
- Jobs quoted, won, and purchased
- Gross-profit opportunity supported

## Product Guardrails

- AI may extract, decode, compare, recommend, and format.
- AI may not silently guess an unsupported catalog number.
- Current manufacturer documentation is the preferred source.
- Every critical catalog segment must be traceable to evidence.
- Human approval remains the release gate.
- Pricing, customers, projects, and company preferences remain private to the company.
- Company-specific data must not train another customer's private system without explicit permission.
- Every edit and verification decision must retain history.
- Old projects remain historically accurate when products or documents later change.

## Business Development Direction

The immediate priority is building and validating the internal daily-use tool. Subscription packaging and external sales are intentionally deferred until the workflow proves accuracy, time savings, repeat use, and measurable company value across several real projects.

The long-term commercial model may serve lighting agencies, distributors, ESCOs, electrical contractors, and other lighting companies through private company intelligence environments. That discussion should remain secondary to completing the internal product and Valley Ford validation.

## Core Product Statement

> Bobert turns lighting project documents into review-ready alternate BOMs and preserves the knowledge created by every user, project, verification, approval, and purchase.

