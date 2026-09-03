# PI (Project Intake) — Status

**As of:** September 3, 2026
**This directory is now the working definition of PI.** It supersedes the
older `intake.html` / `api/intake.js` / `api/intake-ocr.js` /
`api/intake-url.js` approach at the repo root, which handled bid-invite
email and RFP text intake, not fixture-schedule-to-quote extraction.

## What this is

Formerly "Bobert Lighting Alternate Configurator," built and iterated in a
ChatGPT workspace (Apps SDK) under `rob.thomson.startup@gmail.com`. Moved
here to consolidate all Bobert product work into this repo per the
September 2026 identity/repo cleanup.

Core pipeline: project drawings → fixture facts (type, catalog #, count,
mounting narrative, tech spec) → structured, verified record → populated
quote, using the company's existing proposal workbook format unchanged.

## What's proven (Potbelly Sandwich Works pilot)

1. Read a project fixture schedule.
2. Established the specified fixture baseline.
3. Selected alternate manufacturers and products.
4. Configured catalog numbers using manufacturer evidence.
5. Added confirmed quantities.
6. Created an internal alternate-comparison BOM.
7. Populated a new copy of the company proposal workbook, preserving all
   existing formatting, formulas, tabs, and print settings.

See `docs/BD-HANDOFF.md` for the full narrative and the non-negotiable
rule that the company workbook is treated as an immutable master template.

## What's stress-tested but not yet fully wired

Valley Ford of Huron / CJI Construction — see `docs/data/`. Proved
CSV/tab-separated office-count import, quantity editing with source
retained, verified-alternate catalog entry, and blocking approval of an
alternate without a catalog number.

## Known gaps (not yet built)

- **Auth is ChatGPT-specific.** `app/chatgpt-auth.ts` depends on OpenAI's
  Apps SDK request headers (`oai-authenticated-user-email`, etc.) and only
  works when embedded in a ChatGPT session. To run standalone on
  `bobert.ai`/Vercel, this needs to be replaced with real auth — not a
  file copy, a rebuild of that layer.
- Projects and fixture rows have hosted database endpoints
  (`app/api/projects/`), but the UI isn't fully wired to them yet —
  decisions currently live in browser storage per user/device, not shared.
- Uploaded document storage exists on the backend but isn't fully exposed
  in the approved UI flow.
- A shared reusable-knowledge table exists but isn't being written to by
  approved decisions yet.
- Manufacturer catalog verification, pricing, and quote-template
  population are not automated end to end.

## Relationship to the old PI files

`intake.html`, `api/intake.js`, `api/intake-ocr.js`, `api/intake-url.js`
are left in place, unmodified, flagged with a superseded notice at the top
of each. Nothing is deleted until this new approach is verified end-to-end
against a real project and Rob signs off on retiring them.

## Accuracy rules (non-negotiable, carried over from the original spec)

- Never invent a quantity, catalog character, product option, price,
  source, or approval.
- Separate drawing truth from proposed alternates.
- Record the source and date for every quantity, catalog number, and
  price.
- Technical qualification occurs before commercial preference.
- Exceptions remain blocked until reviewed or explicitly retained as
  specified.
- A released quote line must pass source, requirements, catalog,
  quantity, pricing, and approval checks.
- Superseded information is retained for history rather than silently
  overwritten.
