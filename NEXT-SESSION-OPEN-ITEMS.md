# Next Session — Open Items (captured Aug 10, 2026, end of session)

## 1. URGENT — MI vertical definition is too narrow
**Finding:** Tested MI against Skims (a real LPA CSI account) — scored 0,
"does not fit." This is MI working *correctly* against its current
definition, but the definition itself is wrong: MI only scores against
Data Center / Distribution-Warehouse / Design-Build-GC / Electrical-MEP.
LPA CSI's actual scope is broader — lighting and design-assist supply to
commercial accounts globally, not limited to those four sub-sectors.

**Risk:** If sent to colleagues as-is, MI will give false "no fit" results
on real existing accounts. Needs fixing before wider testing.

**Not yet decided:** What the corrected vertical definition actually is.
Options to consider next session: broaden the sector list, switch to a
looser "any commercial account needing lighting/design-assist" model, or
add an "existing account" flag that bypasses vertical scoring entirely.

## 2. PI ecosystem expansion — described, not yet scoped or built
Four connected pieces, described by Rob at end of session:

1. **Deeper extraction for quotes team** — PI currently pulls scope/dates/
   gaps for an RFI checklist. Quotes team needs enough detail to start an
   actual takeoff and build a quote — fixture-schedule level, not summary
   level.
2. **Drawing uploads as a new PI input type** — alongside existing email/
   PDF/screenshot/link inputs.
3. **Cover-sheet extraction** — pull contacts and businesses specifically
   off a drawing's cover sheet.
4. **Feed into the database/enrichment idea from earlier this session** —
   extracted contacts/businesses become MI-scoreable records, checked for
   fit automatically. This ties PI and MI together into one pipeline
   rather than three separate tools.

**Not yet decided:** Scope/sequencing of the above, whether this is one
Decision or several, whether it needs new API/vendor capability (drawing
parsing is a different technical problem than the current email/PDF
parsing PI already does).

## 3. Carried over from earlier in this session (still open)
- `field.html` not linked from homepage/nav yet
- `/capture` not renamed to `/field` (deliberately deferred — gate/nav risk)
- Passcode gate built but inactive; only covers FI routes, not PI/MI yet
- `BOBERT-FINANCE-MIGRATION-EXPORT-AUG8.md` still untracked, unresolved


## 4. MI search quality gap (found Aug 10-11 testing)
Lens 1 scoring/pipeline logic confirmed working correctly (fixed tonight),
but Tavily search results for 7 Brew were stale/thin -- returned "321
locations by 2024" when the real picture is 750+ locations across 38
states, on pace for 1,000 units by end of 2026, per QSR Magazine and
RestaurantDive. This produced an honest but under-scored result (60/B)
that should likely have been much higher (closer to A/NOW) with better
search data.

Not a prompt/logic bug -- the scoring model correctly used what it was
given. The gap is search quality/recency for fast-moving retail growth
stories. Needs investigation next session: better search query
construction, or whether Tavily's basic search depth is missing
recent/authoritative sources that a deeper search would surface.


## 6. Bobert PI architecture -- general engine + client-specific layer (locked Aug 11, 2026)

Revises/supersedes item 5's framing -- this is the real architecture,
same pattern as MI's Lens 1/Lens 2 split (shared engine, swappable
client-specific criteria on top).

### Bobert PI (general engine, not LPA-CSI-specific)

**Inputs (any of):**
- Bid job board screenshot
- Email copy/paste
- Uploaded drawing (PDF or image)
- Uploaded Excel spreadsheet or screenshot of a fixture schedule

**Extraction from any input:**
- Contacts -- names, companies, roles found on the document
- Job information -- title block data, developer, GC, project name,
  location
- Pertinent job details -- whatever's relevant to deciding if/how to
  pursue

**Special case -- fixture schedule:** when a drawing, spreadsheet, or
fixture-schedule screenshot is uploaded, extract and replicate the
schedule into an Excel spreadsheet **exactly as listed on the source**
-- not reformatted or summarized. Core columns: description and part
number -- that's what's actually needed, not a wider guess at
wattage/lumens/mounting/etc. Rob will find a real LPA CSI quote to
mirror the exact format -- treat this as the placeholder until that
arrives, not the locked schema.

### LPA CSI layer (client-specific, sits on top of the general engine)

LPA CSI provided their own checklist -- this becomes a configuration
that runs after general extraction, specific to them. Not built into
the core engine. This is what makes it "Bobert for LPA CSI" rather than
building LPA-CSI-only tooling.

### BLOCKING NEXT STEPS
1. Get input from LPA CSI's quotes team (quotes director first --
   he owns the process) before building around their assumed needs.
   Rob's prior-job tool is a good icebreaker/proof of concept to show
   them.
2. Rob to find a real LPA CSI quote tomorrow to mirror the exact
   spreadsheet format (columns confirmed so far: description, part
   number -- may have more once the real quote is seen).
3. Get LPA CSI's actual checklist (mentioned as already provided) --
   needed to build the client-specific layer accurately.

### Unchanged technical reality
General job/contact/title-block extraction from text-searchable
sources is buildable with current tools (Groq synthesis pattern PI
already uses). Fixture-schedule-to-Excel replication is a vision-model
problem for scanned/scattered-callout drawings specifically -- clean
text-searchable tables are the buildable first case; scanned/scattered
needs vendor research and likely triggers Decision 013's spend gate.
