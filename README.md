# MIDILLION — The Game of the Middle

MIDILLION is an independent survey-answer climbing game. It uses the familiar timed, open-answer climb format, but reverses the objective: **the answer closest to the middle of the popularity distribution earns the highest score.**

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Game modes

- **Daily:** the same seven prompts for everyone on a UTC day; one completed attempt per browser.
- **Classic:** a fresh seven-prompt run.
- **Endless:** keep going with three balloons. A miss pops one; a rank-5 Bullseye restores one.

Each prompt has a three-second preview and a 25-second answer window.

## Scoring

The answer board contains nine positions, ordered from most common to least common. MIDILLION rewards the middle rather than either extreme:

| Popularity rank | Points |
|---:|---:|
| 1 | 20 |
| 2 | 40 |
| 3 | 60 |
| 4 | 80 |
| **5** | **100** |
| 6 | 80 |
| 7 | 60 |
| 8 | 40 |
| 9 | 20 |

Each point adds ten metres to the climb. A relevant answer outside the sample board can be accepted by the relevance checker for the lowest score (20 points). Unrelated or unclear answers can be retried while time remains.

## Answer checking

- Exact answers and aliases are checked against the server-side board.
- Typographical corrections are suggested for confirmation.
- An optional `OPENROUTER_API_KEY` enables semantic relevance checks for plausible off-board answers.
- Without a key, a conservative local relevance check is used.
- The model only judges relevance. The server owns all ranks and points.

Set the optional key in the deployment environment. Never expose it through a `NEXT_PUBLIC_` variable.

## Data and limitations

- The prompts, aliases, and percentages in `game-data.js` are original illustrative demo content. They are **not real survey results**.
- The answer boards are sample distributions; no population comparison is collected.
- Runs, settings, history, and drafts are stored in browser local storage. There are no accounts or cross-device sync.
- Multiplayer is intentionally excluded from this version.
- The deal ticket is a prompt-matching request marker, not a signed session or anti-cheat credential.
- The original Noillirk private source, survey corpus, private API, artwork, and sound recordings are not included.

## REA and source lineage

The public Noillirk experience was investigated using the methodology in the [REA reverse-engineering repository](https://github.com/morluto/rea). The official private implementation is not published. This project uses an independent, MIT-licensed reconstruction as a behavioural reference and adapts the MIT-licensed OpenKrillion client shell. The original licenses and attribution are preserved in `THIRD_PARTY_NOTICES.md`.

MIDILLION's scoring model, prompt bank, aliases, server routes, and product identity are independent. It is not affiliated with Noillirk, OpenKrillion, or their operators.

## Checks

```bash
npm test
npm run build
```

The project can be deployed to Vercel using the included `vercel.json`.
