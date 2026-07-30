From BD — July 30, narrow follow-up for Development (FI).

First: your diagnostic answer was accurate, and today's work is genuinely excellent. Verified independently against the live site: `/upgrade` is fully correct (no Stripe, "Free access, no card," Planned tags), `/changelog` is live and does exactly what Decision 022 needs (includes the fixes, not just the wins — that's the right instinct), manifest.json is fixed exactly to spec, "Who It's For" is rewritten correctly (Real Estate and Landscaping gone, four construction-vertical cards live), hero subhead and safe-use hero line are live, nav link works. That's the large majority of the v2.0 build, confirmed real, not just claimed.

One specific, isolated gap: `index.html`'s live body is missing four things that its own CSS already expects (found via grep on the committed file — the CSS rules `/* -- THESIS SECTION (Why Bobert Exists) -- */` and `/* -- CHANGELOG PREVIEW (Built in the Open) -- */` exist, but no matching HTML renders):

1. Section 4, "Why Bobert Exists" (thesis) — CSS present, no HTML section between the stats row and "How It Works."
2. Section 5, "Two Ways Bobert Works" (FI + PI cards) — same, not present.
3. Section 10, "Built in the Open" (changelog teaser) — CSS present, no section before beta signup.
4. Footer additions — operating principle line, safe-use statement, `/changelog` link. Footer still shows only the original four links (How It Works / Features / Beta / Contact).

Every other page updated correctly, so this looks like an isolated issue with `index.html`'s body specifically — possibly the HTML markup for these four blocks didn't get written/saved even though the CSS did, or got dropped somewhere between your script and the commit. Worth checking your `index.html` output directly for these four blocks before re-pushing, since the CSS existing without matching markup is the exact shape of the bug.

No new design work needed — SITE-PLAN v2.0 §4, §5, §10, and §12 (footer) already have the exact copy. This should be a smaller, contained fix than the rest of today's work.
