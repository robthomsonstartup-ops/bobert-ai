# Bobert — Cross-Department Workflow
**Effective:** July 29, 2026
**Purpose:** Prevent the failure modes that hit this repo on July 29 — decision-number collisions, files cited but never committed, wholesale TEAM_SYNC.md overwrites that erased another department's work.

Every department session — BD, Finance, Marketing, Dev (FI), Dev (PI) — follows this.

---

## Roles

| Department | Owns | Does not touch |
|---|---|---|
| Business Development (BD) | DECISIONS.md, cross-department coordination, verifying what's actually on GitHub | Code, visual assets |
| Finance | P&L, vendor cost models, monetization research, spend approval | Code, brand assets, decisions outside Finance's scope |
| Marketing | Customer-facing visual assets, copy, brand compliance tooling | Code |
| Development (FI / PI) | All code and implementation | Brand assets, pricing, decisions outside Dev's scope |

No department changes a locked decision without routing it through BD first.

---

## The Four-Step Loop (every session, every department)

1. **Pull latest `main`. Read `business/DECISIONS.md` and `business/TEAM_SYNC.md` before doing anything else.** If TEAM_SYNC.md ever disagrees with DECISIONS.md, DECISIONS.md is correct — flag the mismatch, don't act on the stale summary.
2. **Do the work.**
3. **If a new Decision is needed:** check the current highest number in DECISIONS.md first, append (never overwrite, never renumber existing entries), and write the actual content into DECISIONS.md itself. A decision mentioned in a prompt, commit message, or TEAM_SYNC.md but never actually written to DECISIONS.md is not real — this exact mistake happened twice already (Decisions 016 and 018) and cost real time to untangle.
4. **Update only your own department's section under "Current Status by Department" in TEAM_SYNC.md, in the same commit as the work.** Never rewrite the whole file. Every other section stays exactly as the last department left it. A wholesale rewrite is what caused two conflicting versions of "Decision 018" to exist on July 29.

---

## How a Department Session Gets Started

There is no direct channel between department chats — Rob is the one who pastes text in. Two ways this happens:

**A. Targeted directive.** When BD has something specific and time-sensitive for a department, BD writes a `PROMPT-<DEPT>-<DATE>.md` file, commits it to `business/`, and gives Rob the exact text to paste into that department's chat.

**B. Standard check-in.** For routine "anything for you to do?" sessions, Rob can paste this into any department chat without waiting on BD to draft something:

> Pull latest from `main`. Read `business/DECISIONS.md` and `business/TEAM_SYNC.md`. Check your department's open items (🔲) under "Current Status by Department," and check `business/` for any `PROMPT-<yourdept>-*.md` files you haven't acted on yet. Report status, then proceed on whatever's open. Follow `business/WORKFLOW.md` for how to commit your changes.

This means TEAM_SYNC.md's per-department open-items list functions as that department's standing to-do list — a department doesn't need a fresh bespoke prompt for everything, only for genuinely new or urgent asks.

---

## Verification, Not Trust

When a department reports work done, get the actual terminal output (the `git push` result) and paste it back to BD. BD checks the real state on GitHub directly — via the exact commit hash, not the branch URL, since GitHub's CDN caches branch URLs for a few minutes — before treating any department's summary as fact. This step is what caught the July 29 TEAM_SYNC.md conflict; it stays permanent.

---

## Staying In Your Lane — Scope Boundaries & Redirects

**Effective July 29.** Lanes exist so nothing gets built twice, built wrong, or built by someone without the context to own it. Lanes can grow — if a genuinely new category of work shows up, BD adds a lane for it here and in the Team table, rather than the nearest department just absorbing it. But while a lane exists, only its owner acts in it.

### Scope table

| Department | In scope | Explicitly out of scope |
|---|---|---|
| Business Development (BD) | `DECISIONS.md`, cross-department coordination, verifying GitHub state, `TEAM_SYNC.md` structure/reconciliation, drafting `PROMPT-*.md` directives | Writing code, creating brand assets, building financial models, writing customer-facing copy |
| Finance | P&L, vendor cost models, monetization research, spend approval, gross-margin analysis | Code, brand assets or copy, product/feature decisions, committing code changes, locked Decisions outside Finance's own proposals |
| Marketing | Customer-facing visual assets, copy, brand compliance tooling and enforcement (`brand-check.py` R6-R10) | Code (Dev implements what Marketing designs), financial modeling, product feature decisions, changing a locked Decision |
| Development (FI) | All Bobert FI code and implementation (`/capture`, `/leads`, `/account`) | Brand asset creation, pricing, PI's codebase, locked Decisions outside Dev's own proposals |
| Development (PI) | All Bobert PI code and implementation (`/intake` and related) | Brand asset creation, pricing, FI's codebase, CRM integration decisions before CS Illumination's stack is known |
| Founder / CEO (Rob) | Final call on anything; the only person who can approve work that spans or overrides a lane | — |

**Cross-cutting exception:** if Dev (FI) and Dev (PI) ever need to share code (a common component, a shared library), that's not either department's unilateral call — flag it to BD first so it's a tracked decision, not a silent merge of two lanes.

**Named carve-out — `scripts/brand-check.py`:** this file is Python, but it's Marketing's own compliance instrument (Marketing built and maintains it), not product code. Marketing may edit its detection logic directly. This is distinct from the site itself (`.html`/`.js` files it checks), which stays Dev's to implement. If Marketing's edits ever extend into anything beyond this one script, that's back in Dev's lane.

### If you hit something out of your lane

Do not attempt it, and do not silently drop it. Three steps, every time:

1. **Stop.** Don't build, write, or decide the out-of-scope item, even if it would be quick.
2. **Log it so it can't get lost.** Add one line to the correct department's section in `TEAM_SYNC.md` — the *owning* department's section, not your own — marked 🔲, tagged with who flagged it. This means the item is tracked in the single source of truth immediately, even before anyone acts on it, and even if the redirect prompt below sits unread for a while.
3. **Hand Rob a redirect prompt.** Output the block below, filled in, so Rob can paste it straight into the correct department's chat with no editing required.

### Redirect prompt template

```
From [your department] — redirect, [date].

While working on [task you were doing], I hit something outside my lane: [one or two sentences on what it is and why it's not mine — e.g., "this requires a new vendor cost comparison, which is Finance's call, not Dev's"].

This belongs to: [target department].

I've logged it as an open item in that department's section of business/TEAM_SYNC.md so it's tracked. Pull latest from main, read business/DECISIONS.md and business/TEAM_SYNC.md, then pick it up from there.
```

Rob copies the filled-in block and pastes it into the target department's chat. That session pulls latest, sees the logged item in its own TEAM_SYNC.md section, and picks it up with full context — no separate explanation required, because the log step already captured it.

### Why this matters

The failure mode this prevents: a department improvises past its lane because redirecting "felt slower," and either does the work badly (no context, no ownership) or mentions it in passing and it never gets tracked. The three-step rule makes the correct department the only one that acts, while guaranteeing the item survives even if Rob doesn't act on the redirect immediately.

---

*This file is referenced at the top of TEAM_SYNC.md. Read it once; the four-step loop above should become automatic.*
