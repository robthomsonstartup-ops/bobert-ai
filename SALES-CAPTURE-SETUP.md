# Sales Capture bridge

This is the first Bobert sales workflow bridge:

Apple Mail -> Sales Capture -> `/api/sales-capture` -> HubSpot + Claude

## Required environment variables

Set these in the Bobert deployment environment. Do not put them in the Apple Shortcut or GitHub.

- `SALES_CAPTURE_SECRET` — a long random secret shared only with the Mac Shortcut.
- `HUBSPOT_ACCESS_TOKEN` — HubSpot private app access token with the CRM read/write scopes needed for contacts, companies, emails and tasks.
- `ANTHROPIC_API_KEY` — Anthropic API key.
- `ANTHROPIC_MODEL` — optional; defaults to `claude-sonnet-4-5`.

## Endpoint

`POST /api/sales-capture`

Header:

`X-Sales-Capture-Secret: <SALES_CAPTURE_SECRET>`

Body shape:

```json
{
  "action": "analyze",
  "email": {
    "fromName": "Bob Bowman",
    "fromEmail": "bob@example.com",
    "toEmail": "rob@example.com",
    "subject": "Subject",
    "body": "Email body",
    "date": "2026-09-10T14:00:00-04:00"
  },
  "instruction": "Use your best judgment."
}
```

Supported actions in this MVP:

- `analyze` — match the sender in HubSpot, retrieve CRM context, and ask Claude for a concise sales recommendation.
- `log` — create a HubSpot email activity associated to the matched contact/company.
- `task` — create a HubSpot follow-up task associated to the matched contact/company.

The Mac Shortcut remains the user-controlled trigger. Nothing monitors the mailbox in the background.
