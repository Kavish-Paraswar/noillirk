import { homePage } from "../third_party/openkrillion/src/html.mjs";

const GUIDE = "<details id=\"guide\" class=\"guide-panel\"><summary class=\"guide-toggle\">MIDILLION guide</summary><div class=\"guide-sheet\"><button class=\"close\" id=\"close-guide\" aria-label=\"Close guide\">×</button><article class=\"guide-content\"><p class=\"eyebrow\">MIDILLION · QUICK GUIDE</p><h2>Find the middle. Climb higher.</h2><p class=\"guide-lead\">Seven prompts. Twenty-five seconds each. The fifth answer earns the most.</p><nav class=\"guide-toc\" aria-label=\"Guide contents\"><a href=\"#guide-rules\">The rules</a><a href=\"#guide-scoring\">Scoring</a><a href=\"#guide-modes\">Game modes</a><a href=\"#guide-answers\">Answer checks</a><a href=\"#guide-data\">Your data</a></nav><section id=\"guide-rules\"><h3>The rules</h3><p>Choose a mode, read the prompt, and enter one specific answer before the 25-second clock runs out. The answer board is ranked from most common to least common. Your goal is to land near the middle, not at either extreme.</p></section><section id=\"guide-scoring\"><h3>The middle scores highest</h3><p>There are nine ranked answers. Rank 5 earns 100 points. Ranks 4 and 6 earn 80, ranks 3 and 7 earn 60, ranks 2 and 8 earn 40, and ranks 1 and 9 earn 20. Each point adds ten metres to your altitude. A relevant answer outside the sample board can receive the lowest score after a relevance check.</p></section><section id=\"guide-modes\"><h3>Daily, Classic, and Endless</h3><p>Daily uses the same seven prompts for everyone on that UTC day and allows one completed attempt. Classic deals a fresh set of seven prompts. Endless keeps dealing prompts: a miss pops a balloon, while a rank-5 Bullseye restores one. Endless ends when all three balloons are gone.</p></section><section id=\"guide-answers\"><h3>Make answers specific</h3><p>Answers are checked against the prompt and its sample board. Unrelated or unclear entries are rejected without using up the round; try a more direct answer while time remains. Typo suggestions require confirmation. An optional server-side OpenRouter key enables semantic relevance checks for plausible answers outside the board; the key is never sent to the browser.</p></section><section id=\"guide-data\"><h3>What is saved</h3><p>Runs, selected settings, best scores, and your logbook are stored in this browser. There are no accounts, cross-device sync, or multiplayer rooms. The prompt bank and percentages are illustrative demo data, not a real survey dataset.</p></section><footer class=\"original-footer\"><p>MIDILLION · an independent open-source game.</p><nav aria-label=\"Site footer\"><a href=\"https://github.com/Kavish-Paraswar/noillirk\" target=\"_blank\" rel=\"noopener noreferrer\">GitHub ↗</a><a href=\"/about\">About</a><a href=\"/privacy\">Privacy</a></nav><p class=\"independent\">The client interface is adapted from MIT-licensed OpenKrillion and the independent Open Noillirk reconstruction. MIDILLION's scoring rules and sample data are independent.</p></footer></article></div></details>";

const MODE_PICKER = `<fieldset id="mode-picker" class="mode-picker midillion-mode-picker" aria-label="Choose a game mode"><legend>CHOOSE A CLIMB</legend><button type="button" class="mode-button active" data-mode="daily" aria-pressed="true">DAILY</button><button type="button" class="mode-button" data-mode="classic" aria-pressed="false">CLASSIC</button><button type="button" class="mode-button" data-mode="endless" aria-pressed="false">ENDLESS ∞</button></fieldset><p id="mode-description" class="mode-description">The same seven prompts for everyone today · 25 seconds each.</p>`;

const REPLACEMENTS = [["Krillion Game — OpenKrillion","MIDILLION — The Game of the Middle"],["OPENKRILLION","MIDILLION"],["OpenKrillion","MIDILLION"],["Openkrillion","MIDILLION"],["Krillion","MIDILLION"],["krillion","midillion"],["VulcanEon/openkrillion.com-service","Kavish-Paraswar/noillirk"],["openkrillion.com","github.com/Kavish-Paraswar/noillirk"],["krillion.com","github.com/Kavish-Paraswar/noillirk"],["DIVER’S","CLIMBER’S"],["DIVER","CLIMBER"],["diver","climber"],["one in a krillion","find the middle"],["one in a Noillirk","find the middle"],["THE DAILY DIVE","THE DAILY CLIMB"],["Guide & AI docs","How to play"],["7 prompts · 25 seconds each · rarer answers sink deeper","7 prompts · 25 seconds each · middle-ranked answers score highest"],["rarer answers sink deeper","middle-ranked answers score highest"],["rare answers score big. obvious ones float.","answers near the middle score big. extremes score less."],["every point sinks you 10 metres. 700 is the trench.","every point lifts you 10 metres. 700 is the sky-high mark."],["one daily dive. practice whenever you like.","one daily climb. classic and endless are always open."],["BEGIN DESCENT","BEGIN ASCENT"],["▼ BEGIN ASCENT ▼","▲ BEGIN ASCENT ▲"],["DESCEND ▼","CLIMB ▲"],["DIVE COMPLETE","CLIMB COMPLETE"],[">DEPTH<",">ALTITUDE<"],["▼ rarer answers sink deeper ▼","▲ middle-ranked answers score highest ▲"],["sink ","rise "],["SURFACE ▲","VIEW RESULTS ▲"],["dive","climb"],["Dive","Climb"],["DIVE","CLIMB"],["Depth","Altitude"],["DEPTH","ALTITUDE"],["rarer","more extreme"],["rarity","popularity position"],["trench","sky"],["ocean’s","sky’s"],["ocean's","sky's"],["common answer","middle answer"],["common answers","middle answers"],["common-answer","middle-answer"],["most common","middle-ranked"],["Open source. Open ocean.","Open source. Open sky."]];

