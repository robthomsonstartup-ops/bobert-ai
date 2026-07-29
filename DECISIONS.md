# DECISIONS.md — Bobert

Architecture and product decisions, with rationale. Add new decisions at the top.

---

## DECISION 019 — 2026-07-28 — Beta first; free trial gating deferred to launch

**Decision:** Run a closed beta with the web PWA before enabling the free trial → subscription flow. Beta users get free access — no paywall, no trial timer. Stripe stays in sandbox/test mode during beta. After beta feedback is collected and the product is validated, flip to: free trial (30 days) → paid subscription.
**Rationale:** Charging before the product is proven creates friction and chargeback risk. Beta is the validation step — get real reps using it, collect feedback, then monetize.
**Native app:** Hold as an option post-beta. Evaluate based on beta user behavior (how often they use it on mobile web vs. requesting a native install).
**Trigger to enable billing:** Beta feedback positive, contact enrichment accuracy validated, unit economics confirmed by Finance (per Decision 018).

---

## DECISION 010 — 2026-07-11 — Visual System: Hippie High Contrast (LOCKED)

**Decision:** Marketing design handoff supersedes DECISION 009 primary/background values. New "Hippie High Contrast" palette is the single source of truth across all UI surfaces.

| Role | Hex | Notes |
|---|---|---|
| Primary Navy | `#0B1D2A` | Replaces `#1A1A1A` |
| Bobert Red | `#DC2626` | Unchanged |
| Teal | `#0A7C7B` | Voice / active states |
| Sage | `#6EA96F` | Success |
| Amber | `#FFC857` | Warning |
| Orange | `#FF7A45` | Caution |
| Warm White (bg) | `#FAFAF8` | Replaces `#F0F0F0` |
| Cool Gray | `#6B7280` | Helper text (unchanged) |
| White | `#FFFFFF` | Cards (unchanged) |

**Typography:** Header 28pt Bold · Section Title 16pt Bold/Caps · Field 17pt Semibold · Helper 14pt · Caption 13pt

**Approved by:** Marketing design handoff 2026-07-11
**Supersedes:** DECISION 009 primary and background values

---

## DECISION 009 — 2026-07-11 — Official Bobert Color Palette (SUPERSEDED by DECISION 010)

**Decision:** The following palette is the single source of truth across all departments. No further discussion. Future changes go through the RFI process.

| Role | Hex |
|---|---|
| Primary Black | `#1A1A1A` |
| Bobert Red | `#DC2626` |
| Light Gray (app bg) | `#F0F0F0` |
| Mid Gray (secondary text) | `#6B7280` |
| White | `#FFFFFF` |

**Approved by:** Business Development, Marketing, Development
**Why:** Development palette adopted for complete UI system and softer mobile colors. Red aligned to Marketing's `#DC2626` for better contrast at small sizes. Marketing's `#1F2937` Graphite held in reserve.

---

## 2026-07-10 — Project management files added to repo

**Decision:** Use 7 markdown files (README, PROJECT_CONTEXT, NORTH_STAR, CURRENT_SPRINT, DECISIONS, IDEAS, CHANGELOG) as the single source of truth for all project context.
**Why:** Ensures Claude, ChatGPT, and any future developer can be onboarded instantly by reading these files in order. No wiki, no Notion, no Jira — just git.

---

## 2026-07-10 — App name: Shakedown

**Decision:** Lock in "Shakedown" as the app name (full: Shakedown — Opportunity Intelligence).
**Why:** All other candidates had trademark conflicts:
- FieldIQ → taken
- CurbIQ → too close to existing brand
- Ripple → XRP/crypto conflict
- Cassidy → Cassidy AI
- DealIQ → CBRE/AuctusIQ
- Prophet → multiple CRMs
- Terrapin Station → Grateful Dead trademark
- Shakedown → clear, Dead reference (Shakedown Street), memorable
**Reference:** Shakedown Street = the informal marketplace in the GD parking lot. Where the real deals happen.

---

## 2026-07-10 — Remove expo-av, stub voice notes

**Decision:** Remove expo-av entirely. Comment out all Audio imports. Stub voice note UI elements.
**Why:** expo-av is not supported in Expo Go SDK 57. Including it causes a hard crash: "Cannot find native module 'ExponentAV'". Voice notes are a nice-to-have — they require a full dev build (EAS Build) which is Sprint 2.

---

## 2026-07-10 — Remove expo-router, use react-navigation only

**Decision:** Delete `src/app/` directory. Set `main` in package.json to `node_modules/expo/AppEntry.js`. Remove expo-router plugin from app.json.
**Why:** SDK 57 default template installs expo-router which conflicts with react-navigation. Can't use both. React-navigation is already fully implemented — expo-router would require a full rewrite.

