# Bobert Overview Page — Design & Build Request

## What this is

We need a polished public overview page for Bobert — a "sell sheet" style page explaining what the platform is and does. This is not the internal working app (that stays as-is at the module URLs); this is a standalone marketing/overview page.

Current status: Rob had an early draft built with AI assistance to test structure and content. **The visual execution is not good enough** — it needs a seasoned web designer's touch, not another generic AI pass. This brief asks for real design work, not just code review.

## Repo access

GitHub: `https://github.com/robthomsonstartup-ops/bobert-ai`

Local clone on Rob's machine: `~/Desktop/bobert-ai`

## Before you start — read these in the repo

1. `business/CDE-JULY19.md` — binding cross-department edict. Read it first.
2. `business/DECISIONS.md` — read in full, especially Decisions 007, 009, 010, 011, 012, 018, 021, 022, 024, 025, and 026.
3. `business/TEAM_SYNC.md` — current operating status. If it conflicts with `DECISIONS.md`, the decisions ledger wins.
4. `business/WORKFLOW.md` — current single-project working discipline.
5. `marketing/SITE-PLAN-JULY30.md` and `marketing/SITE-AUDIT-JULY29.md` — prior site planning and evidence. Use what still applies; do not blindly copy stale two-sector assumptions.
6. `marketing/SAFE-USE-COPY.md` — required safety language when the page describes field capture.
7. Current `index.html` — existing live portal for reference only. **Do not modify it.**

## Confirmed brand assets

All are in `assets/` on `main`.

For this dark overview page, the approved horizontal wordmark is:

- **`assets/bobert-wordmark-white.png`** — approved transparent white/light wordmark for dark backgrounds.

Other approved assets available:

- `assets/icon.png` — app-icon-style Corner Signal mark on a solid dark square.
- `assets/adaptive-icon.png`
- `assets/adaptive-icon-foreground.png`
- `assets/adaptive-icon-background.png`
- `assets/adaptive-icon-monochrome.png`
- `assets/adaptive-icon-transparent.png`
- `assets/apple-touch-icon.png`
- `assets/favicon.png`
- `assets/splash-icon.png`
- `assets/bobert-mark-white.png` — mark alone for dark backgrounds.
- `assets/bobert-mark-dark.png` — mark alone for light backgrounds.
- `assets/bobert-wordmark-dark.png` — approved wordmark for light backgrounds.

### Locked brand rules — non-negotiable

- Never recreate the word "Bobert" as styled logo text. Use the actual wordmark image asset only.
- Never filter, recolor, stretch, crop, approximate, or redraw the logo mark.
- Primary Black: `#1A1A1A`
- Bobert Red: `#DC2626`
- White: `#FFFFFF`
- Mid Gray: `#6B7280`
- Light Gray: `#F0F0F0`
- Do not substitute `#0A0A0A` as the primary black on this new page.
- Tagline, exact: **"See what others drive past."** Do not rewrite it.
- Typeface: Inter.

## Page location

Build this as a **new standalone page named `overview.html` in the repo root**.

With the repo's Vercel `cleanUrls: true` configuration, the intended public path is:

`/overview`

Do not add a link to it from `index.html` yet. Rob can share the direct URL during review/testing.

## What NOT to touch

Do not modify:

- `index.html`
- `capture.html`
- `field.html`
- `intake.html`
- `market.html`
- `account.html`
- `leads.html`
- `gate.html`
- `upgrade.html`
- API/backend files
- pricing logic
- authentication/gating
- module navigation

This is a new, additional marketing page only.

## Strategic context

Bobert is the platform and currently spans three capability areas:

1. **Field Intelligence**
2. **Project Intake**
3. **Market Intelligence**

Do not overuse FI/PI/MI abbreviations publicly. Use the descriptive names.

The page should communicate that Bobert turns opportunity signals from the physical world, project documents, and market/account research into something clearer and more actionable.

The page should look like a serious software company in 2026 — polished enough to share with prospects, partners, beta users, and industry contacts — while remaining truthful about what is early, beta, or still developing.

No fake stats. No fake testimonials. No fake customer logos. No fake screenshots. No unsupported claims.

## Content direction

### Hero

Use the locked tagline as the hero headline:

> **See what others drive past.**

Suggested platform-level supporting copy:

> Bobert turns field observations, project documents, and market signals into a clearer next move.

You may refine supporting copy for rhythm and hierarchy, but do not alter the locked tagline.

Use one restrained public CTA such as:

- `Get Beta Updates`

and/or a non-module page anchor such as:

- `See the System`

Do **not** link into `/capture`, `/intake`, `/market`, `/account`, `/leads`, or `/upgrade` from this overview page.

### Platform section

Suggested heading:

> **One system. Three ways to move opportunity forward.**

Create three visually differentiated, high-quality capability cards or panels.

#### Field Intelligence

**Status:** Private Beta

Outcome:

> Capture opportunity while you're in the field.

Current capability direction:

- photo
- location/GPS
- voice note/context
- structured opportunity record
- project/company intelligence where supported
- follow-up

Suggested copy direction:

> See something worth remembering? Capture it while you're stopped. Bobert keeps the location, what you saw, and the context together so the opportunity does not disappear into your camera roll.

No direct module CTA.

#### Project Intake

**Status:** In Development

Outcome:

> Turn inbound project information into a cleaner starting point for a quote.

Current capability direction:

- bid invites
- RFPs
- PDFs
- screenshots
- links/files
- structured project summary
- RFI/missing-information checklist
- fixture-schedule extraction and quote-ready organization as the product evolves

Suggested copy direction:

> When the project lands on your desk, Bobert helps pull the signal out of the paperwork — what it is, who is involved, what is missing, and what needs to happen next.

