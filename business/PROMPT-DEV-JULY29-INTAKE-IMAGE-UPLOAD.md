Rob's direction for Dev — fast follow on Project Intake (PI), not blocking Monday. Supersedes the narrower "add image upload" version of this ask — this is the full scope.

**Context:** /intake works well on pasted text (tested against a real public bid notice — good extraction). But a real intake rarely arrives as one clean text block. In practice Rob will have some mix of: a bid invitation email, a screenshot of the BuildingConnected dashboard/opportunity page, a shared Google Drive (or similar) link to a folder of drawings, and/or actual PDF files (fixture schedule, specs, addenda) sitting on his computer. The tool needs to assemble ALL of that into one intake record, not force him to pick a single input type.

**Ask: Multi-source intake assembly.** A single intake session should accept, in any combination:
1. Pasted text (existing — bid invite email, RFP excerpt, notes)
2. One or more screenshots/images (bid board dashboard, project page) — reuse whatever vision-model approach already powers /capture's "Analyze & Generate Intel" step
3. One or more uploaded files, especially PDFs (fixture schedule, drawings, specs, addenda) — extract text/tables from these to populate the quote checklist with real data instead of "unknown"
4. An optional link field (Google Drive folder, bid board URL, etc.) — stored as a reference on the record even when it can't be auto-fetched (see limitation below)

All provided inputs get combined into ONE synthesis call to the AI, producing a single unified intake record — not separate records per input. E.g., project name/dates/contact might come from the screenshot, while the fixture schedule checklist item gets marked "present" because a spec PDF was uploaded and parsed.

**Suggested approach:**
1. Replace/extend the single textarea on /intake with a combined input area: text box + an upload zone accepting images and PDFs (multi-file), same visual pattern as /capture's photo UI.
2. Route images to the vision-capable model already used in /capture. Route PDFs through a PDF text/table extraction step (even basic text extraction is a big step up from "unknown" on the checklist) before including that content in the synthesis prompt.
3. Combine all extracted text/data from every input (pasted text + OCR'd images + extracted PDF text) into one prompt to the AI, producing the same single JSON structure /intake already returns.
4. Keep the existing paste-text-only path working exactly as it does now — this is additive.

**Known limitation — not a build target:** Password-protected bid board links (BuildingConnected, SmartBid, etc.) can't be auto-fetched — Bobert has no way to log in on Rob's behalf. Workflow for that case stays manual: Rob logs in himself, then pastes the rendered text or uploads a screenshot/downloads the files and uploads those instead. The link field still captures the URL for reference even when content had to be retrieved manually.

One nuance worth a quick look, not a requirement: a genuinely public "anyone with the link" Google Drive share (no login needed) may be fetchable directly, unlike an auth-walled bid board. If it's a cheap addition once the file-upload path exists, fine — but don't spend real time on link-fetching logic. Uploading the actual files is the reliable path and should be the primary supported flow. Don't build any kind of authenticated/login-based fetching — that's out of scope entirely.

**Priority:** After Monday's CSI walk-in, not before — the text-paste version already works well enough to demo. Don't let this delay what's already working. Report back on scope/timeline once you've looked at how /capture's vision step is wired, since that reuse is the fast path here.
