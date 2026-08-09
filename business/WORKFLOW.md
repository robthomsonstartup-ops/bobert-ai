# Bobert — Working Discipline
**Effective:** August 8, 2026 — replaces the multi-department cross-team
protocol this file used to describe. That structure (five separate Claude
Projects — BD, Finance, Marketing, Dev-FI, Dev-PI — with Rob manually
pasting redirect prompts between chats) is retired. One Claude Project
now covers all of it. The discipline below is what's still load-bearing;
the department-lane and redirect mechanics are gone because there's no
longer a separate chat to redirect *to*.

**Purpose:** Prevent the failure modes that actually hit this repo —
decision-number collisions, decisions cited in a prompt or commit message
but never written to `DECISIONS.md`, wholesale `TEAM_SYNC.md` overwrites
that erased prior status, and "shipped" claims that meant "commit pushed"
rather than "verified live."

---

## The Loop (every session)

1. **Pull latest `main`.** Read `business/DECISIONS.md` and
   `business/TEAM_SYNC.md` in full before doing anything else — note the
   current highest Decision number. If `TEAM_SYNC.md` ever disagrees with
   `DECISIONS.md`, `DECISIONS.md` is correct; flag the mismatch, don't act
   on the stale summary.
2. **Do the work** — whatever mix of code, copy, pricing/vendor research,
   or coordination the task actually needs. Nothing here requires
   handing off to another session anymore. That said: don't unilaterally
   decide anything that changes a locked Decision, commits new spend, or
   sets pricing — flag it and wait for Rob's sign-off instead of just
   proceeding.
3. **New Decision needed?** Check the current highest number in
   `DECISIONS.md` first. Append — never overwrite or renumber an existing
   entry — and write the actual content into `DECISIONS.md` itself. **A
   decision mentioned in a prompt, commit message, or `TEAM_SYNC.md` but
   not actually written into `DECISIONS.md` is not real.** This exact
   mistake happened twice (Decisions 016 and 018) under the old structure
   and cost real time to untangle.
4. **Update `TEAM_SYNC.md`'s relevant status section in the same commit
   as the work.** Don't do a wholesale rewrite of sections the work
   didn't touch — that's what produced two conflicting "Decision 018"
   entries on July 29.
5. **Verify against the live artifact, not the report.** "Committed" and
   "pushed" are not "verified live." Before calling anything done, check
   it against the actual site/repo state — via a fetch tool if one's
   available, or Rob's pasted terminal/browser output otherwise.

---

## Standing Rules

- **No change to a locked Decision without Rob's explicit sign-off.**
- **Brand assets are not to be recreated, filtered, or approximated** —
  use the approved files per Decisions 006, 010, 011, 012. See the
  consolidated project setup doc, Section 4, for the specific gotchas
  (wordmark PNGs, adaptive icon math, prohibited CSS filters).
- **No discretionary spend of any kind** until beta proves revenue
  (Decision 013).
- **Technical gotchas** (ESM exports, IndexedDB separation between FI/PI,
  zsh quoting issues, etc.) — see the consolidated project setup doc,
  Section 4. Don't relitigate these; they're hard-won.

---

## Historical Note — Prior Structure (for context only)

Through July 29–30, 2026, this repo was operated by five separate Claude
Projects, each with a defined scope lane and instructions to stop and
hand off anything outside it via a redirect prompt Rob would paste into
the target department's chat. That process produced real, documented
problems: duplicate decision numbers (016, 018), a TEAM_SYNC.md
overwrite that briefly erased another department's status update, and
status claims that turned out to mean "pushed" rather than "live." The
full redirect template and scope table lived in this file before this
rewrite; they're preserved in git history (see the commit prior to this
one) if the multi-session structure is ever reintroduced.
