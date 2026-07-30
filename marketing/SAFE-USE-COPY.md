# Bobert — Safe-Use Copy
**Version:** 1.0
**Date:** July 29, 2026
**Owner:** Marketing (copy). **Implementation:** Dev — Marketing does not edit code.
**Status:** Ready for Dev implementation. No BD sign-off needed on safety language; flag if any placement is contested.

---

## Why This Exists

Bobert's entire pitch is driving-adjacent. The tagline is *"See what others drive past."* The hero says *"Capture it in seconds — before you leave the curb."* The audience drives a territory all day.

**Today the site contains zero safe-use language.** Verified: no occurrence of "distracted," "while driving," "pull over," or "safety" in `index.html`.

That is a problem on two independent grounds:

1. **Actual harm.** If the product's implied workflow is "spot it and grab it as you pass," people will use a phone behind the wheel. Distracted driving kills. This is not a hypothetical liability abstraction.
2. **Liability.** A product whose marketing implies in-motion phone use, with no countervailing guidance anywhere, is a bad position to be in — with insurers, with an enterprise buyer's procurement review, and in the worst case in front of a jury.

The fix is cheap and does not weaken the pitch. "Capture it in seconds" is *more* compelling when the seconds happen after you stop, because it means the task is small enough not to require a desk.

---

## Core Principle

**Bobert is for the moment after you stop — not the moment you pass.**

Say this consistently. It costs nothing: the product's real value is that capture takes seconds, which is exactly why it can wait until the vehicle is stationary. Nothing about the value proposition requires motion.

---

## Copy Blocks

### 1. Capture screen — persistent, in-app

Highest-priority placement. This is where intent converts to behavior.

> **Park first.** Bobert works best stopped. Never capture while driving.

Short, imperative, no hedging. Should be visible on the capture screen, not buried in a settings page or a first-run dialog the user dismisses once.

### 2. Onboarding / first run — one-time acknowledgment

> **Before you start**
>
> Bobert is built for field professionals who spend the day driving. Use it parked, pulled over, or stopped — never in motion.
>
> Distracted driving is a leading cause of roadway deaths. No opportunity is worth it. If you see something while moving, pull over safely first — a photo taken thirty seconds later is worth exactly as much.
>
> [ I understand ]

The last sentence does the persuasive work: it removes the perceived cost of waiting.

### 3. Site — near the hero or capture-flow section

> Bobert is designed to be used stopped. Pull over, capture in seconds, get back on the road.

One line. Placed where the capture flow is described, so it reads as product guidance rather than boilerplate.

### 4. Footer — standing statement

> **Safe use:** Bobert is intended for use while stopped. Never use a mobile device while driving. Obey all applicable traffic laws.

### 5. Video and all motion assets

Any asset showing a windshield, a moving vehicle, or a driver's POV must resolve to a **stationary** vehicle before the phone appears on screen. See the correction to `WALKTHROUGH-30SEC-SCRIPT.md` noted below.

### 6. `/upgrade` and any paid-conversion page

Once that page is reconciled to actual scope, carry the footer statement. A page collecting payment details should not be the one page with no safe-use language.

---

## Tone

- **Direct, not preachy.** One or two sentences. A lecture gets dismissed, and a dismissed warning is worse than a short one.
- **Never joke about it.** No winking, no "we know you'll do it anyway."
- **Do not bury it in Terms.** Terms of Service protect the company. Copy at the point of use protects the person. Do both; they are not substitutes.
- **Do not soften to "try to avoid."** Either it's a rule or it isn't.

---

## Do Not Say

| Avoid | Why |
|---|---|
| "Capture it as you drive by" | Instructs the exact hazard |
| "One-handed while you roll" | Same |
| "Don't slow down for opportunity" | Reads as encouragement not to stop |
| "Hands-free capture" | Implies in-motion use is engineered-for and therefore safe |
| Anything implying speed *requires* motion | The speed claim is about task length, not vehicle state |

**Note on the existing tagline:** *"See what others drive past."* is locked (Decision 007) and does not need to change. It describes **noticing**, not capturing — the seeing happens while driving, the capturing happens stopped. That distinction is defensible, but only if the safe-use copy above actually ships. Without it, the tagline is the only signal, and it points the wrong way.

---

## Self-Correction — Walkthrough Script

`marketing/WALKTHROUGH-30SEC-SCRIPT.md` v1.1 (Marketing, July 27) opens with three driver-POV shots through a windshield, then cuts directly to a phone in hand. As written, that sequence depicts capture while driving — the exact behavior this document prohibits.

That was my error and it is corrected in v1.2: the vehicle visibly stops before the phone appears. Flagged here rather than quietly amended, because the script may already have been read by BD or a production vendor.

---

## Implementation Checklist (Dev)

- [ ] Capture screen — persistent "Park first" line (block 1)
- [ ] Onboarding — one-time acknowledgment (block 2)
- [ ] `index.html` — one line near capture-flow section (block 3)
- [ ] `index.html` footer — standing statement (block 4)
- [ ] `upgrade.html` / `success.html` footer — same statement (block 6)
- [ ] Confirm Terms of Service carries a distracted-driving clause (separate from the above, not a replacement)

---

*Marketing owns this copy. Dev owns placement. If any wording is changed in implementation, route it back to Marketing — safety language should not drift silently.*
