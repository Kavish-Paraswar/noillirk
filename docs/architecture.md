# MIDILLION architecture

## Runtime and source base

- The application uses the complete MIT-licensed Open Noillirk Next.js codebase as its base.
- `app/page.jsx` renders the adapted original game markup through `lib/openkrillion-shell.js`.
- `third_party/openkrillion/src/html.mjs` provides the original HTML game shell.
- `public/style.css`, `public/app.mjs`, `public/ocean.mjs`, `public/seascape.mjs`, `public/presentation.mjs`, and `public/sound.mjs` provide the original UI styling, client flow, ocean renderer, presentation effects, and sound.
- `public/noillirk-adapter.mjs` connects the original browser client flow to the MIDILLION API and keeps run state in local storage.
- `game-data.js` owns MIDILLION prompts, aliases, popularity shares, and rank-to-score mapping.
- `lib/game.js` deals deterministic Daily sets and randomized Classic/Endless prompts.
- `lib/answer-judge.js` checks exact board entries first, then optionally checks off-board answer relevance with OpenRouter.
- `app/api/*` owns prompt dealing, answer validation, answer-board review, and health reporting. The `/api/noillirk/*` routes are compatibility aliases to those same handlers.

## Request flow

```text
Browser client
  -> POST /api/noillirk/deal
  -> local run state + 3-second preview + 25-second timer
  -> POST /api/noillirk/answer
       -> exact alias/rank lookup
       -> optional semantic relevance check
       -> deterministic MIDILLION score
  -> GET /api/noillirk/answers for review
  -> local history and results report
```

## Scoring contract

For a nine-answer board, the score vector is `[20, 40, 60, 80, 100, 80, 60, 40, 20]`. Rank 5 is the target. The AI checker never assigns ranks or points. A relevant off-board answer receives 20 points after passing relevance validation; an unrelated answer is retryable.

Each point adds ten metres. Endless loses a balloon on a miss and restores one on a rank-5 Bullseye, up to three.

## State and trust

- Browser local storage owns settings, drafts, daily/active run snapshots, history, and local party setup.
- Server routes own prompt data and answer validation, but do not persist player sessions.
- Daily lineup ordering is deterministic by UTC date; the daily attempt guard is browser-local, not account-level enforcement.
- Deal tickets bind a request marker to a prompt ID but are not signed credentials.
- The upstream codebase has no database, account service, or cross-device sync. No database has been added to MIDILLION.
- Prompt shares are illustrative, not collected survey statistics.
- The local logbook and streak-based companion unlocks are browser-local.
