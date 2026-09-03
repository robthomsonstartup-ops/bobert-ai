# Bobert Sales OS — Capture & Review Workflow

**Status:** Build specification / implementation target

## Objective

Turn the things Rob is already doing into structured, reviewable sales intelligence without requiring manual CRM entry.

## Inputs

Bobert must accept:

- Email text or pasted email thread
- Screenshot / image
- URL
- Article / research text
- PDF / document text
- Freeform note
- Eventually voice/transcription

## Review screen

After capture, Bobert presents a review card before committing anything durable.

### Header

- Detected account
- Detected contact
- Source type
- Capture time
- Confidence

### What happened

Plain language summary of the captured activity.

### Verified facts

Facts directly supported by the submitted evidence.

Each fact displays its evidence reference.

### Inferences

AI conclusions derived from the evidence. Never silently promoted to facts.

### Unknowns

Important information that remains unverified.

### Changes

Show what Bobert proposes to add or change:

- New account
- New contact
- Contact identity correction
- New account fact
- New relationship/activity
- New signal
- New next action
- New market pattern candidate

### Recommended action

One recommended next step with a short reason.

### Buttons

- **Commit All**
- **Commit Selected**
- **Edit**
- **Reject**
- **Save Evidence Only**

## Example: Austin Commercial email

Input: Brian Andrews replies that lighting is handled through electrical subcontractors and design teams specify.

Bobert should propose:

**Account:** Austin Commercial

**Contact:** Brian Andrews

**Identity correction:** If the previous record says Bernard Andrews but the email signature and address support Brian Andrews, propose the correction and show the evidence. Never silently overwrite identity.

**Verified facts:**

1. Lighting is purchased through electrical subcontractors for this account/context.
2. Design teams specify lighting.

**Inference:**

EC relationships may be a useful route for future opportunity development.

**Unknown:**

Which electrical subcontractors are the relevant partners in the markets being discussed.

**Recommended next action:**

Research / ask for the relevant EC relationships, based on the conversation.

**Market pattern candidate:**

GCs may commonly route lighting through ECs while design teams specify. This remains a cross-account hypothesis until supported by additional account-specific evidence.

## Safety / truth rules

1. Never merge similarly named companies without sufficient identity evidence.
2. Never attribute one company's facts to another company.
3. Preserve the original evidence.
4. Preserve source and date when available.
5. Show uncertainty.
6. User approval is required before durable changes during the initial implementation.
7. Every committed change must be traceable back to evidence or explicitly labeled as a user decision.

## Automation progression

### Stage 1

AI analyzes → Rob reviews → Rob commits.

### Stage 2

High-confidence administrative changes can be preselected.

### Stage 3

Approved classes of changes can auto-commit while strategic changes remain review-required.

### Stage 4

Routine actions can become autonomous only when the audit trail, undo capability, and evidence model are reliable.

## Success test

Rob can take an email or Apollo screenshot, drop it into Bobert, understand exactly what Bobert believes it means, and commit the useful intelligence in seconds — without opening HubSpot or writing a manual CRM note.
