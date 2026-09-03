# PI Migration — Origin and Setup

## Provenance

`pi/app-source` was built and iterated in a ChatGPT workspace (using
OpenAI's Apps SDK) under `rob.thomson.startup@gmail.com`, previously
running at `bobert-lighting-configurator.cbmcinc-3574.chatgpt.site`. It's
brought into `bobert-ai` here as part of the September 2026 consolidation
onto a single GitHub source of truth.

The original transfer package (`Bobert-Transfer-Kit-Safe-2026-09-03`) was
pre-screened for `.env` files, API keys/tokens, customer-confidential
documents, internal LPA pricing, personal information, dependency/build
folders, and old CBMC-owned material before being handed off. Verified
clean again on import here — no secrets found in `app-source/`.

## Setup

```bash
cd pi/app-source
npm install
```

Read `pi/STATUS.md` first — it covers what's proven, what's stress-tested,
and what's still unbuilt (notably: auth is currently ChatGPT-specific and
needs to be replaced before this can run standalone on `bobert.ai`).

## Next build priority

Per the original handoff: move browser-only decisions into centrally
stored, user-attributed records, then run one complete new project through
the office process end-to-end and record every correction in a test log.
Don't expand into broader order processing until the project-to-review-
ready-BOM cycle is dependable.
