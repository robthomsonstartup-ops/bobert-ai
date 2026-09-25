# Bobert Intelligence Layer Contract

## Purpose
The web UI should not contain model-specific intelligence logic. It sends captured evidence to a server-side ingestion endpoint and receives structured JSON.

## Input
- account_hint (optional)
- contact_hint (optional)
- source_url (optional)
- source_type: email | screenshot | url | article | note | document
- source_text (optional)
- file (optional)

## Output
```json
{
  "entity": {"account": {}, "contact": {}},
  "facts": [{"text":"", "source":"", "confidence":"high|medium|low"}],
  "inferences": [{"text":"", "basis":[]}],
  "unknowns": [""],
  "identity_conflicts": [],
  "proposed_updates": [],
  "next_action": {"action":"", "reason":""}
}
```

## Rules
1. Preserve the original evidence.
2. Never turn an inference into a fact without evidence.
3. Resolve identity using multiple signals where available: email, domain, source, title, account association.
4. Flag conflicts instead of guessing.
5. Keep account-specific facts separate from cross-account patterns.
6. Return concise structured output so the UI can commit it without another AI call.
7. Model providers are interchangeable. API keys never live in the browser.

## Provider architecture
`Browser → Bobert API → provider adapter → model → normalized JSON → Bobert memory`

A provider adapter can use Claude, OpenAI, Gemini, or another capable model without changing the Bobert data model or UI.

## Immediate implementation
Build `/api/ingest` as the single ingestion contract. Start with one provider adapter, then add routing/fallbacks after the workflow is proven.
