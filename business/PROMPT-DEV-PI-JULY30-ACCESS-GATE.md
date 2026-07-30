From BD — July 30, new item for Development (PI).

Rob raised a real question today: bobert.ai should stay one live domain (it already is) rather than standing up a separate staging/beta site — that's more infrastructure than the project needs right now, and Vercel already gives branch preview URLs for free if we ever need a true sandbox. Decision 025 logs the ruling.

FI is already fine as-is — it's meant to be public-facing during beta (Decision 019), and the existing "Join the Beta" / "Open Bobert" flow on the homepage is the right front door for it.

**PI is different: it's still personal-use only** (confirmed again today, not changing) — but Rob needs to be able to share the real `/intake` link with himself across devices, or eventually with a small named group, without it being publicly discoverable or something a stranger could stumble into from the homepage (note: it already isn't linked from the public nav — this is about the URL itself not being an open door if someone finds it).

**Ask: add a lightweight access gate to `/intake`.** Deliberately minimal, not a real auth system:
- A single shared passcode (or invite token in the URL) that gates the page — doesn't need per-user accounts, sessions, or a database table.
- If it fails, show a plain "not available" state — no hints about what's behind it.
- Rob should be able to change the passcode himself without a redeploy if that's easy (env var is fine); if not, a redeploy to rotate it is acceptable too.

**Not in scope right now:** real user accounts, multi-user permissions, anything resembling the eventual PI monetization/tenancy model. This is purely "keep it from being an open door," not a product feature. If it turns into more than a simple gate, stop and flag it back to BD rather than expanding scope on your own.

Before pushing: pull `main` first, confirm the change with `git diff`, update only the Development (PI) section of `business/TEAM_SYNC.md` in the same commit, and paste back the real `git diff --stat` / `git log -1` output.