---

## 2026-07-10 — Two-folder architecture

**Decision:** `cbmc-field-leads` = source of truth (mounted, editable by Claude). `FieldIQ` = running SDK 57 project (not mounted, copy files manually).
**Why:** Upgrading the source folder from SDK 54 to SDK 57 in-place risked breaking the working codebase. Keeping them separate allows editing without breaking the running app. FieldIQ is disposable; cbmc-field-leads is permanent.

---

## 2026-07-10 — expo-location + expo-sharing only in app.json plugins

**Decision:** Only `expo-location` and `expo-sharing` listed as plugins in app.json.
**Why:** Any plugin listed in app.json must be installed as a native module. expo-camera and expo-media-library were listed but not installed in FieldIQ → caused PluginError on startup. expo-image-picker replaces camera without requiring a plugin entry.

---

## 2026-07-10 — Navigation: nested tab+stack pattern

**Decision:** Navigate to LeadDetail from outside the Leads tab using:
```javascript
navigation.navigate('Leads', { screen: 'LeadDetail', params: { leadId, justCaptured: true } })
```
**Why:** CaptureScreen is a tab screen. LeadDetail is inside the Leads stack. `navigation.navigate('LeadDetail', ...)` throws "NAVIGATE to LeadDetail not handled" because it's scoped to the wrong navigator.

---

## 2026-07-10 — AsyncStorage for local persistence

**Decision:** All lead data stored locally on device via AsyncStorage. No cloud database in MVP.
**Why:** Zero backend complexity. Works offline. Reps in the field often have bad connections. CSV export to email/Slack gives the team access to the data without needing a sync layer.
**Trade-off:** Data lives on device — if rep loses phone, leads are gone. Acceptable for MVP. Cloud sync is Sprint 3+.

---

## 2026-07-28 — DECISION 018: Apollo.io free credits for beta; Finance to model scale cost

**Decision:** Use Apollo.io free tier credits for contact enrichment during beta. Do not upgrade to paid Apollo plan without Finance sign-off.
**Finance action required:** Research Apollo.io pricing tiers, estimate credit burn rate per active user, and include Apollo cost in the Bobert unit economics model (cost per user per month vs. subscription revenue). Bring recommendation to Rob before beta closes.
**Why:** Free credits are sufficient to prove the contact enrichment value prop in beta. Scaling to paid requires knowing the margin impact — per Decision 013 (no discretionary spend until beta proves revenue).
**Constraint:** If free credits run out before Finance review is complete, pause Apollo enrichment rather than upgrade unilaterally.

---

## 2026-07-28 — DECISION 016: Stripe stays in sandbox until /capture MVP is live

**Decision:** Do not flip Stripe to live mode until bobert.ai/capture exists and works end-to-end. The upgrade page currently promises "Full capture workflow, AI intel, contact enrichment" — none of which exists behind the paywall yet. Collecting real payment before delivering real product is a product integrity problem.
**Trigger to flip:** /capture functional (photo, GPS, note, save, leads list, reminder) → tested on mobile → Dev reports back → then follow PROMPT-DEV-JULY28-STRIPE-LIVE.md steps.
**Why:** Avoids charging people for something that doesn't exist. Protects trust and reduces chargeback risk at launch.

---

## 2026-07-28 — DECISION 014: Stripe as billing layer; no seat enforcement in beta

**Decision:** Stripe Checkout (hosted, prebuilt) for all subscription billing. Trial period set in code (`subscription_data.trial_period_days: 30`), not in Stripe dashboard. Multi-user access on Team/Enterprise plans enforced manually during beta — Stripe handles payment only.
**Why:** No PCI burden, no upfront cost (revenue-linked % only), fastest path to billable beta. Seat enforcement requires a user database — deferred to post-beta.
**Keys:** All test-mode (`sk_test_...`) until full flow proven. Live key switch is a manual step before public launch.

---

## 2026-07-28 — DECISION 015: Vercel serverless for all API functions

**Decision:** All backend logic lives in `api/` as Vercel Node.js serverless functions. No Express server, no separate backend host.
**Why:** Zero infrastructure overhead, auto-deploys with `main`, same host as frontend. Pattern established by `api/subscribe.js` (Brevo). Webhook uses raw body stream — no bodyParser config needed for plain Vercel functions (unlike Next.js).

---

## 2026-07-10 — Brand colors: Red/Black

**Decision:** Primary Red `#E10600`, Black `#0A0A0A`, supporting grays.
**Why:** High contrast, field-readable in direct sunlight. Red CTAs pop against dark backgrounds. Aligns with CBMC's aggressive sales brand.
