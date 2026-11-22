# MIDILLION architecture

## Runtime

- Next.js App Router serves the game shell and server-side API routes.
- `lib/midillion-shell.js` adapts the MIT-licensed pixel-game HTML shell.
- `public/sky.mjs` draws the forest, pond, clouds, balloon ascent, altitude landmarks, and space progression.
- `public/app.mjs` owns the client game flow, timer, results, daily stats, feather wallet, and companion shop.
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
  -> local history, feather wallet, and result report
```

## Scoring contract

For a nine-answer board, the score vector is `[20, 40, 60, 80, 100, 80, 60, 40, 20]`. Rank 5 is the target. The AI checker never assigns ranks or points. A relevant off-board answer receives the lowest tier; an unrelated answer is retryable.

Each point adds ten metres and earns ten feathers. Endless loses a balloon on a miss and restores one on a rank-5 Bullseye, up to three.

## State and trust

- Browser local storage owns settings, drafts, daily/active run snapshots, history, feather balance, purchased companions, and claimed-feather receipts.
- Server routes own prompt data and answer validation.
- Daily lineup ordering is deterministic by UTC date; the daily attempt guard is browser-local, not account-level enforcement.
- Deal tickets bind a request marker to a prompt ID but are not signed credentials.
- There is no multiplayer, account service, database, or cross-device sync.
- Prompt shares are illustrative, not collected survey statistics.
- The shop is a local prototype subset; it does not connect to the original game's store or catalogue.
