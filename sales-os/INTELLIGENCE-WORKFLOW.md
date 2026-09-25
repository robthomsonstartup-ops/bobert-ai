# Bobert Sales OS — Intelligence Workflow

## Purpose

The Sales OS treats any useful sales artifact as a capture event. A screenshot, email, URL, article, document, or note is evidence that starts a workflow. The artifact is not the conclusion.

## Pipeline

CAPTURE → IDENTIFY → EXTRACT → EXPAND → VERIFY → DECIDE → ACT → LEARN

### CAPTURE
Preserve the original artifact, source type, source location when available, timestamp, and user supplied context.

### IDENTIFY
Resolve companies, people, projects, domains, and other entities. Never merge entities solely because a name is similar.

### EXTRACT
Pull all usable information from the artifact, including information that is not part of the obvious contact fields.

### EXPAND
Determine what additional research is warranted. Research can include company activity, projects, construction, people, relationships, procurement, design/specification path, signals, and relevant market context.

### VERIFY
Every material claim receives evidence and a state:

- VERIFIED — directly established by reliable evidence.
- SUPPORTED — supported by evidence but not independently confirmed.
- INFERRED — a reasoned interpretation; never present as fact.
- UNKNOWN — not established.
- CONFLICTING — credible evidence disagrees or identity is unresolved.

### DECIDE
Translate intelligence into an account/contact priority, open question, recommended approach, or next action. Recommendations must identify the evidence supporting the recommendation.

### ACT
Actions are explicit. Examples: research, call, email, ask a question, follow up, add contact, or wait.

### LEARN
Capture the outcome of the action and feed it back into account and market intelligence. A reply that explains how a buyer operates is intelligence even when it is not an opportunity.

## Truth Rules

1. Never silently convert inference into fact.
2. Never mix evidence from similarly named companies.
3. Entity identity must be established before attaching evidence to an account or person.
4. Original evidence remains preserved after processing.
5. Conflicts remain visible until resolved.
6. User supplied evidence can establish a claim, but its provenance must remain user supplied.
7. A recommendation is not a fact.
8. If a claim cannot be supported, label it UNKNOWN rather than guessing.

## Screenshot Rule

A screenshot is an entry point. The system should read the complete visible artifact, not only the fields the user would normally type into a CRM. The screenshot may contain contact information, company scale, signals, technologies, news, jobs, funding, relationships, or other context.

The system should then identify what is missing and research beyond the screenshot when tools are available.

## Output Contract

Every completed intelligence review should be capable of producing:

- Account / contact identity
- Material verified facts
- Evidence and source for each material claim
- Supported claims
- Inferences clearly labeled
- Conflicts
- Unknowns / research gaps
- Relevant signals
- Recommended next action
- Reason for the recommendation
- Evidence that should be referenced in external communication

## Sales Communication Rule

External communication must be grounded in verified or appropriately supported information. Inferred information can inform an internal question or research direction, but should not be presented externally as established fact.
