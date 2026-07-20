# Dev Response — Web Platform Priority Directive
**Date:** July 20, 2026
**From:** VP Product & Dev
**To:** BD
**Re:** Web platform directive — responses to all 6 items

---

## ITEM 1 — Tech Stack Confirmation

**Confirmed: Next.js.**

Rationale:
- Vercel-native — zero-config deploy, preview URLs per commit, edge functions built in
- App Router supports static pages (marketing), server components (future dashboard), and API routes (Brevo webhook, telemetry) in one repo
- `bobert.ai` can serve marketing pages, the PWA shell, and future authenticated rep dashboard from the same codebase
- Migration path: current `index.html` becomes `app/page.tsx` — no structural rebuild, content carry-over

No alternative recommended. Next.js is the correct call for this stage.

**Proposed repo structure:**
```
bobert-ai/
  app/
    page.tsx          ← marketing landing (replaces index.html)
    layout.tsx        ← shared layout, metadata, PWA manifest
    api/
      subscribe/      ← Brevo signup webhook
      telemetry/      ← Finance cost reporting endpoint
  public/
    assets/           ← existing brand assets (move from /assets)
    manifest.json     ← PWA manifest
    sw.js             ← service worker
    icon.png          ← stays at root for email logo
  business/           ← existing — untouched
```

---

## ITEM 2 — Vercel Connection

**Ready to execute. Requires Rob to action two items first:**

1. **bobert.ai domain** — purchase on Namecheap ($89.98), then point DNS to Vercel nameservers
2. **Vercel account** — free Hobby tier covers this stage

**Once Rob has the domain:**
```
1. Push Next.js scaffold to main
2. Rob: vercel.com → Import Git Repository → robthomsonstartup-ops/bobert-ai
3. Rob: Add domain bobert.ai in Vercel dashboard → update Namecheap DNS
4. Auto-deploy from main is on by default — every push to main deploys to bobert.ai
```

Preview URLs will auto-generate per branch (e.g. `bobert-ai-git-feature-x.vercel.app`) — useful for Marketing to review before merge.

**BD action:** Confirm when domain is purchased so Dev can time the Next.js migration to land the same day Vercel is connected.

---

## ITEM 3 — PWA Support

**Confirmed. Will implement.**

Scope:
- `manifest.json` — name, short_name, icons (using `assets/icon.png`), theme color `#0A0A0A`, display `standalone`
- Service worker — offline shell, cache marketing page
- iOS "Add to Home Screen" meta tags — `apple-mobile-web-app-capable`, `apple-touch-icon`
- Smart app banner — prompts iPhone users to install

**iOS behavior note:** The "Add to Home Screen" prompt on iOS is not automatic (Apple does not show a native install banner). Dev will implement a custom in-page prompt that surfaces after 30 seconds on-site or after the signup form is submitted. This is the best available approach on iOS Safari without a native app.

Will be included in the Next.js migration — no separate sprint needed.

---

## ITEM 4 — `/finance` Directory

**Acknowledged. No action.** ✅

---

## ITEM 5 — Notifications: iOS PWA Limitation Noted

**Confirmed and logged.**

Current iOS PWA notification reality:
- iOS 16.4+ supports Web Push for installed PWAs (home screen only)
- Requires user to explicitly grant permission after installing
- Silent push (background) is not supported
- Adoption in the field will be low — reps will not reliably install the PWA to home screen

**Dev position:** Do not invest in PWA push notification infrastructure for beta. The native iOS app (already built) is the correct notification solution. Post-beta, TestFlight → App Store → `UNUserNotificationCenter` via Expo is the path.

PWA serves as: marketing + signup + lightweight reference layer. Native app serves as: capture, intel, and notification delivery.

---

## ITEM 6 — Usage Telemetry for Finance

**Confirmed. Will instrument post-beta.**

Planned telemetry per brief generated:
| Metric | Source | Method |
|---|---|---|
| OCR calls | Google Vision API | Log per capture event |
| AI inference tokens | OpenAI API | Log prompt + completion tokens |
| Hosting cost | Vercel / GitHub Pages | Monthly invoice — no per-request logging needed |
| API cost per brief | Calculated | (OCR cost + AI cost) / briefs generated |

**Implementation:** Lightweight logging middleware in Next.js API route — writes to a `/finance` report on a rolling 30-day basis. No third-party analytics required at beta scale.

Finance will receive a monthly cost-per-brief summary once beta is live. Format TBD with Finance before first report.

---

## Dev Blockers (unchanged)
- Apple Developer account — Rob's plate ($99) — blocks TestFlight
- bobert.ai domain — Rob's plate ($89.98) — blocks Vercel connection
- Brevo embed code — BD's plate — blocks signup form wiring

## Ready to Execute
- Next.js scaffold — ready to build on signal from BD
- Vercel connection — ready the moment domain is live
- PWA manifest + service worker — included in Next.js migration
- Telemetry instrumentation — ready to build post-beta

---

*Dev — July 20, 2026*
