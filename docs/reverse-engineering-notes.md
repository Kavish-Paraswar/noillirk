# Noillirk observation notes and MIDILLION boundary

Date: 2026-11-22
Target: https://playdaily.org/noillirk

## Public behaviour observed or documented

- The public game presents Daily, Classic, and Endless modes.
- Daily and Classic use seven prompts.
- The current public game documentation describes a 25-second answer window and a short preview/count-in.
- The visible answer board contains nine ranked answers.
- The original game rewards the most common answer; MIDILLION deliberately rewards the middle rank instead.
- Endless starts with three balloons; a miss removes one and a top answer restores one.
- The public experience includes an ascent through a pixel-art landscape, a balloon-lifted krill, an avatar/feather shop, daily results, and climb history.
- Multiplayer is intentionally omitted from MIDILLION.

These are public-facing behaviour notes, not evidence of the private backend implementation.

## REA methodology and evidence boundary

The [REA repository](https://github.com/morluto/rea) and its `reverse-engineer-anything` skill were reviewed. Relevant guidance:

- Use passive browser observation for shipped page state and loaded scripts.
- Use declared browser scenarios for requested click/type/navigation actions.
- Use a retained HAR/SAZ capture for exact request and response bodies.
- Keep evidence coverage and unknowns separate; a static bundle reference is not a captured request or a complete server schema.

REA's MCP tools were not connected in this session, and the available browser interface was read-only. The open official page was inspected as rendered page text. Therefore no live click-driven scenario, CDP request capture, WebSocket capture, or exact official API schema is claimed. The original site's private source code was not fetched.

## Source lineage and rights

The original Noillirk private source is not publicly available. MIDILLION therefore uses:

- The MIT-licensed independent [Open Noillirk reconstruction](https://github.com/TaxCollector23/Open-Noillirk) as a behavioural reference.
- The MIT-licensed [OpenKrillion client](https://github.com/VulcanEon/openkrillion.com-service) for the pixel-game HTML/CSS shell, presentation, sound synthesis, and licensed sprites.
- A MIDILLION-authored forest-to-sky canvas scene, balloon rendering, scoring rules, prompt bank, answer aliases, feather wallet, shop flow, and API routes.

Both upstream MIT licenses and the VT323 font license are retained in the repository. No original Noillirk question bank, artwork, sound recording, private API credentials, cookies, or user data are included.

## MIDILLION design

MIDILLION uses nine positions with a symmetric middle-weighted score curve:

`[20, 40, 60, 80, 100, 80, 60, 40, 20]`

The middle answer (rank 5) receives the maximum score. A relevant off-board answer is accepted only after the relevance check and receives the lowest score. The AI judge never selects a rank or score.

Each point adds ten metres and ten feathers. The feather shop is a local prototype subset using the licensed sprite assets bundled with this repository; it does not claim to reproduce the original game's complete catalogue.

All prompts, answer aliases, and response shares in `game-data.js` are illustrative demo data, not real survey results. Multiplayer is out of scope for this implementation.
