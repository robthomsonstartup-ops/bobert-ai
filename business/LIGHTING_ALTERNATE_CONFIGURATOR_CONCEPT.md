# Bobert Lighting Alternate Configurator — Product Concept

**Recorded:** September 2, 2026  
**Owner:** Rob Thomson, Founder/CEO  
**Status:** Discovery concept only — saved for continuity and future evaluation  
**Build authorization:** None. This document does not add the feature to the active roadmap or modify a locked decision.

## 1. Concept in one sentence

Take an existing lighting project and its basis-of-design bill of material, let a lighting professional choose the manufacturers they want to quote, and help produce a source-backed alternate bill of material that preserves the fixture specification, application, and design intent.

## 2. Problem

Lighting salespeople regularly receive projects that are already designed. The task is not necessarily to redesign the lighting; it is to:

- read the fixture schedule and plans;
- understand each specified fixture and its application;
- identify appropriate alternate manufacturers and product families;
- configure complete alternate catalog numbers;
- preserve performance, mounting, controls, appearance, and design intent;
- assemble an alternate BOM;
- collect cut sheets and document every difference;
- prepare the package for pricing, review, and submittal.

This work is slow and repetitive. Product knowledge also varies by salesperson and office. One person may know ConTech well but rarely use Solais; another may have the opposite experience. Much of the organization's knowledge lives in individual people, old quotes, emails, and submittals.

A single catalog-number character or option error can cost thousands of dollars. The system must accelerate expert work without presenting guesses as orderable products.

## 3. Product definition

Working name: **Lighting Alternate Configurator**

This is:

- a guided product-discovery tool;
- a fixture cross-reference workspace;
- a manufacturer-specific catalog configurator;
- a shared record of previously reviewed and approved crosses;
- an extension of Bobert Project Intake and the Project-to-Quote workflow.

This is not:

- a universal inventory or price-book database;
- a replacement for lighting design software;
- an autonomous engineer or lighting designer;
- a guarantee that every manufacturer or fixture family is supported;
- a system that invents missing catalog characters;
- an automatic approval authority.

## 4. Core product promise

> Turn a verified basis-of-design lighting BOM into a source-backed alternate package faster, while keeping manufacturer selection and final approval with the lighting professional.

Valid outcomes are:

1. verified alternate;
2. proposed alternate requiring human review;
3. factory verification required;
4. RFI required because the design documents conflict;
5. no supported or acceptable cross found.

Refusing to guess is successful system behavior.

## 5. Relationship to the current Bobert workflow

The existing flow in `business/PROJECT_TO_QUOTE_WORKFLOW.md` establishes:

```text
Project arrives
→ Read and extract evidence
→ Confirm fixture schedule and quantities
→ Identify missing information
→ Prepare for quoting
```

The Lighting Alternate Configurator would begin only after the extracted basis-of-design fixture record is reviewed:

```text
Verified project intake
→ Basis-of-design BOM
→ Select alternate manufacturers
→ Discover valid product families
→ Configure proposed catalog numbers
→ Verify every option
→ Build alternate BOM
→ Export comparison / cut-sheet / quote package
```

## 6. Intended workflow

### Step 1 — Project intake

The user uploads available project material: drawing set, fixture schedule, lighting plans, specifications, existing BOM, addenda, basis-of-design cut sheets, or manufacturer submittals. Bobert extracts each fixture row with source and page evidence.

### Step 2 — Confirm the basis of design

Before crossing products, the user confirms or corrects:

- fixture tag and quantity;
- manufacturer and complete catalog number;
- fixture class and application;
- mounting, voltage, controls, and dimming;
- source, output, CCT, CRI, optic, and distribution;
- finish, ratings, listings, dimensions, accessories, and notes.

An unconfirmed or ambiguously read catalog number cannot advance as verified input.

### Step 3 — Build the specified BOM

Bobert creates the basis-of-design BOM from the schedule and, when a complete quote takeoff is requested, supporting plan information.

The product distinguishes:

- **Preliminary schedule BOM:** schedule quantities and explicitly listed accessories.
- **Complete quotation BOM:** quantities and system components verified against plans, including track, feeds, connectors, mounting, controls, emergency components, sensors, lamps, drivers, and accessories.

### Step 4 — Select manufacturer direction

The user can choose:

1. **Same-manufacturer update** — old/discontinued product to the manufacturer's current product.
2. **Selected alternate manufacturer** — for example, Solais to ConTech.
3. **Manufacturer package by category** — ConTech for track, Elite for downlights, RAB for panels, Cooper for emergency.
4. **Office-preferred alternates** — preferred manufacturers and previously approved office crosses.
5. **Open discovery** — documented comparable families across supported manufacturers.

