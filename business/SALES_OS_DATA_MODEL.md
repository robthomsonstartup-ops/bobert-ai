# Bobert Sales OS — Data Model

## Core objects

### Account
- id
- name
- domain
- account type
- market
- status
- priority
- buying model
- relationship state
- notes
- created_at
- updated_at
- last_activity_at

### Contact
- id
- account_id
- name
- email
- title
- phone
- source
- identity confidence
- buying role
- relationship state
- last_activity_at

### Evidence
- id
- account_id
- contact_id
- evidence type
- source type
- source URL
- source file/reference
- captured text
- captured_at
- source date
- verification state
- extracted facts
- inference notes

### Activity
- id
- account_id
- contact_id
- activity type
- summary
- source evidence IDs
- created_at
- next_action_id

### Next Action
- id
- account_id
- contact_id
- action type
- due date
- reason
- status
- originating activity/evidence

### Signal
- id
- account_id or market scope
- signal type
- statement
- evidence IDs
- confidence
- discovered_at
- active/inactive

## Evidence rule

A fact becomes **verified** only when Bobert can point to evidence supporting it. AI inference must remain explicitly labeled until supported by evidence.

## Identity rule

A contact match should use multiple identifiers where available: email/domain, company, source URL, title, and existing account relationship. Name-only matching is insufficient for automated merging.

## Activity rule

Every meaningful sales action should be representable as an activity without requiring manual CRM data entry. A single capture may create or update multiple objects.

## Future integrations

HubSpot, Outlook, Apollo and other platforms are integrations around this model. They should not define the model.

NetSuite remains a separate corporate system and is not a dependency of the Sales OS.
