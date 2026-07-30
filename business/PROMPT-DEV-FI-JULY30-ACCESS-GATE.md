From BD — July 30, new item for Development (FI). Correction to how we've been describing FI's beta status — worth reading in full.

Rob clarified today: **FI is personal + colleague-testing phase, same as PI** — not open public beta. The goal is to build the current site/tools up to a scalable, public-launch-ready state using feedback from this private round, then open it up for real business signups. bobert.ai stays the one live domain throughout (no separate staging site) — the homepage is meant to work as a general overview of the Bobert system, with links out to each tool for beta/private testing.

That's mostly how things already work, with one real gap: **`/capture` is currently open to anyone who finds the site.** The homepage's "Open Bobert" nav button links straight to it — no passcode, no invite check, nothing gating who gets in. That's inconsistent with "personal use, I control who gets the link" — right now literally anyone landing on bobert.ai can start using it.

**Ask: add a lightweight access gate to `/capture`, `/leads`, and `/account`.** Same minimal approach as what's going to PI's `/intake` (see `PROMPT-DEV-PI-JULY30-ACCESS-GATE.md` if useful as a reference — same spec, applied here):
- A single shared passcode or invite token that gates entry — no per-user accounts, no sessions, no database table.
- Failing the check shows a plain "not available" state, no hints about what's behind it.
- Ideally an env var Rob can rotate without a redeploy; a redeploy-to-rotate is fine if that's simpler.

**Real-world wrinkle this has that PI doesn't:** FI already has live users and real captured data (e.g., the O'Shea Orthopaedic test capture). Adding a gate now means anyone currently using it will need the passcode going forward. Please flag back before pushing if you think this will break something for existing testers — better to check than to lock someone out silently.

**Not in scope:** real user accounts, per-tester permissions, anything resembling eventual paid-tier auth. This is purely "keep it from being a fully open door while we're still in private testing," nothing more.

Before pushing: pull `main` first, confirm the change with `git diff`, update only the Development (FI) section of `business/TEAM_SYNC.md` in the same commit, and paste back the real `git diff --stat` / `git log -1` output.
