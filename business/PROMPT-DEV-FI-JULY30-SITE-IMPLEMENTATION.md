From BD — July 30, directive for Development (FI).

Marketing completed a full site audit and revised content/structure plan for bobert.ai — see `marketing/SITE-AUDIT-JULY29.md` (findings) and `marketing/SITE-PLAN-JULY29.md` (the actual spec to build against). Rob has ruled on the three items that touched locked Decisions (021, 022, 023 — all now in `business/DECISIONS.md`). This prompt is the implementation task list, priority-ordered. Marketing owns copy/structure; you own the code.

**1. Nav link to the app — do this first, independent of everything else below.**
bobert.ai currently has zero links to `/capture`, `/leads`, `/account`, `/intake`, or `/upgrade` — every href is an on-page anchor or mailto. Live beta users have no way in from the homepage; they have to type `/capture` from memory. Add a plain-text "Open Bobert" link in the nav, pointing to `/capture`, placed before the "Join the Beta" button. Not a button — it should read as a utility for people who already belong, not a competing CTA. This is a one-line fix and shouldn't wait on anything else in this list.

**2. R1b logo violations — 4 pages, plus manifest.json wiring.**
Marketing's corrected `brand-check.py` (they fixed a detection bug in their own tool — see WORKFLOW.md carve-out) now catches this: `capture.html`, `leads.html`, `account.html`, and `intake.html` all use `/assets/icon.png` (the 1024×1024 app-store icon, with drifted red) as the header logo. Same violation already flagged on `upgrade.html`. Replace with `bobert-wordmark-white.png` on all five pages consistent with `index.html`.

Also fix `manifest.json`: `sizes` values are wrong (declares 192x192/512x512, file is 1024×1024), no `"purpose": "maskable"` entry even though the adaptive icon set for this exists and is unused (Gate 7 assets are built but never wired in), no `monochrome` purpose for Android 13+, `background_color` is `#0A0A0A` instead of the locked `#1A1A1A` (Decision 009), and `theme_color` disagrees with `index.html`'s declared theme-color.

**3. Stats row.** Replace the `0` ("opportunities forgotten") and `∞` ("leads you used to miss") stats — neither is a real measurement and both undercut the credible `<10s` stat next to them. Marketing's suggested replacement row: `<10s` / `GPS` / `1 photo — everything else fills itself in`. If you'd rather keep four stats, the fourth should wait for real capture-count telemetry rather than another invented figure.

**4. `/upgrade` reframe — testing-only, not a locked structure.** Rob's explicit instruction: treat this as a placeholder to remove the current contradiction (`/account` tells beta members "full access, no charge" while `/upgrade` still asks for a card), not as final subscription architecture — that gets built properly later once Rob has tested this himself. For now: strip the checkout flow, replace tier buttons with a preview framing ("Bobert is in closed beta — free, no card, no trial clock. Pricing below is what we expect at launch."), and trim or mark `Planned` any feature currently listed that hasn't shipped (Team Sharing, usage reporting, white-label/API/SLA on Enterprise). Use the fixed pricing figures from Decision 023 ($59/$119/$349/$1,500), not the old ranges.

**5. Safe-use copy placement.** `marketing/SAFE-USE-COPY.md` is done and waiting — Marketing's confirmed placement spec is in `SITE-PLAN-JULY29.md` under "Safe-Use — Consolidated Placement Spec." Highest-priority placement is on `capture.html` itself (persistent + first-run acknowledgment); footer lines on `index.html`, `upgrade.html`, `success.html` are secondary. If you only get to one, make it the capture-screen one — that's the placement that actually changes behavior.

**6. Features section — one rename, one addition.** Rename "Leads Dashboard" to "Your List" (matches what `/leads` actually is — a list, not a dashboard). Add a 7th feature card for the AI intel card, now real per Decision 020: "Project Intel — Capture a job site and Bobert pulls what it can find — project, company, contacts, a routing note." Keep "pulls what it can find," not "verified" or "confirmed" — the enrichment-accuracy item is still open per your own contact-enrichment note in TEAM_SYNC. Don't let the copy get ahead of what the system actually does.

**7. `/changelog` page — new, lower priority.** Marketing will write the initial content once you confirm this can be built; you own the page/routing itself. Simple reverse-chronological list, dated entries, plain language, sourced from `CHANGELOG.md`. No version numbers or commit hashes in the public-facing text — that's Marketing's translation job, not yours.

**Not in scope / do not touch:** product name, tagline, logo file, color palette — all locked. This is implementation of Marketing's spec, not a redesign.

**Priority order if you're doing this in one pass:** 1 → 5 (capture-screen placement only) → 2 → 4 → 3 → 6 → 7.

Per WORKFLOW.md: update only the Development (FI) section of `business/TEAM_SYNC.md` in the same commit as any of this, and mark items done individually rather than waiting to batch the whole list — Marketing and BD need to see real progress land, not one giant commit at the end.
