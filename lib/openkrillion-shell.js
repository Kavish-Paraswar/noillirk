import { homePage } from "../third_party/openkrillion/src/html.mjs";

const GUIDE = `<details id="guide" class="guide-panel"><summary class="guide-toggle">MIDILLION guide</summary><div class="guide-sheet"><button class="close" id="close-guide" aria-label="Close guide">×</button><article class="guide-content"><p class="eyebrow">MIDILLION · QUICK GUIDE</p><h2>Find the middle</h2><p class="guide-lead">Seven prompts. Twenty-five seconds each. The fifth answer on a nine-answer board earns the highest score.</p><nav class="guide-toc" aria-label="Guide contents"><a href="#guide-rules">The rules</a><a href="#guide-scoring">Scoring</a><a href="#guide-modes">Game modes</a><a href="#guide-answers">Answer checks</a><a href="#guide-data">Your data</a></nav><section id="guide-rules"><h3>The rules</h3><p>Choose a mode, read the prompt, and enter one specific answer before the 25-second clock runs out. Accepted answers reveal their board position after the round. Use the round dots and logbook to track your dive.</p></section><section id="guide-scoring"><h3>The middle scores highest</h3><p>Each answer board contains nine entries ordered from most common to least common. MIDILLION rewards the middle position: ranks 1 to 9 score 20, 40, 60, 80, 100, 80, 60, 40, and 20 points. The fifth-ranked answer earns 100 points. Every point adds ten metres to your dive. A relevant answer outside the sample board receives the lowest score after passing the relevance check.</p></section><section id="guide-modes"><h3>Daily, Classic, and Endless</h3><p>Daily uses the same seven prompts for everyone that day. Classic deals a fresh seven-prompt dive. Endless deals another prompt after each round: a miss pops a balloon, while a Bullseye answer restores one. Endless ends when all three balloons are gone.</p></section><section id="guide-answers"><h3>Make answers specific</h3><p>Answers are checked against the prompt and its board. Unrelated or unclear entries are rejected without using up the round; try a more direct answer while time remains. Recognized answers score by their board position. Optional OpenRouter review can help judge plausible answers outside the local sample when a server key is configured; the key is never sent to the browser.</p></section><section id="guide-data"><h3>What is saved</h3><p>Runs, selected settings, best scores, and your logbook are stored in this browser. The source project does not include a database, sign-in, or cross-device sync. Local party rooms are pass-and-play on one device, not online rooms. You can clear the site's browser storage to remove this local history.</p></section><footer class="original-footer"><p>MIDILLION · an independent open-source game.</p><nav aria-label="Site footer"><a href="https://github.com/Kavish-Paraswar/noillirk" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="/about">About</a><a href="/privacy">Privacy</a></nav><p class="independent">The interface is based on MIT-licensed Open-Noillirk and OpenKrillion code. MIDILLION's prompts and scoring rules are independent.</p></footer></article></div></details>`;

const MODE_PICKER = `<fieldset id="mode-picker" class="mode-picker noillirk-mode-picker" aria-label="Choose a game mode"><legend>CHOOSE A DIVE</legend><button type="button" class="mode-button active" data-mode="daily" aria-pressed="true">DAILY</button><button type="button" class="mode-button" data-mode="classic" aria-pressed="false">CLASSIC</button><button type="button" class="mode-button" data-mode="endless" aria-pressed="false">ENDLESS ∞</button></fieldset><p id="mode-description" class="mode-description">The same seven prompts for everyone today · 25 seconds each.</p>`;

const PARTY_DIALOG = `<dialog id="party-dialog" class="panel"><button class="close" data-close aria-label="Close local party">×</button><p class="eyebrow">LOCAL PARTY · SAME SCREEN</p><h2>Take turns climbing</h2><p class="muted">Add 2–4 names, then pass this device after each round. This is local pass-and-play, not an online room. Starting a party climb replaces the current climb.</p><div id="party-create"><label class="setting" for="party-names"><span><strong>Player names</strong><small>Separate names with commas, up to four players.</small></span></label><input id="party-names" maxlength="80" value="Player 1, Player 2" aria-label="Player names"><button id="party-create-btn" class="quiet">Set up pass-and-play</button></div><div id="party-ready" hidden><p>Ready on <strong id="party-code">THIS DEVICE</strong></p><p id="party-players"></p><button id="party-start-btn" class="begin-btn">START PASS-AND-PLAY</button><button id="party-edit-btn" class="quiet" type="button">EDIT PLAYERS</button></div><p id="party-error" class="error" role="status" hidden></p></dialog>`;

const REPLACEMENTS = [
  ["Krillion Game — OpenKrillion", "MIDILLION — The Middle Answer Dive"],
  ["OPENKRILLION", "MIDILLION"],
  ["OpenKrillion", "MIDILLION"],
  ["Openkrillion", "MIDILLION"],
  ["KRILLION", "MIDILLION"],
  ["Krillion", "MIDILLION"],
  ["Open Noillirk", "MIDILLION"],
  ["Noillirk", "MIDILLION"],
  ["NOILLIRK", "MIDILLION"],
  ["krillion.com", "midillion"],
  ["openmidillion", "MIDILLION"],
  ["VulcanEon/openkrillion.com-service", "Kavish-Paraswar/noillirk"],
  ["one in a krillion", "the middle of the board"],
  ["one in a Noillirk", "the middle of the board"],
  ["THE DAILY DIVE", "THE MIDILLION DIVE"],
  ["Guide & AI docs", "How to play"],
  ["7 prompts · 25 seconds each · rarer answers sink deeper", "7 prompts · 25 seconds each · the middle-ranked answer scores highest"],
  ["rarer answers sink deeper", "middle-ranked answers score higher"],
  ["rare answers score big. obvious ones float.", "the fifth-ranked answer scores highest. scores taper symmetrically toward both ends."],
  ["every point sinks you 10 metres. 700 is the trench.", "every point adds 10 metres. 700 is the maximum score."],
  ["common answers climb higher", "middle-ranked answers score higher"],
  ["common answer takes you highest", "middle-ranked answer scores highest"],
  ["most common answer", "middle-ranked answer"],
  ["common answer", "middle-ranked answer"],
  ["most common", "most popular"],
  ["the top answer earns 100 points", "the fifth-ranked answer earns 100 points"],
  ["top answer earns 100 points", "fifth-ranked answer earns 100 points"],
  ["15 seconds", "25 seconds"],
  ["15-second", "25-second"],
];

