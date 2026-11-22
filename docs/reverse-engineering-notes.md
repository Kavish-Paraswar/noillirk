# Noillirk observation notes and MIDILLION implementation boundary

Date: 2026-11-22
Target: https://playdaily.org/noillirk

## Evidence collected

The currently open official Noillirk tab was readable as rendered page content. This is a page-content observation, not a DevTools Network capture. The following details were visible in the official page's rules and FAQ:

- Noillirk describes itself as a survey game where the most common answer scores highest.
- Classic and Daily runs use seven prompts.
- The official page currently states a 25-second answer window per prompt.
- The listed score tiers are Sky High (100), Jet Stream (64), Cloud Nine (32), Kite (16), Treetop (8), Grounded (4), and No Lift (0).
- The page says the visible answer board has nine ranked entries. An unlisted answer may be checked by an AI model, but the page says it cannot reach the top two tiers.
- Daily resets at midnight UTC; the page says a completed daily is a one-attempt run.
- Endless starts with three balloons; a miss removes one, and a top answer restores one.
- Multiplayer is described as public rooms of up to 40 players and private rooms with six-digit codes.
- The page describes its pixel art and sounds as original Daily Games work.

The currently rendered tab also exposed the text of a completed Daily result. Its exact question and answer content is intentionally not copied into this project.

## Network inspection status

Not captured in this environment:

- Request URLs, methods, headers, payloads, response bodies, cookies, or auth/session behaviour.
- The actual answer-evaluation endpoint and its server-side contract.
- WebSocket or realtime room messages.
- Audio file URLs, codecs, or original sound binaries.
- The original survey dataset or any private backend data.

The available connected-browser interface returned page text only; it did not expose Chrome DevTools Network events or allow us to drive the open tab. The isolated execution container has Chromium and Playwright installed, but outbound DNS is disabled. Therefore `npx rea-agents@latest setup` could not be installed or run here. No network capture is claimed.

## REA and independent reference project

- REA: https://github.com/morluto/rea
- Independent reference implementation: https://github.com/TaxCollector23/Open-Noillirk

Open Noillirk's README and architecture notes state that it used REA to inspect observable browser behaviour and selected shipped browser chunks, while explicitly distinguishing that evidence from the private server, database, and survey corpus. Its repository is MIT-licensed and documents its own independent prompt bank. It is useful as a technical reference, not proof of Noillirk's private implementation.

A discrepancy exists between the independent reference's architecture notes (15 seconds) and the current official Noillirk page (25 seconds). MIDILLION uses 25 seconds because that is what the current official page says. This should be rechecked during a real live browser capture.

## MIDILLION design decisions

MIDILLION is an independent game concept from the prior project brief. It reverses the scoring objective: answers near the middle of a survey's popularity distribution score highest. The prototype uses a symmetric nine-rank curve:

| Popularity rank | Prototype score |
|---:|---:|
| 1 | 20 |
| 2 | 40 |
| 3 | 60 |
| 4 | 80 |
| 5 | 100 |
| 6 | 80 |
| 7 | 60 |
| 8 | 40 |
| 9 | 20 |

All prompts, answer aliases, and percentages in `game-data.js` are original illustrative demo data. They are not sourced from Noillirk and are not real survey results. The percentage bars are clearly labelled as illustrative sample distributions.

Sound is synthesized locally with Web Audio API oscillators. These are original short arcade feedback cues, not extracted or copied Noillirk audio.

## Next capture checklist

When a browser session with DevTools Network access and REA is available, record only the minimum evidence needed to reproduce public behaviour:

1. Open a fresh private browser session and capture the initial page requests.
2. Start a Classic game and record request URL, method, request body shape, response shape, status, and timing for the deal/answer/reveal flow.
3. Submit one listed answer, one retryable off-board answer, and one timeout.
4. Inspect Daily resume/reset behaviour without exporting user identifiers or session tokens.
5. Inspect Endless dealing and balloon transitions.
6. Join a multiplayer room only with test accounts/rooms you control; document event names and payload schemas without copying credentials or private participant data.
7. Record audio asset names and formats as metadata only. Use original audio unless the rights holder has explicitly licensed the files for reuse.
8. Replace assumptions in this document with timestamped observations and sanitized examples.

Do not copy the original question bank, artwork, sound recordings, private API credentials, cookies, or user data. Do not attempt to bypass access controls or authentication.