The system suggests; the lighting professional selects.

### Step 5 — Preserve fixture identity before comparing details

The system first determines what the fixture is physically and functionally.

```text
IF specified fixture class != candidate fixture class
THEN reject the candidate before scoring or comparison
```

A high bay cannot cross to a downlight because lumen output or a partial catalog string appears similar. Fixture category, application, mounting, and system compatibility are gates, not weighted preferences.

```text
Fixture class
→ Application
→ Mounting / installation
→ Environment / listing
→ Voltage / controls
→ Distribution
→ Output and color
→ Physical size and appearance
→ Commercial considerations
```

### Step 6 — Discover alternate product families

Bobert converts the specified fixture into a normalized requirement profile and searches only within the chosen manufacturer's correct product category.

```json
{
  "fixture_class": "integrated_LED_track_head",
  "application": "menu_accent",
  "mounting": "track",
  "track_system": "single_circuit_120V",
  "voltage": "120V",
  "nominal_lumens": 1100,
  "beam_degrees": 25,
  "cct": "3000K",
  "cri_minimum": 80,
  "finish": "black",
  "dimming": ["forward_phase", "reverse_phase"],
  "location": "dry"
}
```

The user sees a short list of legitimate product families, product images, dimensions, key differences, and source documents.

### Step 7 — Configure the alternate

After the user selects a family, Bobert builds the proposed catalog number from the manufacturer's verified ordering grammar.

```text
Track prefix | Luminaire/output | Beam | CCT/CRI | Driver | Finish
CTL          | 84C2             | M    | 3C      | D      | B
```

The final number is assembled from allowed option values and combination rules. A language model must not type a final number from memory.

### Step 8 — Review differences

Do not reduce the decision to one blended score. Show exact results by requirement: exact, improved, acceptable difference, review required, failed requirement, or missing evidence.

**Mandatory gates**

- fixture class and critical application;
- mounting and physical integration;
- voltage and controls;
- environmental rating and required listing;
- emergency operation;
- critical dimensions.

**Performance comparison**

- delivered lumens and CBCP;
- beam angle and distribution;
- CCT, CRI, R9, and TM-30 where required;
- wattage, efficacy, dimming range, and IES comparison.

**Aesthetic and commercial review**

- fixture shape, footprint, finish, and visible driver/adapter;
- glare-control accessories;
- warranty, price, lead time, and factory preference.

### Step 9 — Verify and export

| Status | Meaning |
|---|---|
| Verified | Every catalog segment and combination is supported by current official rules or factory-confirmed data |
| Review | Strong proposed cross, but differences need professional judgment |
| Factory verification required | Published information cannot confirm orderability or a special option |
| RFI required | Basis-of-design documents conflict or omit a critical requirement |
| Unsupported | Manufacturer or family is not mapped |

Final outputs may include:

- basis-of-design and alternate BOMs;
- fixture-by-fixture comparison;
- catalog-number segment validation;
- exception/deviation report;
- official cut sheets, IES files, and revision dates;
- unresolved/RFI list;
- pricing-request spreadsheet;
- submittal-ready package.

## 7. Product data and cut-sheet access

The system does not need every possible SKU. It stores product-family rules that can generate many valid configurations.

Source priority:

1. manufacturer API or official configurator;
2. official manufacturer database/feed;
3. official current product page and cut sheet;
4. authorized rep portal or price file;
5. factory quote, order acknowledgment, or approved submittal;
6. user-uploaded manufacturer material;
7. third-party source only as a lead, never final verification when an official source is available.

When a schedule identifies a product, Bobert can search the official manufacturer domain, use a previously indexed record, check whether the source changed, accept historical cut-sheet uploads, or stop and request evidence.

## 8. Product-family rule model

Instead of storing millions of completed part numbers, store a versioned grammar for each supported family.

```json
{
  "manufacturer": "ConTech",
  "family": "CTL84C",
  "source_revision": "REV0123",
  "segment_order": [
    "track_system",
    "luminaire_output",
    "beam",
    "cct_cri",
    "driver",
    "finish"
  ],
  "allowed_values": {},
  "combination_rules": [],
  "performance_multipliers": [],
  "factory_review_triggers": []
}
```

Records support required/optional segments, valid and incompatible options, conditional availability, performance multipliers, accessories, consult-factory conditions, product status, and source/page/revision evidence.

## 9. Maintenance framework

Product documents and rules are effective-dated and never silently overwritten.

```text
Monitor official source
→ Detect changed page or PDF hash
→ Preserve old version
→ Flag affected product family
→ Compare changed ordering/performance sections
→ Human approves rule update
→ Publish new verified version
```

