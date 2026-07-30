Rob's direction for Dev — fast follow on Project Intake (PI), not blocking Monday. Small, cheap addition.

**Context:** The current "Copy Summary" button on /intake copies plain text to clipboard. Good default, but add two more ways to get the intake out of the app — print/PDF and email. Keep it simple: no new backend, no CRM integration yet (that comes later once a real platform is known — this is just about getting the output into Rob's hands easily today).

**Add two buttons next to the existing Copy Summary:**

1. **Print / Save as PDF** — call `window.print()` with a print-specific stylesheet (`@media print`) that hides the nav bar, tabs, and buttons, and formats the intake card content cleanly on the page (readable font size, page-break-friendly section breaks). This lets Rob "Print" and choose "Save as PDF" from the OS print dialog — zero new libraries needed, works on any device.

2. **Email** — build a `mailto:` link using the same plain-text summary the Copy Summary button already generates, pre-filled as the email body, with a subject line like "Job Intake — [Project Name]". This opens Rob's default mail app with the intake ready to send to himself or anyone else — no backend, no email-sending service needed.

Both should reuse the exact same plain-text formatting logic already in `copyIntake()` — don't duplicate the summary-building logic, just route the same string to a different output (print, mailto, or clipboard).

**Explicitly not in scope right now:** Any CRM push, API integration, or webhook. Those come later once Rob knows what platform(s) he's actually connecting to. This is just: make the finished intake trivially easy to get out of the browser and into Rob's hands (print, email, or copy) today.
