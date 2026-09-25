# Bobert Intelligence API

This is the server-side boundary for AI ingestion.

## Contract

`POST /api/ingest`

Accepts multipart/form-data:

- `account_hint`
- `contact_hint`
- `source_url`
- `source_type`
- `source_text`
- `file`

Returns normalized JSON containing:

- entity
- facts
- inferences
- unknowns
- identity_conflicts
- proposed_updates
- next_action

## Security

AI provider credentials belong on the server only. Never put provider API keys in `sales.html` or browser JavaScript.

## Provider adapter

The first implementation can target Claude, but the API must expose the normalized Bobert contract rather than Claude's native response format. This keeps the memory/workflow layer independent of the model vendor.

## Current status

Contract defined. Server runtime and provider credentials are the next implementation step.