export function buildMidillionMarkup() {
  const source = homePage("en", { LOCAL_DEVELOPMENT: "false" });
  const match = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!match) throw new Error("OpenKrillion home template did not contain a body.");
  let body = match[1];
  for (const [from, to] of REPLACEMENTS) body = body.replaceAll(from, to);

  body = body.replace("<button id=\"start-btn\"", `${MODE_PICKER}<button id="start-btn"`);
  body = body.replace('<button id="practice-btn">PRACTICE ∞</button>', '<button id="practice-btn" hidden>PRACTICE ∞</button>');
  body = body.replace('id="guide-btn">GUIDE', 'id="guide-btn">HOW TO PLAY');
  body = body.replace('id="logbook-btn">LOGBOOK ⟲', 'id="logbook-btn">LOGBOOK ⟲');
  body = body.replace('<button data-action="practice">∞ Practice climb</button>', '<button data-action="classic">↗ Classic climb</button><button data-action="endless">∞ Endless climb</button>');
  body = body.replace('id="round-label">SURFACE', 'id="round-label">READY');
  body = body.replace('<p class="hint">▲ middle-ranked answers score highest ▲</p>', '<p class="hint" id="answer-guidance">Aim for the fifth position. Extremes score less.</p>');
  body = body.replace('id="answer-guidance" role="alert"', 'id="answer-feedback" role="alert"');
  body = body.replace('aria-label="MIDILLION daily trivia game"', 'aria-label="Open MIDILLION middle-answer climb"');
  body = body.replace('aria-label="Animated pixel ocean, depth increases downward"', 'aria-label="Animated pixel sky, altitude increases upward"');
  body = body.replace('aria-label="Poke your dive buddy"', 'aria-label="Poke your climb buddy"');
  body = body.replace('<span class="open-label">KRILLION · OPEN SOURCE</span>', '<span class="open-label">MIDILLION · OPEN SOURCE</span>');
  const brandLetters = [...'MIDILLION'].map((letter, index) => `<span style="--letter:${index}">${letter}</span>`).join('');
  body = body.replace(/<span class="hero-word">[\s\S]*?<\/span><\/h1>/, `<span class="hero-word">${brandLetters}</span></h1>`);
  body = body.replace('id="answer" name="answer" data-clarity-mask="true" placeholder="type one answer…" maxlength="256"', 'id="answer" name="answer" data-clarity-mask="true" placeholder="type one specific answer…" maxlength="80"');
  body = body.replace('<button id="submit-btn" type="submit">CLIMB</button></form>', '<button id="submit-btn" type="submit">CLIMB</button><button id="pass-btn" type="button" class="pass-answer">PASS</button></form>');
  body = body.replace(/<details class="how-to">[\s\S]*?<\/details>/, '<p class="intro-help">Read the prompt, then give one specific answer before time runs out.</p>');
  body = body.replace('id="land-tier"></p>', 'id="land-tier"></p>');
  body = body.replace('<div class="hud-pod pixel-frame"><span>ALTITUDE</span>', '<div class="hud-pod pixel-frame"><span>ALTITUDE</span>');
  body = body.replace('<div id="answer-dock"', '<div id="endless-oxygen" class="endless-oxygen" aria-label="Three balloons remaining" hidden><span>🎈</span><span>🎈</span><span>🎈</span></div><div id="answer-dock"');

  const guideStart = body.indexOf('<details id="guide"');
  const guideEnd = body.lastIndexOf('</details>');
  if (guideStart < 0 || guideEnd < guideStart) throw new Error("Could not isolate the source guide panel.");
  body = `${body.slice(0, guideStart)}${GUIDE}${body.slice(guideEnd + '</details>'.length)}`;

  body = body.replace('<script type="module" src="/app.mjs"></script>', "");
  body = body.replace(/<script id="runtime-config" type="application\/json">[\s\S]*?<\/script>/, '<script id="runtime-config" type="application/json">{"plausible":"","ga4":"","clarity":"","origin":"","local":false,"lang":"en"}</script>');

  const agentStart = body.indexOf('<section class="agent-docs"');
  if (agentStart >= 0) {
    const agentEnd = body.indexOf('</section>', agentStart);
    if (agentEnd >= 0) body = body.slice(0, agentStart) + body.slice(agentEnd + '</section>'.length);
  }
  return body;
}