Do not overpromise fully automated quoting if the live tool does not support it end-to-end.

No direct module CTA.

#### Market Intelligence

**Status:** Early Beta

Outcome:

> Research and prioritize companies before you spend time chasing them.

Current capability direction:

- company name or URL
- account/company profile
- fit assessment
- timing/growth signals when supported by sources
- priority
- reason to call
- next action
- target roles

Suggested copy direction:

> Know more before you make the call. Bobert organizes what public information supports — fit, timing signals, reasons to engage, and where to start.

Never imply that unsupported data is verified or known.

No direct module CTA.

## How it works

Make the flow platform-level, not just photo capture.

Suggested three-step structure:

### 1. Capture the signal
Photo it. Voice it. Paste it. Upload it.

### 2. Bobert organizes the context
Location, project information, documents, companies, and market signals.

### 3. Act on a clearer next step
Turn raw observations and incoming information into something easier to work from.

## Who it's for

Keep this inside the locked construction-project ecosystem.

Lead with:

- Lighting & Electrical
- Contractors & Subs
- Manufacturers' Reps
- Suppliers & Distributors

Do not add Real Estate or Landscaping.

Suggested section heading:

> **If you help build it, Bobert is being built for you.**

## Safe-use language

Because the page describes field capture, include the approved public guidance from `marketing/SAFE-USE-COPY.md` near the field workflow:

> Bobert is designed to be used stopped. Pull over, capture in seconds, get back on the road.

And use the approved footer statement:

> **Safe use:** Bobert is intended for use while stopped. Never use a mobile device while driving. Obey all applicable traffic laws.

Do not weaken, joke about, or rewrite the safety message without Marketing review.

## Built in the open

Bobert's locked internal operating principle is:

> How do we be better every day?

It is **not** a public tagline and should not appear beside the hero tagline.

A quiet proof section may reference the public changelog and use the approved public expression:

> We ship, we listen, we fix it. Every day.

If used, link only to `/changelog`, not a working module.

## Visual direction

The early AI page is not the target. Do not simply rearrange its cards.

We want a mature product-marketing page with deliberate art direction.

### Desired feel

- Elite but restrained
- Dark, editorial, architectural
- Strong typography
- Tight grid
- Layered depth without gradient gimmicks
- High-quality spacing and rhythm
- Red used sparingly as a signal, not a flood fill
- Clear visual distinction between Private Beta / Early Beta / In Development
- Modern software-company polish, but grounded in field/construction reality
- Strong mobile presentation
- Accessible contrast and readable type

### Avoid

- Generic SaaS gradients
- Blue/purple AI glow
- Robot imagery
- Map-pin clichés
- Magnifying-glass clichés
- Emoji
- Fake device screenshots
- Stock construction photos used as filler
- Excessively rounded card soup
- Every section looking identical
- Recreated logo text

### Use the Corner Signal language subtly

The Corner Signal geometry can inspire:

- sectional framing
- crop/focus brackets
- grid accents
- red top-right corner details
- status indicators

But do not redraw the logo itself as decoration.

## Technical build preference

Preferred deliverable is a single self-contained `overview.html` file with inline CSS and minimal JS, matching the repo's existing page pattern.

Requirements:

- Reference approved assets via relative paths such as `assets/bobert-wordmark-white.png`.
- Do not embed logo assets as base64.
- Use semantic HTML.
- Responsive from 320px through desktop.
- Respect `prefers-reduced-motion`.
- Maintain strong keyboard focus states.
- No framework dependency required.
- No external JavaScript library unless genuinely necessary.
- Inter may load through Google Fonts consistent with the existing site.
- Optimize image rendering; do not distort assets.

## SVG / iframe / Intercom guidance

### SVG

SVG may be used for **original UI decoration or simple non-brand icons** if created cleanly and accessibly.

Do not convert, trace, or reconstruct the Bobert logo/wordmark as SVG. Use the approved PNG assets.

### iframe

Avoid iframe content on the overview page unless there is a specifically approved video embed. A static overview page should not depend on an iframe for core messaging or layout.

### Intercom

Do not add Intercom at this stage. There is no approved requirement or spend decision for it, and Decision 013 prohibits discretionary spend before beta proves revenue. If a future customer-support/chat tool is proposed, price and privacy implications must be reviewed before implementation.

## Design expectations

This should not look like it took five minutes to build.

Before coding, establish:

- page hierarchy
- spacing scale
- type scale
- component rhythm
- mobile behavior
- capability-card visual system
- status-label system
- hero composition
- repeated brand geometry

Then implement.

A strong first pass should feel coherent without requiring decorative clutter.

## QA

Before presenting as complete, verify:

- `index.html` unchanged
- module pages unchanged
- no backend/API files modified
- approved white wordmark used on dark surfaces
- no recreated logo text
- no logo CSS filter or blend mode
- Primary Black is `#1A1A1A`
- Bobert Red is `#DC2626`
- locked tagline is exact
- all three capability areas are present
- statuses are honest
- no module links exist on the overview page
- no fake stats/testimonials/logos
- safe-use language included
- desktop layout reviewed
- mobile layout reviewed
- keyboard/focus behavior reviewed
- reduced-motion behavior included
- page can be shared directly at `/overview` after deployment

## What to report back

Return:

1. Design rationale
2. Page structure
3. Files changed
4. Confirmation that protected files were untouched
5. Brand QA result
6. Responsive QA result
7. Any assumptions or unresolved questions
8. Commit SHA
9. Whether the live `/overview` deployment was actually verified, versus only committed/pushed

Do not report “done” solely because a commit exists. Verify the live artifact if the environment allows it; otherwise state that live verification remains pending.
