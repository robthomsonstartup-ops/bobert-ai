From BD — July 30, directive for Development (FI). Supersedes `PROMPT-DEV-FI-JULY30-SITE-IMPLEMENTATION.md` and folds in `PROMPT-DEV-FI-JULY30-FOLLOWUP.md` — work from this one file.

Marketing shipped `marketing/SITE-PLAN-JULY30.md` v2.0, superseding the July 29 plan. Rob has ruled on the open questions in it. Build against v2.0, not v1.0.

**Rob's rulings:**
- **PI goes on the homepage now**, confirmed directly — describe-only, "in development," no CTA, no waitlist, per SITE-PLAN v2.0 §5.
- **Thesis framing ("Opportunity gets lost twice") — build it, but it's not fully locked.** Rob wants to see it live before final sign-off. Build sections 4-5 as specced; be ready that copy may get revised after Rob reacts to the live version.
- **`/upgrade` — same as before: preview only, testing-only, no checkout during beta.** Not a locked structure.

**What's already confirmed genuinely live (don't redo):** nav "Open Bobert" link, simplified stats row, 7th "Project Intel Card" feature, and 2 of 7 brand-check.py fixes (7 → 5 violations). Marketing independently verified these against the live site — good work, keep going from here.

**New, urgent — manifest.json regression, not in the original list.** Marketing caught this: the maskable icon entry now points at `/assets/icon.png`, whose content spans 59.2% of the canvas — outside Android's safe zone (66dp circle, content should be ≤66% diagonal). Declaring a non-padded icon as maskable is worse than not declaring it at all — Android will crop to the safe zone and clip the capture-frame corners and red accent, which is exactly what Decision 012 exists to prevent. **Fix: point the maskable entry at `/assets/adaptive-icon.png` instead** (verified safe by Marketing, content 43.2%, diagonal 65.9dp). Also still open: `sizes` values wrong for a 1024×1024 file, `background_color` is `#0A0A0A` instead of the locked `#1A1A1A` (Decision 009), and `description` is still FI-only language.

**Still open from before:**
1. **"Who It's For" section still violates Decision 021** — drop Real Estate and Landscaping, replace per SITE-PLAN v2.0 §9 (four cards: Lighting & Electrical, Contractors & Subs, Manufacturers' Reps, Suppliers & Distributors).
2. **`/upgrade` reframe** — strip "Start Free Trial" CTAs and the "Credit card required" line, add beta-preview framing per SITE-PLAN v2.0's `/upgrade` Reconciliation section.
3. **Remaining 5 brand-check.py violations** (R1b/R3) — `capture`, `leads`, `account`, `intake`, `upgrade` still reference `/assets/icon.png` as header logo; `upgrade.html`/`success.html` missing favicon links.
4. **Safe-use copy placement #1** — persistent "Park first" statement on `capture.html`. Highest-priority placement per Marketing's spec; a footer line doesn't change behavior, this one does.

**New from v2.0, once the above lands:**
5. New sections 4 ("Why Bobert Exists") and 5 ("Two Ways Bobert Works") — the thesis + FI/PI reveal.
6. Hero subhead revision to platform-level language.
7. New "Built in the Open" section (§10) — teaser only, links to `/changelog`.
8. Footer additions: operating principle line, safe-use statement, `/changelog` link.
9. `/changelog` page scaffold — routing/page structure only; Marketing writes content once an owner/cadence is agreed (still open, doesn't block you building the page shell).

**Handoff order (per SITE-PLAN v2.0, adjusted for the manifest regression):** manifest.json fix (urgent, small) → safe-use placement #1 → remaining brand-check fixes → "Who It's For" rewrite → hero/stats → new sections 4/5/10 → footer → `/upgrade` reframe → `/changelog` scaffold.

**Before pushing:** pull `main` first. Make the actual edits. Run `git diff` locally and confirm real content changes before committing — not just re-saving the same file. Update only the Development (FI) section of `business/TEAM_SYNC.md` in the same commit, and paste the real `git diff --stat` / `git log -1` output back so it can be verified against GitHub directly.
