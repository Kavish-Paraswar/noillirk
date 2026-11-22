# MIDILLION — The Game of the Middle

An independent survey-game prototype inspired by the broad idea of predicting how a crowd answers. Unlike Noillirk, MIDILLION rewards answers near the middle of the popularity distribution rather than the most popular answer.

## Run locally

Requires Node.js 22 or newer. No third-party packages are required.

```bash
npm start
```

Open http://localhost:4173.

## Prototype features

- Daily and Classic seven-question runs.
- 25-second answer timer.
- Endless mode with three balloons/lives.
- Nine-answer sample boards and a middle-rank scoring curve.
- Answer reveal with illustrative response-share bars.
- Original synthesized audio cues using the Web Audio API.
- Responsive layout and local-only game state.

## Scoring

The middle rank (rank 5 of 9) earns 100 points. Scores taper symmetrically toward the popularity extremes: 20, 40, 60, 80, 100, 80, 60, 40, 20.

## Important data and functionality boundaries

- The question prompts, answer aliases, and response shares in `game-data.js` are original demo content. They are illustrative, not real survey data.
- Answer checking currently uses exact canonical answers and aliases. A production build needs a carefully evaluated semantic answer judge and a licensed/commissioned survey dataset.
- Multiplayer is not yet connected. The UI identifies it as a future feature rather than pretending live rooms work.
- The original Noillirk question bank, artwork, and sound recordings are not included. Audio cues are synthesized by this project.
- `docs/reverse-engineering-notes.md` records what was actually observed and what still needs a real Network-panel capture.

## API routes

- `GET /api/health` — local app health.
- `POST /api/deal` — deal a Daily, Classic, or Endless prompt set.
- `POST /api/answer` — validate a submitted answer and return its score plus the sample board.
- `GET /api/board?promptId=...` — return a prompt's sample answer distribution for review.

These are MIDILLION's own prototype routes. They are not claimed to be Noillirk's API contract.

## Tests

```bash
npm test
```
