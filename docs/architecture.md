# MIDILLION architecture

## Runtime

- Next.js App Router serves the game shell and server-side API routes.
- The client uses the OpenKrillion-derived canvas, pixel scene, presentation, and sound modules.
- `public/midillion-adapter.mjs` owns local run continuity and calls the API.
- `game-data.js` owns the original sample prompts, aliases, popularity shares, rank curve, and board serialization.
- `lib/game.js` deals deterministic Daily sets and randomized Classic/Endless prompts.
- `lib/answer-judge.js` checks exact board entries first, then optionally checks off-board relevance with OpenRouter.
- `app/api/*` owns prompt dealing, answer validation, answer-board review, and health reporting.

## Request flow

```text
Browser client
  -> POST /api/deal
  -> local run state + 3-second preview + 25-second timer
  -> POST /api/answer
       -> exact alias/rank lookup
       -> optional semantic relevance check
       -> deterministic MIDILLION score
  -> GET /api/answers for review
  -> local history and result report
```

## Scoring contract

For a nine-answer board, the score vector is `[20, 40, 60, 80, 100, 80, 60, 40, 20]`. Rank 5 is the target. The AI checker never assigns ranks or points. A relevant off-board answer receives the lowest tier; an unrelated answer is retryable.

## State and trust

- Browser local storage owns settings, drafts, history, and active run state.
- Server routes own prompt data and answer validation.
- Daily lineup ordering is deterministic by UTC date.
- The current Daily one-attempt guard is browser-local, not account-level enforcement.
- Deal tickets bind a request marker to a prompt ID but are not signed credentials.
- There is no multiplayer, account service, database, or cross-device sync.
- Prompt shares are illustrative, not collected survey statistics.
