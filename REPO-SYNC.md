# Bobert Repository Sync Rules

## Source of truth
GitHub is the source of truth for Bobert development.

Repository: `robthomsonstartup-ops/bobert-ai`
Default branch: `main`

The Mac and Windows/Dell computers are working copies. A local file is not considered part of Bobert's current state until it is committed and pushed to GitHub.

## What belongs in the repository

Commit and push:

- Application pages and code
- API/server code
- Data schemas and non-sensitive test/demo data
- Configuration that is safe to share
- Product decisions and architecture notes
- Workflow/process documentation
- Build notes and next-session handoff notes
- Test fixtures that are synthetic or explicitly safe to publish
- Changes to the project-intake, Sales OS, Intelligence, Market Intelligence, Field Intelligence, and related Bobert modules

## What does NOT belong in this public repository

Do not commit customer-confidential or personally sensitive source material, including:

- Real customer drawing sets
- Real bid packages
- Confidential specifications
- Customer emails containing sensitive information
- Personal contact data that should not be public
- Credentials, API keys, tokens, passwords, or secrets
- Proprietary quote files

Use sanitized or synthetic test data in the repository when a real project is needed to reproduce a workflow.

## Two-computer workflow

Before starting work on either computer:

```bash
git pull
```

After making a meaningful change:

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

Before switching computers, push the work. On the other computer, pull before continuing.

## Handoff rule

Every meaningful build session should leave the repository in a state another developer or AI platform can understand without relying on chat history.

Update the appropriate documentation when decisions change. For significant work, update one or more of:

- `DECISIONS.md` for locked product/architecture decisions
- `NEXT-SESSION-OPEN-ITEMS.md` for unresolved work and the next build target
- A module-specific README or workflow document for implementation details
- `CHANGELOG.md` when a user-visible capability changes

## Current Project Intake direction

Project Intake begins when a real project arrives. The raw package should be accepted first, then Bobert should read the available material, extract project and lighting information, identify people/organizations, surface fixture and schedule evidence, flag missing information, and prepare the work needed to move into quoting/pricing.

The current `project-intake.html` page is an MVP for that workflow. The Potbelly drawing set is a test case, but the real customer drawing should remain outside this public repository.

## Rule for future AI/developer sessions

Before building on Bobert, inspect the latest GitHub state and the relevant handoff/decision files. Do not assume an older local copy or chat transcript is current.

When a change is completed, make the change visible in GitHub before declaring the work complete.