export function buildMidillionMarkup() {
  const source = homePage("en", { LOCAL_DEVELOPMENT: "false" });
  const match = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!match) throw new Error("OpenKrillion home template did not contain a body.");
  let body = match[1];
  for (const [from, to] of REPLACEMENTS) body = body.replaceAll(from, to);

  body = body.replace("<button id=\"start-btn\"", `${MODE_PICKER}<button id="start-btn"`);
  body = body.replace('<button id="practice-btn">PRACTICE ∞</button>', '<button id="practice-btn" hidden>PRACTICE ∞</button><button id="multiplayer-btn" type="button">LOCAL PARTY</button>');
  body = body.replace('id="guide-btn">GUIDE', 'id="guide-btn">HOW TO PLAY');
  body = body.replace('id="logbook-btn">LOGBOOK ⟲', 'id="logbook-btn">LOGBOOK ⟲');
  body = body.replace('<button data-action="practice">∞ Practice dive</button>', '<button data-action="classic">↗ Classic dive</button><button data-action="endless">∞ Endless balloons</button><button data-action="multiplayer">♟ Local party</button>');
  body = body.replace('id="round-label">SURFACE', 'id="round-label">READY');
  body = body.replace('<p class="hint">▼ middle-ranked answers score higher ▼</p>', '<p class="hint" id="answer-guidance">The fifth-ranked answer earns the highest score.</p>');
  body = body.replace('id="answer-guidance" role="alert"', 'id="answer-feedback" role="alert"');
  body = body.replace('aria-label="Open MIDILLION daily trivia game"', 'aria-label="Open MIDILLION middle-answer dive"');
  body = body.replace('aria-label="Animated pixel ocean, depth increases downward"', 'aria-label="Animated pixel ocean, depth increases downward"');
  body = body.replace('aria-label="Poke your dive buddy"', 'aria-label="Poke your dive buddy"');
  body = body.replace('<span class="open-label">MIDILLION · OPEN SOURCE</span>', '<span class="open-label">MIDILLION · OPEN SOURCE</span>');
  const brandLetters = [...'MIDILLION'].map((letter, index) => `<span style="--letter:${index}">${letter}</span>`).join('');
  body = body.replace(/<span class="hero-word">[\s\S]*?<\/span><\/h1>/, `<span class="hero-word">${brandLetters}</span></h1>`);
  body = body.replace('id="answer" name="answer" data-clarity-mask="true" placeholder="type one answer…" maxlength="256"', 'id="answer" name="answer" data-clarity-mask="true" placeholder="type one specific answer…" maxlength="80"');
  body = body.replace('<button id="submit-btn" type="submit">DIVE</button></form>', '<button id="submit-btn" type="submit">DIVE</button><button id="pass-btn" type="button" class="pass-answer">PASS</button></form>');
  body = body.replace(/<details class="how-to">[\s\S]*?<\/details>/, '<p class="intro-help">Read the prompt, then give one specific answer before time runs out.</p>');
  body = body.replace('id="land-tier"></p>', 'id="land-tier"></p>');
  body = body.replace('<div class="hud-pod pixel-frame"><span>ALTITUDE</span>', '<div class="hud-pod pixel-frame"><span>ALTITUDE</span>');
  body = body.replace('<p class="eyebrow" id="prompt-number">PROMPT 1 OF 7</p>', '<p class="eyebrow" id="prompt-number">PROMPT 1 OF 7</p><p class="party-turn" id="party-turn" hidden></p>');
  body = body.replace('<div id="answer-dock"', '<div id="endless-oxygen" class="endless-oxygen" aria-label="Three balloons remaining" hidden><span>🎈</span><span>🎈</span><span>🎈</span></div><div id="answer-dock"');

  const guideStart = body.indexOf('<details id="guide"');
  const guideEnd = body.lastIndexOf('</details>');
  if (guideStart < 0 || guideEnd < guideStart) throw new Error("Could not isolate the source guide panel.");
  body = `${body.slice(0, guideStart)}${GUIDE}${body.slice(guideEnd + '</details>'.length)}`;

  const settingsStart = body.indexOf('<dialog id="settings-dialog"');
  if (settingsStart >= 0) body = `${body.slice(0, settingsStart)}${PARTY_DIALOG}${body.slice(settingsStart)}`;
  body = body.replace('<script type="module" src="/app.mjs"></script>', "");
  body = body.replace(/<script id="runtime-config" type="application\/json">[\s\S]*?<\/script>/, '<script id="runtime-config" type="application/json">{"plausible":"","ga4":"","clarity":"","origin":"","local":false,"lang":"en"}</script>');

  return body;
}
