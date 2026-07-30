Rob's direction for Dev — new priority, hard deadline Monday (Aug 3).

**Context:** Rob is leaving CBMC and starting at CS Illumination (CSI) Monday. He's already built and proven a "Job Intake Assistant" workflow in a separate Claude project (bid invite → organized project summary → contacts → missing-file RFI checklist → deal draft → next action). That version is hard-wired to CBMC's specific stack (HubSpot, NetSuite, Box). He wants a version of this built into bobert.ai as a second path/module — for his own personal use at CSI, not the public Field Intelligence beta. Goal: walk into CSI Monday with a working project intake tool.

**Do not touch Field Intelligence, /capture, /leads, or the paused Stripe work.** This is a new, separate path.

**Scope for Monday — keep it tight, this is a personal tool, not a product launch:**

Build a new page, `/intake`, on bobert.ai:

1. **Input:** A text box (or paste area) where Rob pastes a bid invite email, RFP text, or project notes. Also support pasting a screenshot/description manually for now — don't build file upload/OCR unless time allows after the core flow works.

2. **Output — organized project summary**, generated from the pasted input, structured as:
   - Project / deal info: project name, GC/customer, end client if known, location, bid due date, bid board source, status
   - Contacts extracted: name, company, role, email, phone
   - Lighting quote requirements checklist: drawings, electrical drawings, fixture schedule, specs, controls, BOM, addenda, alternates, approved manufacturers, bid form — each marked present/missing/unknown based on what's in the pasted text
   - Missing info / RFI list, prioritized
   - Recommended next action + follow-up date
   - A generic "deal draft" block (project name, stage, priority, next step) — NOT HubSpot-specific, since we don't yet know what CRM CSI uses. Keep field names generic (deal_name, stage, priority, next_action, follow_up_date) so it can be mapped to whatever CRM comes later.

3. **Storage:** Save each intake to a simple list (same pattern as /leads — reuse that data approach if it's fast) so Rob can come back and see prior intakes. Doesn't need to be fancy — a list of saved intake summaries is enough for Monday.

4. **No CRM integration yet.** We don't know CS Illumination's stack. Output should be copy-pasteable/exportable (or at minimum easy to read and manually transfer) rather than pushed anywhere automatically. This can be revisited once Rob confirms what CSI actually uses.

**This is personal-use only for now** — don't build multi-tenant logic, billing, or anything tied to the Solo/Pro/Team/Enterprise pricing tiers. Simplest possible version that actually works by Monday.

Report back on what's built and working, and flag anything that won't make the Monday deadline so Rob can prioritize.
