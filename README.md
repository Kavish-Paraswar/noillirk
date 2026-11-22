# MIDILLION — The Game of the Middle

MIDILLION is an independent survey-answer game built on the complete MIT-licensed [Open Noillirk](https://github.com/TaxCollector23/Open-Noillirk) application codebase. The original pixel-art ocean interface, animations, sound, companion sprites, navigation, game shell, and API structure are retained. MIDILLION replaces the answer bank and scoring rules.

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Game modes

- **Daily:** the same seven prompts for everyone on a UTC day.
- **Classic:** a fresh seven-prompt dive.
- **Endless:** keep playing with three balloons. A miss pops one; a Bullseye restores one.
- Each prompt has a three-second preview and a 25-second answer window.
- The original Open Noillirk UI includes the animated ocean, depth ruler, krill companion, sound effects, wardrobe, settings, logbook, results, and same-device pass-and-play.

## MIDILLION scoring

Each board has nine answers ordered from most common to least common. MIDILLION rewards the middle answer rather than either extreme:

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

Each point adds ten metres to the dive. A relevant answer outside the sample board can be accepted by the relevance checker for the lowest score (20 points). Unrelated or unclear answers can be retried while time remains.

## Game logic and answer checking

- `game-data.js` owns the MIDILLION prompts, answer aliases, illustrative response shares, rank curve, and board serialization.
- `lib/game.js` deals deterministic Daily sets and fresh Classic/Endless prompts.
- `lib/answer-judge.js` checks exact aliases first, then optionally checks whether an off-board answer is relevant.
- An optional server-side `OPENROUTER_API_KEY` enables semantic relevance checks. The model never assigns ranks or points; the server applies the MIDILLION score curve.
- Typographical corrections are suggested for confirmation.

Set the optional key in the deployment environment. Never expose it through a `NEXT_PUBLIC_` variable.

## Backend, storage, and limitations

The upstream Open Noillirk repository does **not** include a database. Its backend is a Next.js App Router application with stateless API routes for dealing prompts, validating answers, and returning answer boards. MIDILLION keeps that architecture and routes the requests through its own game data and scoring logic.

- Run state, drafts, settings, daily history, and logbook data are stored in browser local storage.
- There are no user accounts, server-side player records, database, or cross-device sync.
- Local Party is same-device pass-and-play, not online multiplayer.
- Deal tickets bind a request marker to a prompt ID; they are not signed sessions or anti-cheat credentials.
- Prompts, aliases, and response shares are illustrative sample content, not measured survey results. No population comparison is collected.

## Source and licenses

The complete UI/application base is the MIT-licensed [Open Noillirk](https://github.com/TaxCollector23/Open-Noillirk) project. Its underlying pixel-game shell and assets are from the MIT-licensed [OpenKrillion](https://github.com/VulcanEon/openkrillion.com-service) project. Their license files and the VT323 font license are retained in this repository. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

MIDILLION's prompts, aliases, answer validation, middle-weighted scoring, and product identity are independent. This project is not affiliated with Noillirk, Open Noillirk, OpenKrillion, or their operators.

## Checks

```bash
npm test
npm run build
```

The project can be deployed to Vercel using the included `vercel.json`.
