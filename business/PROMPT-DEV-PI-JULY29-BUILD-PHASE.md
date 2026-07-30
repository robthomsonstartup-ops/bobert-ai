From BD — July 29, directive for Development (PI).

Rob is shifting focus to PI for the next several sessions: UI build-out plus pushing the core concept further — get from "however a project shows up" to a structured, usable output in seconds, with zero manual re-entry.

**Where PI stands today:** `/intake` is live. Text paste works. Multi-source intake shipped July 29 (`api/intake-ocr.js` for images/PDFs/screenshots, `api/intake-url.js` for reference links) alongside the original text path. Output is a structured project summary, RFI checklist, generic deal draft, with Copy/Print/Email/Save.

**Two workstreams for this phase — pick order, both are open:**

**1. UI build-out.** The current interface was built fast to prove the extraction logic works. Now that it does, look at:
- Input flow when a project comes in as *multiple* sources at once (e.g., an email with a PDF attachment and a reference URL, plus a note Rob typed) — right now these may be handled as separate actions. Can they be dropped together in one pass?
- A review/edit step before export — extraction won't be perfect on messy real-world documents; Rob should be able to glance and correct before Copy/Print/Email/Save, not re-run the whole thing.
- Visual polish consistent with brand (Decision 010, 011 — wordmark/mark rules apply here same as FI).

**2. Speed-to-structured-output / eliminating manual entry.** This is the core value proposition worth pushing hard on: however a project shows up — bid invite email, RFP PDF, a screenshot of a text, a link to a spec sheet — Bobert PI should resolve it to one clean structured result in seconds, without Rob typing anything by hand. Things worth exploring:
- Can OCR (images/PDFs) and URL fetch run in parallel rather than sequentially, so a packet with 3 attachments doesn't take 3x as long?
- Can PI accept a forwarded email directly (paste the raw email, or eventually an email-in address) and correctly separate the body text from any linked/attached documents?
- What's the fastest realistic input method for Rob's actual workflow at CS Illumination starting Aug 3 — is it paste, drag-and-drop, or something else? Worth a note to Rob asking how bid invites actually arrive (email attachment? portal download? text message?) since that shapes what "fast" means in practice.

**Constraints, unchanged:**
- No CRM integration — CS Illumination's stack is unknown (per TEAM_SYNC).
- Brand rules apply (Decisions 006, 010, 011) — this is Marketing's asset domain, Dev implements only.
- Follow `business/WORKFLOW.md`: update only the Development (PI) section of `business/TEAM_SYNC.md` in the same commit as any shipped work, check the current highest Decision number before logging anything new, never rewrite the whole TEAM_SYNC.md file.

No new Decision is needed to start this work — it's refinement of what's already live under Decision 018 (PI as a sector) and the existing PI scope. If a real product-shape choice comes up (e.g., "should PI support an email-in address," which touches infrastructure/cost), flag it to BD rather than deciding unilaterally.
