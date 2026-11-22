# Open Noillirk source integration and MIDILLION boundary

Date: 2026-11-22
Source repository: https://github.com/TaxCollector23/Open-Noillirk
Target repository: https://github.com/Kavish-Paraswar/noillirk

## Integration approach

MIDILLION now uses the complete MIT-licensed Open Noillirk application as its base rather than rebuilding selected UI components. The original pixel-art ocean UI, HTML shell, CSS, animations, sound synthesis, krill sprites, companion wardrobe, settings, logbook, results flow, and browser client are retained.

The Next.js backend structure and API routes are retained. The request adapter uses the upstream route shape, while the server-side prompt bank, aliases, answer validation, and scoring are MIDILLION's.

## MIDILLION game logic

- Seven prompts per Daily or Classic run.
- Three-second preview and 25-second answer window.
- Nine answer positions ordered by popularity.
- Symmetric middle-weighted scoring: `[20, 40, 60, 80, 100, 80, 60, 40, 20]`.
- Rank 5 is the Bullseye and receives 100 points.
- Each point adds ten metres.
- Endless mode uses three balloons; a miss removes one and a Bullseye restores one.
- A relevant off-board answer may be accepted for the lowest score after relevance validation. The AI checker never assigns rank or points.

## Backend and persistence boundary

Open Noillirk uses Next.js API routes for prompt dealing, answer validation, and board review. It does not include a database or account system. Run continuity, settings, drafts, history, and party setup are stored in browser local storage. MIDILLION retains that model; it does not claim server-side persistence or cross-device sync.

## Data and evidence boundary

The original Noillirk private source, private APIs, user records, and survey corpus are not included. MIDILLION's prompt bank and response shares are illustrative demo content, not real survey results. The original Open Noillirk repository is used as open-source application code, not as evidence of the private original backend.

## Licensing

Open Noillirk's MIT license, OpenKrillion's MIT license, and the VT323 font license are retained in the repository. MIDILLION's scoring model, prompt bank, aliases, and product identity are independent.
