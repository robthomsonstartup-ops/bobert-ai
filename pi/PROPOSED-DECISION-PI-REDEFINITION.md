# Proposed Decision — PI Redefined as the Lighting Configurator

**Status:** DRAFT — not yet in `business/DECISIONS.md`. Per standing rule,
this isn't a real decision until Rob signs off and it's copied into
`DECISIONS.md` with the correct next number (check the current highest
number at merge time — don't assume it's still 029).

**Proposed date:** [fill in at merge]

**Problem:** PI's original implementation (`intake.html` /
`api/intake.js` and friends) handles bid-invite email and RFP text intake.
Separately, a more complete fixture-schedule-to-quote pipeline — the
"Lighting Configurator" — was built and iterated in a ChatGPT workspace,
proven against a real project (Potbelly Sandwich Works) and stress-tested
against a second (Valley Ford of Huron / CJI Construction). It does
substantially more of PI's actual job than the original approach.

**Decision:** The Configurator becomes PI going forward. It's brought into
this repo at `pi/app-source`, with the original intake files left in
place but marked superseded, not deleted, until the new approach is
verified end-to-end here and Rob signs off on retiring them.

**What's still open before this can be called done:**
- Auth: `pi/app-source/app/chatgpt-auth.ts` only works embedded in
  ChatGPT. Needs a real, standalone auth layer before this runs on
  `bobert.ai`.
- Shared/central storage: hosted endpoints exist for projects and
  fixtures but the approved UI isn't fully wired to them — decisions
  currently live in per-device browser storage.
- Pricing and catalog verification automation — not built yet.
- A verified path for a completed pi/-based quote to write back into the
  historical pricing store (per the PI pricing-intelligence expansion
  discussed separately) — out of scope for this specific decision, noted
  for later.

**Not changed by this decision:** the original `intake.js` / `intake.html`
bid-invite flow keeps running until Rob explicitly retires it.
