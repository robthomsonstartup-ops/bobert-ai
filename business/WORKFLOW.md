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

*This file is referenced at the top of TEAM_SYNC.md. Read it once; the four-step loop above should become automatic.*
