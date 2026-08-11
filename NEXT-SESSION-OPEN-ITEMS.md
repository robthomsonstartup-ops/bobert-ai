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