Historical records remain because new projects may specify old products.

- **Document verified:** configuration is supported by a current official ordering guide.
- **Factory verified:** complete number appears on a current factory quote, acknowledgment, approved submittal, or direct confirmation.

Factory verification is the strongest status.

## 10. Shared office knowledge

Each reviewed project can preserve:

- specified and alternate family;
- configuration and documented differences;
- reviewer and factory confirmation;
- approved or rejected outcome;
- application;
- accessories and ordering lessons.

```text
Basis-of-design track head → selected alternate family
Application: restaurant menu lighting
Result: approved
Difference: 28° alternate for specified 25° optic
Evidence: approved submittal / factory quote
```

A prior cross is a trusted starting point, not automatic approval for every project. Product-data evidence and office-experience evidence remain visibly distinct.

## 11. Anonymized discovery example

A restaurant fixture schedule contained:

- an integrated LED track head with a 25° optic, 3000K, approximately 1100 lumens, black finish, quantity 14;
- a similar track head with a 40° optic, quantity 18;
- track and accessories from a possible alternate manufacturer;
- separate PAR30 LED lamps listed alongside integrated-LED track heads.

Required system behaviors:

1. Decode basis-of-design ordering options.
2. Recognize the installed/scheduled track system.
3. Search the selected alternate manufacturer's LED track families.
4. Compare fixed and adjustable-beam options.
5. Flag the conflict between an integrated-LED fixture and a separately scheduled lamp.
6. Require human/RFI resolution rather than silently choosing which schedule column controls.
7. Build a proposed alternate number only after family selection.
8. Preserve deviations and source evidence.

No proposed alternate in this concept document is approved for quotation or ordering.

## 12. Recommended build approach

### Phase 0 — Validation

Use approximately 10 completed projects to measure fixture types, manufacturer repetition, existing crosses, catalog corrections, cut-sheet availability, factory-verification frequency, and research time.

### Phase 1 — Human-led configurator

The user confirms the specified fixture and selects both the alternate manufacturer and family. Bobert extracts ordering options, assists configuration, validates segments, and produces a comparison.

### Phase 2 — Guided manufacturer cross

The user selects the target manufacturer. Bobert proposes relevant families inside the correct fixture class. The user selects; Bobert configures and validates.

### Phase 3 — Office knowledge

Save approved/rejected crosses, factory verification, category preferences, and ordering lessons.

### Phase 4 — Controlled recommendations

Recommend families for well-supported categories while preserving mandatory gates and professional approval. Never infer unsupported order numbers.

## 13. Likely MVP boundary

A realistic initial MVP:

- fixture-schedule upload and confirmation;
- normalized fixture records;
- manual target-manufacturer and alternate-family selection;
- user-uploaded cut sheets;
- ordering-table extraction;
- catalog-segment builder;
- side-by-side comparison;
- preliminary alternate BOM;
- explicit verification status;
- Excel/JSON/PDF-ready export data.

It should not initially promise universal coverage, real-time price/inventory, engineer approval, full photometric redesign, or factory-confirmed orderability without factory evidence.

## 14. Key risks

- OCR changes catalog characters.
- Schedule descriptions conflict with numbers or lamp columns.
- Manufacturer documents change without clear revisions.
- Valid individual options form an invalid combination.
- Custom or rep-only suffixes are undocumented.
- Nominal and delivered performance are confused.
- Aesthetic similarity is overstated.
- Users mistake recommendation for verified orderability.
- Manufacturer content may require storage/reuse permission.
- Broad coverage creates false confidence before the library matures.

Primary mitigation: evidence links, hard fixture-class gates, versioned sources, explicit statuses, and refusal to guess.

## 15. Long-term opportunity

A lighting-professional workspace that converts project documents into a verified basis-of-design BOM, helps select and configure alternate manufacturers, and produces a quote/submittal package while building reusable institutional knowledge.

The defensible asset is the versioned, verified library of product-family rules, source documents, manufacturer compatibility, historical products, approved/rejected crosses, factory-confirmed numbers, and professional review decisions—not merely an AI search interface.

## 16. Open decisions before any build

1. Is this a Bobert Project Intake module, separate Bobert tool, or later standalone product?
2. Which 5–10 manufacturers and fixture categories form the best pilot?
3. Does Phase 1 begin with uploaded cut sheets only or limited official-site retrieval?
4. What evidence is required before a number receives Verified status?
5. How should manufacturer content licensing and retention be handled?
6. Which outputs are required first: alternate BOM, Excel quote sheet, comparison schedule, or submittal package?
