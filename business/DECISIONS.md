# DECISIONS.md
**Bobert — Locked Decisions Log**  
This file is the single source of truth for locked decisions. Once logged here, a decision is final unless overridden with a dated entry below it.

---

## DECISION 001 — Company / Product Name
**Locked:** July 2026  
**Decision:** The name is **Bobert**.  
**Origin:** Rob's niece couldn't say her R's — "Robert" became "Bobert." Rob is the fun uncle. The name is personal, authentic, and impossible to forget.  
**USPTO Status:** 0 live marks as of July 2026. Clear in Class 042 and Class 009.  
**Domain:** bobert.ai confirmed available at $89.98/yr via Namecheap.  
**Risk accepted:** Rob is aware of the Lauren Boebert political association (different spelling). The authentic family origin story eliminates the practical risk. Decision stands.

---

## DECISION 002 — Brand Architecture
**Locked:** July 2026  
**Decision:** **Bobert is the primary brand** — company name, product name, and AI persona.  
- Company: Bobert (LLC, Indiana — pending filing)
- Platform: Bobert Opportunity Intelligence Platform
- AI assistant: Bobert (the AI inside the app is Bobert)

---

## DECISION 003 — Founder Model
**Locked:** July 2026  
**Decision:** Solo founder, fully bootstrapped through validation phase.  
**Hiring trigger:** $10–15K MRR or when customer support becomes unmanageable.  
**Outside funding:** Not pursued until proof of commercial traction.

---

