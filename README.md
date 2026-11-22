# MIDILLION — The Game of the Middle

MIDILLION is an independent survey-answer climbing game. It keeps the timed, open-answer climb format and reverses the objective: **the answer closest to the middle of the popularity distribution earns the highest score.**

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Game modes and flow

- **Daily:** one shared seven-prompt set per UTC day, with a browser-local one-attempt guard and a View Results option after completion.
- **Classic:** a fresh seven-prompt run.
- **Endless:** keep climbing with three balloons. A miss pops one; a rank-5 Bullseye restores one.
- Every prompt has a three-second preview and a 25-second answer window.
- The result screen shows the answer board, round review, score, climb height, and run history.
- The home screen includes the daily reset countdown, personal daily stats, settings, logbook, and feather balance.

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

Each point adds ten metres to the climb and earns ten feathers. A relevant answer outside the sample board can be accepted by the relevance checker for the lowest score (20 points). Unrelated or unclear answers can be retried while time remains.

## Feather shop

Feathers are earned at ten per point and saved locally. The shop lets players unlock and equip a small set of pixel companions. The included sprite collection and price bands are a prototype subset, not the original Noillirk catalogue. Purchases are local to the current browser.

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
- Runs, settings, feather balance, shop purchases, history, and drafts are stored in browser local storage. There are no accounts or cross-device sync.
- Multiplayer is intentionally excluded from this version.
- The deal ticket is a prompt-matching request marker, not a signed session or anti-cheat credential.
- The original Noillirk private source, survey corpus, private API, artwork, and sound recordings are not included.

## REA and source lineage

The public Noillirk experience was investigated using the methodology in the [REA reverse-engineering repository](https://github.com/morluto/rea). The official private implementation is not published. This project uses the independent, MIT-licensed [Open Noillirk reconstruction](https://github.com/TaxCollector23/Open-Noillirk) as a behavioural reference and adapts the MIT-licensed [OpenKrillion client shell](https://github.com/VulcanEon/openkrillion.com-service). The underwater renderer was replaced with a MIDILLION-authored forest-to-sky balloon scene. Original licenses and attribution are preserved in `THIRD_PARTY_NOTICES.md`.

MIDILLION's scoring model, prompt bank, aliases, server routes, feather economy, and product identity are independent. It is not affiliated with Noillirk, OpenKrillion, or their operators.

## Checks

```bash
npm test
npm run build
```

The project can be deployed to Vercel using the included `vercel.json`.
