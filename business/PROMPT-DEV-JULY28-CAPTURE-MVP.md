Rob's direction for Dev — updated, effective today (July 28). This REPLACES the earlier "flip Stripe to live mode now" instruction — hold that.

Rob caught something important: bobert.ai/upgrade is live and collecting real credit card info for a 30-day trial, promising "Full capture workflow, AI intel, contact enrichment." But /capture doesn't exist — there's no actual app behind the paywall. The homepage phone mockup is a static image, not a working product. Decision 016 (business/DECISIONS.md) locks this: Stripe stays in sandbox/test mode until there's a real product to trial.

New priority: build the /capture MVP.

Core workflow per PROJECT_CONTEXT.md / NORTH_STAR.md: Open app → Take or upload a photo → Capture GPS/location → Record or type a note → Create opportunity → Save → Set a follow-up reminder → View and manage saved opportunities

Minimum for a real trial to mean something:

1. `/capture` page (standalone, works as PWA "Add to Home Screen") with:
   * Photo capture or upload
   * GPS auto-tag on capture
   * Voice note or typed note
   * Save opportunity → stored (IndexedDB for offline-first)
2. A basic leads list/view to see saved opportunities — even a simple list is enough for MVP
3. Follow-up reminder on save — due-date field or browser notification for MVP

Do not:
* Redesign the visual identity or rename anything
* Add features beyond this list — Phase 1 capture workflow only
* Touch the working Brevo email capture or Stripe checkout code — leave both as-is

Once /capture is working end-to-end, report back. Then we revisit flipping Stripe to live mode.

Read CURRENT_SPRINT.md and update it with no more than five focused tasks reflecting this priority before starting broad work.