## DECISION 004 — Launch Market
**Locked:** July 2026  
**Decision:** Beachhead is construction and commercial field sales (lighting, electrical, HVAC, roofing, solar, signage, manufacturers' reps).  
**Expansion:** CRE, nonprofit, corporate BD, healthcare, university development — after 10+ paying customers in the beachhead.

---

## DECISION 005 — Pricing Model
**Locked:** July 2026  
**Decision:** Per-user SaaS, 30-day free trial, 4 tiers.

| Tier | Price | Users |
|---|---|---|
| Solo | $49–79/mo | 1 |
| Professional | $99–149/mo | Up to 3 |
| Team | $299+/mo | Up to 10 |
| Enterprise | Custom | Unlimited |

---

## DECISION 006 — Logo / Icon Direction
**Locked:** July 2026  
**Decision:** Working logo direction is **Concept 4 — Corner Signal**.  
**Description:** Bold geometric B monogram framed by capture-frame corners. Single red corner as accent (top right). Black background, white mark.  
**Status:** Approved for use. Refine with a real designer when budget is available.

---

## DECISION 007 — Primary Tagline
**Locked:** July 2026  
**Decision:** The tagline is **"See what others drive past."**  
**Use:** All marketing materials, App Store, pitch deck, website hero, one-pager, social. Do not alter.

---

## DECISION 008 — Brand Asset Ownership & Dev Handoff Protocol
**Locked:** July 2026  
**Decision:** Marketing owns the Bobert brand system and all customer-facing visual assets.

**Marketing provides:** Logo files, app icon, splash/onboarding graphics, App Store graphics, customer-facing copy.  
**Development implements:** Pull latest from main, read brand-brief.md and logo-icon-brief.md, implement only approved changes. Do not recreate or modify the logo independently.

---

## DECISION 009 — Official Brand Color Palette (FINAL — All Departments Confirmed)
**Locked:** July 2026  
**Agreed by:** Business Development, Marketing, Development

| Role | Hex |
|---|---|
| Primary Black | #1A1A1A |
| Bobert Red | #DC2626 |
| Light Gray (app bg) | #F0F0F0 |
| Mid Gray (secondary text) | #6B7280 |
| White | #FFFFFF |
| Graphite (reserve) | #1F2937 |

**Note:** Red in the logo is always #DC2626. In-app UI may use #D01E1E but never within the logo mark.

---

## DECISION 010 — Master Bobert Logo Mark
**Locked:** July 2026  
**Decision:** The Corner Signal mark is the single master Bobert logo for all brand applications.

**Approved construction:**
- Black background
- White geometric B
- White capture-frame corners
- Top-right capture corner in Bobert Red #DC2626

**The mark must not be redrawn, recolored, approximated, stretched, cropped, or replaced.**

**Prohibited variants:** Plain text B, white B inside red square, red-background variants, different-colored corners, department-created versions.

---

## DECISION 011 — Horizontal Wordmark Lockup
**Locked:** July 27, 2026

**Decision:** The horizontal lockup (Corner Signal mark + "Bobert" in Inter ExtraBold 800) ships as two pre-rendered transparent PNGs. Site and collateral use the image — never typed text alongside the mark.

**Approved assets:**

| File | Contents | Use |
|---|---|---|
| `assets/bobert-wordmark-white.png` | White mark + white text, transparent bg, red corner #DC2626 | Dark backgrounds — nav, footer, email header, dark one-pager |
| `assets/bobert-wordmark-dark.png` | Dark mark + #1A1A1A text, transparent bg, red corner #DC2626 | Light backgrounds — one-pager body, LinkedIn, social, print |

Both exported at 2400×600 (2× retina of 1200×300).

**Construction:** mark at 220px on a 300px canvas, 30px left pad, 44px gap, text at 200px Inter 800, vertically centered on cap-height.

**Rationale:** The prior wordmark PNGs in `/assets/` shipped with solid non-transparent backgrounds (light gray and near-white), making them unusable on the dark site. The nav worked around this by pairing `bobert-mark-dark.png` with typed HTML text and a blend mode — which rendered the mark nearly invisible on dark and put the red corner at risk.

**Prohibited:** Any CSS filter that alters logo color — specifically `filter: brightness(0) invert(1)` and `mix-blend-mode`. Both destroy the red corner (red → black → white). The correct variant already carries native white or dark pixels plus the red corner. Pick the right file; do not filter.

---

## DECISION 012 — Android Adaptive Icon Geometry
**Locked:** July 27, 2026

**Decision:** In the Android adaptive icon, the Corner Signal mark occupies **43.2% of the 1024×1024 canvas**, centered.

**Rationale:** Android composites a transparent foreground over a background layer, then applies an OEM mask — circle (Pixel/stock), squircle (Samsung), or rounded square. The mask crops to a 72dp viewport of the 108dp canvas, and only a **66dp centered circle** is guaranteed visible on every device.

The Corner Signal mark is a **square** frame, so its four capture-frame corners sit at the diagonal extremes — the worst case under a circular mask. For a square of side S to fit inside the 66dp safe circle: S × √2 ≤ 66, so S ≤ 46.7dp = **43.2%** of canvas.

Larger sizes were tested and rejected:

| Size | Diagonal | Result under Pixel circle mask |
|---|---|---|
| 55% | 84.0dp | Frame corners and red corner tip clipped |
| 50% | 76.4dp | Frame corners clipped |
| **43.2%** | **66.0dp** | **All four corners and red corner intact** |

DECISION 010 states the mark must not be cropped. 55% and 50% crop it on Pixel devices, so 43.2% is the only compliant option.

**Consequence:** The mark reads smaller than a typical app icon that fills its tile. This is accepted. Increasing visual weight would require an icon-specific lockup, which is a change to DECISION 010 and must be decided separately — not adjusted silently in an asset export.

**Also locked:** Logo red is normalized to exactly **#DC2626** in all generated assets. Source file `bobert-mark-white.png` carries drifted red (~#E41D1E) and must not be used as a generation source. Use `bobert-mark-dark.png`, recoloring ink #1A1A1A → #FFFFFF as needed.

---

*Add new decisions below with date and rationale.*

---

## Decision 013 — No Discretionary Spend Until Beta Proves Revenue
**Date:** 2026-07-27
**Owner:** Rob (BD)

Rob confirmed: no money committed up front. This superseded the pending
$5,000 starting cash assumption and the $3,000 contractor contingency —
neither is approved.

**Rule:** No new spend of any kind (contractor, ads, tools, paid channels)
until the beta demonstrates real revenue. Hiring/contractor spend remains
strictly triggered by MRR and support load, never pre-funded. Finance
models the base case on $0 starting capital.

**Status:** Locked.

---

## Decision 014 — Revenue-First Mandate for Finance
**Date:** 2026-07-27
**Owner:** Rob (BD)

Finance's job is not to ask for capital — it's to find the path to
self-funded growth. If the model shows a minimum revenue threshold is
needed, that threshold is Finance's target to hit through paid beta
conversions, not something bridged with outside cash or upfront spend.

**Directive:** Finance identifies the fastest realistic path to paid
conversions that closes any modeled gap organically. Revenue generated is
reinvested directly into the product — not banked, not drawn.

**Status:** Locked.

---

## Decision 015 — Stripe Goes Live on Rob's Personal Account (Bootstrap Sequence)
**Date:** 2026-07-28
**Owner:** Rob (BD)

**Decision:** Do not wait on LLC formation to start collecting revenue.
Stripe is connected to live mode under Rob's personal bank account /
sole-proprietor status now. Once a handful of paid subscriptions come
through, that revenue funds the Indiana LLC filing (~$100) and EIN.

**Sequence:**
1. Stripe live mode connected to Rob's personal bank account — unblocks
   real payment collection immediately, no LLC wait.
2. First paid subscriptions collected as a sole proprietor.
3. Revenue funds LLC filing + EIN once a few subs land.
4. Stripe account business type/EIN updated to the LLC once formed —
   Stripe generally supports this as an account update rather than a new
   account, preserving transaction history.

**Known tradeoff (not legal/financial advice — confirm with a CPA/attorney
before material revenue):** Revenue collected before the LLC exists is
sole-proprietor income — no liability separation yet, and it reports on
Rob's personal taxes until the LLC is formed and any tax election is made.
Finance's existing guidance to engage a CPA before revenue exceeds
$1,000/mo (see FINANCE-STATUS-JULY28.md) still applies and now matters
sooner given this sequencing.

**Status:** Locked. Supersedes the "LLC blocks Stripe live" sequencing in
FINANCE-STATUS-JULY28.md Section 6.1 — Stripe live no longer waits on the
LLC.

> **⚠️ SUPERSEDED IN PART BY DECISION 016 (July 28).** The LLC no longer
> blocks Stripe live — that part of 015 stands. But Stripe must remain in
> sandbox/test mode until a working product exists. **Do not flip to live
> mode.** See DECISION 016 below before acting on this decision.

---

## Decision 016 — Stripe Stays in Test Mode Until /capture MVP Ships
**Date:** 2026-07-28
**Owner:** Rob (Founder/CEO)
**Recorded by:** Merged August 8, 2026 from two duplicate entries independently
written under the same number on July 28 — one by a Marketing session
("Stripe Stays in Test Mode Until a Real Product Exists"), one by a BD
session ("Hold Stripe Live Until /capture MVP Ships"). Both agreed on
substance; consolidated here as the single canonical entry. No content
change from either original beyond merging.

**Decision:** Stripe remains in **sandbox/test mode**. Do not connect live
keys, do not flip to live mode, do not collect real card details — until
the `/capture` MVP works end-to-end.

**Why:** `bobert.ai/upgrade` was live and collecting real credit card
details for a 30-day trial, promising *"Full capture workflow, AI intel,
contact enrichment."* At the time of this decision there was no product
behind the paywall:

- `/capture` did not exist
- The homepage phone mockup was a static image, not a working app
- Nothing a trial user could actually use shipped

Charging for a trial of software that doesn't exist is not a sequencing
problem to optimize — it stops. Continuing risks chargebacks on a
brand-new Stripe account right at launch, plus real trust damage to early
signups.

**Sequence to reopen:**
1. Dev builds the `/capture` MVP first — minimum: photo, GPS, voice note,
   save. This is the actual product the trial promises.
2. Beta signups continue via the existing Brevo flow (bobert.ai hero
   form) — no charge, no trial start, waitlist/early-access capture only.
3. Stripe goes live (per Decision 015 — personal account, LLC deferred)
   only once `/capture` is functional enough that a 30-day trial has
   something real behind it.
4. `/upgrade` page copy should not promise features that don't exist yet
   until they're built.

**Relationship to Decision 015:** 015 remains correct that LLC formation
does not block Stripe live. 016 adds a second, earlier gate: **product
readiness**. Both must clear before Stripe goes live.

**Marketing consequence:** `/upgrade` copy must be reconciled with actual
MVP scope before live mode.

**Gate to reopen:** `/capture` works end-to-end per the Phase 1 workflow —
photo, GPS, note, save, list, reminder. Dev reports what is built and
tested, verified against the live site (not just the commit) before this
gate is treated as cleared.

**Status:** Locked.

---

## Decision 017 — Founder Decisions A-F Closed (Original Memo)
**Date:** 2026-07-28
**Owner:** Rob (BD)

`finance/FOUNDER-DECISIONS-JULY20.md` is now formally closed — all six items
answered directly in that memo, not just referenced elsewhere:

- **A:** Tracked via Aug 10-12 checkpoint, further gated by Decision 016.
- **B:** $0 starting capital / $0 buffer (Decision 013).
- **C:** Solo $59, Professional $119, Team $349, Enterprise $1,500 — confirmed, live in Stripe.
- **D:** Direct web billing (Stripe), built, activation pending Decision 016 gate.
- **E:** No annual plans at launch.
- **F:** No trade show spending in 2026.

**Status:** Locked. No Founder decisions remain pending against the original
July 20 memo.


---

## Decision 018 — Bobert AI Two-Sector Structure: FI + PI
**Date:** 2026-07-29
**Owner:** Rob (BD)

**Decision:** Bobert AI is the platform; Bobert is the brand (domain bobert.ai,
"B" Corner Signal mark per Decision 010, "Bobert" name). The platform now has
two sectors:

- **Bobert FI (Field Intelligence)** — live, public beta. /capture, /leads.
  Windshield-survey-to-lead capture: photo, GPS, AI intel card.
- **Bobert PI (Project Intake)** — in development, personal use only for now.
  /intake. Bid invite / RFP / screenshot / files in, structured project
  summary + RFI checklist + generic deal draft out.

Sector names (FI/PI) are working labels, not locked branding — the brand
identity (Bobert.ai, the mark, the name) is what's fixed per Decision 010.

**Positioning note:** Bobert is emerging as a platform for field reps solving
multiple adjacent problems (finding opportunities in the field, processing
bid/project intake) — not a single narrow tool. This should inform how
Marketing frames the brand going forward, without requiring an immediate
rebrand or new visual identity work.

**PI status:** Personal-use validation tool for Rob at CS Illumination.
No CRM integration until a real platform/stack is known (see Decision on
CS Illumination stack being unknown — not planning around assumptions).
CRM-agnostic deal draft output (generic fields, copy/print/email export)
is the deliberate interim design so the tool works today and can connect
to real platforms later once known.

**Status:** Locked. Finance and Marketing to be briefed accordingly — see
PROMPT-FINANCE-JULY29-PI-MONETIZATION.md and PROMPT-MARKETING-JULY29-FI-PI-BRAND.md.


---

## Decision 019 — Beta Strategy: Closed Beta First, No Billing Gate
**Date:** 2026-07-29
**Owner:** Rob (BD)
**Reconciled from:** Marketing session TEAM_SYNC.md draft — content verified real
(confirmed against live /account page), but was never actually written to this
ledger despite being cited as "DECISION 019." Logged properly here now.

**Decision:** Web PWA closed beta runs first, with no free-trial gating or
billing friction during the beta period — beta members get full access, no
charge, explicitly to gather feedback on accuracy before asking for payment.
This is consistent with, not a replacement for, Decision 016 (Stripe stays
in test mode until /capture is proven).

**Status:** Locked.

---

## Decision 020 — Apollo Free-Tier for Beta Contact Enrichment
**Date:** 2026-07-29
**Owner:** Rob (BD)
**Reconciled from:** Marketing session TEAM_SYNC.md draft, originally
mis-numbered "Decision 018" (collided with the real Decision 018 — FI/PI
two-sector structure). Content verified consistent with the live product
(/account page confirms beta-member framing) but renumbered here since it
was never actually written to this ledger.

**Decision:** Apollo is used on its free-credit tier for contact enrichment
during beta. Finance must complete and sign off on a full cost model
(see FINANCE-APOLLO-COST-JULY28.md) before any paid Apollo upgrade is
authorized — consistent with Decision 013 (no discretionary spend until
beta proves revenue).

**Open dependency:** Finance's July 29 vendor cost model (see TEAM_SYNC.md)
recommends PDL (People Data Labs) over Apollo on cost/TOS grounds. This
decision covers the free-tier-during-beta arrangement specifically: it does
not pre-decide the paid vendor choice once beta ends. Dev to confirm which
vendor (Apollo continuing on a paid tier, or a switch to PDL) before that
gate closes — see PROMPT-DEV-FI-JULY29.md.

**Status:** Locked (free-tier-during-beta only). Paid-vendor choice remains
open pending Dev confirmation.




---

## Decision 021 — Beachhead Confirmed: Construction-Project Ecosystem, Lighting/Electrical First
**Date:** 2026-07-30
**Owner:** Rob (Founder)
**Triggered by:** Marketing's site audit (`marketing/SITE-AUDIT-JULY29.md`) found the live
bobert.ai "Who It's For" section conflicts with Decision 004 — it features Real Estate and
Landscaping, neither of which is in 004's locked beachhead or expansion list.

**Decision:** The target market is not a fixed trade checklist — it is anyone with a hand in
building or bringing a construction project together (contractors, subcontractors by trade,
manufacturers' reps, suppliers). This is consistent with, and clarifies rather than replaces,
Decision 004. Real estate transactions are explicitly a different business (property sale,
not construction delivery) and are not part of the beachhead. Landscaping/exterior maintenance
is not part of the current beachhead either.

**Current live beachhead:** Rob's own vertical — lighting and electrical field sales, consistent
with CS Illumination. Expansion to other construction trades (HVAC, roofing, solar, signage,
and beyond) happens as revenue and capacity allow, per the revenue-first mandate (Decisions 013,
014) — not before.

**Action:** bobert.ai's "Who It's For" section must be revised to drop Real Estate and
Landscaping and reflect construction-project framing, led by lighting/electrical as the concrete,
credible example. This also affects `marketing/WALKTHROUGH-30SEC-SCRIPT.md` v1.2, which was built
neutral across the old four-audience set — Marketing to revise once this lands.

**Status:** Locked.

---

## Decision 022 — Operating Principle: "How do we be better every day?"
**Date:** 2026-07-30
**Owner:** Rob (Founder)
**Triggered by:** Marketing's proposal in `marketing/SITE-PLAN-JULY29.md`, Section "Motto."

**Decision:** "How do we be better every day?" (corrected wording — "every day" as two words,
adverb form) is locked as Bobert's internal operating principle. It is explicitly NOT a tagline
and does not replace or share billing with Decision 007 ("See what others drive past.").

**Public expression:** a quiet footer line ("We ship, we listen, we fix it. Every day.") plus a
new `/changelog` page as its primary, falsifiable proof — dated, plain-language entries of what
shipped and when, including fixes, not just features. The principle may appear in the footer,
`/changelog`, an about page, and internal docs. It may NOT appear in the homepage hero, adjacent
to the tagline, in the wordmark lockup, or in paid ads.

**Status:** Locked.

---

## Decision 023 — Decision 005 Pricing Amended to Fixed Figures
**Date:** 2026-07-30
**Owner:** Rob (Founder)
**Triggered by:** Marketing's site audit flagged that Decision 005 locks pricing as ranges
($49–79 / $99–149 / $299+ / Custom), but the live site, Stripe Checkout, and TEAM_SYNC have used
fixed figures since Decision 005 was written, and 005 itself was never updated to match.

**Decision:** Per WORKFLOW.md (append, never rewrite a locked entry), this decision supersedes
Decision 005's price figures without altering 005's original text. The authoritative, current
pricing is fixed, not a range:

- Solo: $59/mo
- Pro: $119/mo
- Team: $349/mo
- Enterprise: $1,500/mo

30-day free trial terms from Decision 005 remain unchanged. This is a ledger-accuracy fix only —
it does not change what's live, since the live site and Stripe already use these fixed figures.

**Status:** Locked.

## Decision 024 — /changelog Ownership and Cadence
**Date:** July 30, 2026
**Status:** Locked

Marketing owns /changelog content — translating Dev's technical commits into
plain, user-facing language per Decision 022's "falsifiable proof" requirement.
Cadence is triggered by any user-visible ship, not a fixed schedule.

## Decision 025 — Beta Access Architecture: Single Domain, Both Tools Gated
**Date:** July 30, 2026
**Status:** Locked

bobert.ai remains the single live domain — no separate staging/beta site.
Both FI and PI are personal + colleague-testing phase right now, not open
public beta for either. Homepage is a general overview/portal for the Bobert
system, linking out to each tool. Goal: scale the current build up in place
to a public-launch-ready state once feedback lands, then open for business
signups. Both /capture (FI) and /intake (PI) get a lightweight passcode/
invite gate — not full auth, just enough that only people Rob shares the
link with can get in.
---

## Decision 026 — MI (Market Intelligence) Sector Added
**Date:** 2026-08-10
**Owner:** Rob (Founder/CEO)
**Recorded by:** Dev session, single-session model.

**Decision:** Bobert adds a third sector, **MI (Market Intelligence)**, alongside
FI and PI, live at `/market`. Given a company URL or name, MI returns a
scored profile assessing fit against Bobert's target vertical.

**Scoring framework:** Modeled on Rob's LPA CSI prospect-scoring
methodology (data center, distribution/warehouse, design-build/GC, and
electrical/MEP verticals — confirmed unrelated to CBMC/day-job work).
Each result includes:
- `sector` / `accountType` — e.g. "Distribution / Warehouse", "Owner /
  Developer / Operator"
- `fitScore` (0-100) and `priority` (A/B/C)
- `growthSignal` and `activePipeline` — specific active-project detail
  when search results support it; explicitly states when they don't,
  rather than inventing figures
- `timing` (NOW / DEVELOP / SECONDARY / UNKNOWN)
- `reasonToCall` and `nextAction`
- `targetContacts` — **role titles only** (e.g. "VP of Construction"),
  never named individuals

**No new vendor spend:** Reuses the existing Tavily (web search) + Groq
(synthesis) pattern already live in `api/capture-intel.js` for FI. No new
API keys, no new cost, no Decision-013 spend gate triggered. Contact
enrichment (Apollo vs. PDL, raised earlier and left unresolved) remains a
**separate, still-open decision** — MI does not depend on it and works
from public web search alone.

**IndexedDB:** MI's future persistence (if/when results are saved) gets
its own namespace, `"bobert-market"` / `"companies"` — never shares FI's
`"bobert-db"` or PI's `"bobert-intakes"`, per the existing per-sector
isolation rule.

**Access:** MI is served at `/market`, ungated — same as FI/PI before
Decision 025's passcode gate. `FI_PASSCODE` remains unset by choice
(Rob wants to send `bobert.ai` to colleagues for testing first).

**Verified live:** Tested against real companies (Prologis, Turner
Construction) via both direct API call and browser — all fields render
correctly, no fabricated data observed, "no active project found" stated
honestly when search results don't support a specific figure.

**Status:** Locked.
## Decision 027 — PI Intake Character Limit Raised: 20k → 100k

**Date:** August 17, 2026
**Status:** Locked

**Problem:** `api/intake.js` rejected any pasted text over 20,000 characters
outright (no truncation, no chunking) — a real drawing PDF's extracted text
routinely exceeds this, so intake failed every time on real-world documents.

**Root cause:** The 20,000-char limit was an arbitrary guard, not a real
constraint. The Groq prompt sent to `llama-3.3-70b-versatile` combines a
fixed-size instruction/schema block with the raw pasted text appended once
at the end — no per-chunk merging occurs. The model's context window is
128k tokens; a 100,000-character document (~25k tokens) plus schema
overhead fits comfortably inside that.

**Fix:** Raised the limit to 100,000 characters (commit `655bcab`). No
chunking logic added — not needed at this document size, and chunking
would have introduced real complexity (the schema's `deal`, `flags`, and
`box_folders` fields are whole-document judgments, not per-chunk facts,
so merging partial results across chunks is non-trivial and was avoided
rather than built speculatively).

**Open item:** Groq per-key/tier token-per-minute rate limits were not
verified against this change — worth confirming in the Groq console.
If a genuinely huge drawing set (well beyond 100k chars) causes a Groq
response to hit `max_tokens: 2000` and get truncated, that will surface
as a "Failed to parse AI response as JSON" error, not a length-limit
error — a different bug, revisit `max_tokens` if seen.
## Decision 028 — Groq Model Migration: llama-3.3-70b-versatile Deprecated

**Date:** August 18, 2026
**Status:** Locked

**Problem:** PI intake (`api/intake.js`) started returning `500 Internal Server
Error` with message "The model `llama-3.3-70b-versatile` does not exist or
you do not have access to it." Discovered while testing the fixture-schedule
hybrid extraction feature (Decision 027 follow-on work) — unrelated to that
feature, but blocked verifying it end-to-end.

**Root cause:** Groq deprecated `llama-3.3-70b-versatile` on June 17, 2026
(per Groq's official deprecations page), recommending migration to
`openai/gpt-oss-120b` or `qwen/qwen3.6-27b`. This broke every Bobert
pipeline hardcoding that model string — confirmed both `api/intake.js`
(PI fixture/bid intake) and `api/capture-intel.js` (MI synthesis, Decision
026) were affected. Both had been silently broken since the deprecation
took effect; the failure only surfaced now because PI intake was
exercised directly today.

**Fix:** Migrated both files' `model:` field from `llama-3.3-70b-versatile`
to `openai/gpt-oss-120b` (Groq's recommended general-purpose replacement,
chosen over `qwen/qwen3.6-27b` for closer behavioral parity with
structured-JSON-schema extraction tasks). Commits `87ce368` (intake.js)
and `23db274` (capture-intel.js).

**Open item:** No other files were checked for the same hardcoded model
string beyond these two. If any other Groq-calling code exists in the
repo, it should be audited for the same deprecated reference.

**Lesson:** A third-party model deprecation can silently break production
functionality with no code change on our side. Worth periodically checking
Groq's deprecations page (https://console.groq.com/docs/deprecations) for
any model names referenced in the repo, rather than discovering it via a
live failure.
