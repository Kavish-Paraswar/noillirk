const $ = (selector) => document.querySelector(selector);
const screens = ["home-screen", "game-screen", "reveal-screen", "summary-screen", "notice-screen"];
const state = {
  mode: "classic",
  prompts: [],
  round: 0,
  score: 0,
  result: null,
  timer: 25,
  interval: null,
  balloons: 3,
  misses: 0,
  middleHits: 0,
  bestAnswer: "—",
  sound: true,
  audio: null,
  recent: [],
  dailyDate: null,
  roundsPlayed: 0,
  roundSettling: false
};

function showScreen(id) {
  for (const screen of screens) document.getElementById(screen).classList.toggle("active", screen === id);
}

function audioContext() {
  if (!state.audio) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) state.audio = new AudioCtx();
  }
  if (state.audio?.state === "suspended") state.audio.resume();
  return state.audio;
}

function tone(frequency, duration = 0.12, type = "sine", volume = 0.035, delay = 0) {
  if (!state.sound) return;
  const ctx = audioContext();
  if (!ctx) return;
  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function playSound(kind) {
  if (!state.sound) return;
  if (kind === "click") tone(460, 0.055, "triangle", 0.018);
  if (kind === "start") { tone(392, 0.11, "sine", 0.03); tone(587, 0.16, "sine", 0.025, 0.1); }
  if (kind === "score") { tone(523, 0.12, "triangle", 0.04); tone(659, 0.13, "triangle", 0.04, 0.09); tone(784, 0.2, "triangle", 0.035, 0.18); }
  if (kind === "middle") { tone(523, 0.12, "sine", 0.035); tone(659, 0.12, "sine", 0.035, 0.08); tone(784, 0.12, "sine", 0.035, 0.16); tone(1046, 0.25, "sine", 0.03, 0.24); }
  if (kind === "miss") { tone(240, 0.16, "triangle", 0.03); tone(170, 0.22, "sine", 0.025, 0.12); }
  if (kind === "tick") tone(880, 0.045, "square", 0.012);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

function updateSoundButton() {
  $("#sound-label").textContent = state.sound ? "SOUND ON" : "SOUND OFF";
  $("#sound-toggle").setAttribute("aria-label", state.sound ? "Turn sound off" : "Turn sound on");
}

function stopTimer() {
  if (state.interval) clearInterval(state.interval);
  state.interval = null;
}

function updateTimer() {
  $("#timer-value").textContent = String(state.timer).padStart(2, "0");
  const progress = Math.max(0, state.timer / 25);
  $("#timer-progress").style.width = `${progress * 100}%`;
  const ring = $("#timer-ring");
  ring.classList.toggle("warning", state.timer <= 7);
  const color = state.timer <= 7 ? "var(--coral)" : "var(--lime)";
  ring.style.background = `conic-gradient(${color} ${progress * 360}deg, rgba(255,255,255,.08) ${progress * 360}deg)`;
}

function updateBalloonStatus() {
  $("#balloon-status").textContent = state.mode === "endless" ? `BALLOONS ${"● ".repeat(state.balloons).trim() || "NONE"}` : "";
}

function startTimer() {
  stopTimer();
  state.timer = 25;
  updateTimer();
  state.interval = setInterval(() => {
    state.timer -= 1;
    updateTimer();
    if (state.timer <= 5 && state.timer > 0) playSound("tick");
    if (state.timer <= 0) {
      stopTimer();
      finishRound(null, true);
    }
  }, 1000);
}

async function startGame(mode) {
  playSound("start");
  state.mode = mode;
  state.round = 0;
  state.score = 0;
  state.balloons = 3;
  state.misses = 0;
  state.middleHits = 0;
  state.bestAnswer = "—";
  state.recent = [];
  state.dailyDate = null;
  state.roundsPlayed = 0;
  state.roundSettling = false;
  try {
    const deal = await api("/api/deal", { method: "POST", body: JSON.stringify({ mode }) });
    state.prompts = deal.prompts;
    state.recent = deal.prompts.map(prompt => prompt.id);
    state.dailyDate = deal.day;
    $("#mode-label").textContent = `${mode.toUpperCase()} RUN`;
    $("#score-value").textContent = "000";
    renderQuestion();
    showScreen("game-screen");
  } catch (error) {
    alert(error.message);
  }
}

function renderQuestion() {
  const prompt = state.prompts[state.round];
  if (!prompt) return finishGame();
  const questionNumber = state.mode === "endless" ? state.roundsPlayed + 1 : state.round + 1;
  $("#round-label").textContent = `QUESTION ${questionNumber} OF ${state.mode === "endless" ? "∞" : state.prompts.length}`;
  $("#question-index").textContent = String(questionNumber).padStart(2, "0");
  $("#category-label").textContent = prompt.category.toUpperCase();
  $("#question-text").textContent = prompt.text;
  $("#question-text").dataset.promptId = prompt.id;
  $("#answer-input").disabled = false;
  $("#answer-input").value = "";
  $("#answer-feedback").textContent = "One clear answer is all you need.";
  $("#answer-feedback").className = "answer-feedback";
  $("#submit-answer").disabled = false;
  updateBalloonStatus();
  startTimer();
  setTimeout(() => $("#answer-input").focus(), 50);
}

async function submitAnswer() {
  const prompt = state.prompts[state.round];
  const answer = $("#answer-input").value.trim();
  if (!answer) {
    $("#answer-feedback").textContent = "Type an answer first.";
    $("#answer-feedback").className = "answer-feedback error";
    return;
  }
  $("#submit-answer").disabled = true;
  try {
    const result = await api("/api/answer", {
      method: "POST",
      body: JSON.stringify({ promptId: prompt.id, answer })
    });
    if (!result.accepted) {
      $("#answer-feedback").textContent = result.reason;
      $("#answer-feedback").className = "answer-feedback error";
      $("#submit-answer").disabled = false;
      playSound("miss");
      return;
    }
    finishRound(result, false);
  } catch (error) {
    $("#answer-feedback").textContent = error.message;
    $("#answer-feedback").className = "answer-feedback error";
    $("#submit-answer").disabled = false;
  }
}

async function finishRound(result, timedOut) {
  if (state.result || state.roundSettling) return;
  state.roundSettling = true;
  stopTimer();
  $("#submit-answer").disabled = true;
  $("#answer-input").disabled = true;
  const prompt = state.prompts[state.round];
  let board = result?.board;
  if (!board) {
    try {
      const response = await api(`/api/board?promptId=${encodeURIComponent(prompt.id)}`);
      board = response.board;
    } catch { board = []; }
  }
  state.result = { ...result, board, timedOut };
  state.roundSettling = false;
  state.roundsPlayed += 1;
  const points = result?.points || 0;
  state.score += points;
  if (points === 100) state.middleHits += 1;
  if (points > 0) state.bestAnswer = result.answer;
  if (state.mode === "endless") {
    if (timedOut) state.balloons -= 1;
    if (points === 100) state.balloons = Math.min(3, state.balloons + 1);
    if (timedOut) state.misses += 1;
  }
  $("#score-value").textContent = String(state.score).padStart(3, "0");
  $("#earned-score").textContent = String(points).padStart(3, "0");
  $("#reveal-round").textContent = `QUESTION ${String(state.round + 1).padStart(2, "0")} / ${state.mode === "endless" ? "∞" : String(state.prompts.length).padStart(2, "0")}`;
  $("#reveal-title").textContent = points === 100 ? "Right in the middle." : points > 0 ? "The crowd has a place for that." : "You missed the mark.";
  $("#reveal-subtitle").textContent = result?.answer ? `You answered “${result.answer}”. Here's where it landed.` : timedOut ? "Time ran out. Here's where the crowd landed." : "Here's the sample distribution for this prompt.";
  $("#running-total").textContent = `RUNNING TOTAL · ${state.score} / ${state.mode === "endless" ? "∞" : "700"}`;
  renderBoard(board, result?.rank || null);
  $("#continue-button").textContent = state.mode === "endless" ? "NEXT PROMPT →" : state.round === state.prompts.length - 1 ? "SEE MY RESULT →" : "NEXT QUESTION →";
  $("#continue-button").disabled = false;
  if (points === 100) playSound("middle");
  else if (points > 0) playSound("score");
  else playSound("miss");
  showScreen("reveal-screen");
}

function renderBoard(board, selectedRank) {
  const host = $("#answer-board");
  host.innerHTML = "";
  for (const item of board || []) {
    const row = document.createElement("div");
    row.className = `board-row${item.rank === 5 ? " middle" : ""}${item.rank === selectedRank ? " mine" : ""}`;
    const answer = document.createElement("div");
    answer.className = "board-answer";
    const rank = document.createElement("span");
    rank.className = "rank-tag";
    rank.textContent = String(item.rank).padStart(2, "0");
    const label = document.createElement("span");
    label.textContent = item.answer;
    answer.append(rank, label);
    const share = document.createElement("div");
    share.className = "board-share";
    const bar = document.createElement("div");
    bar.className = "bar-wrap";
    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.width = `${item.share}%`;
    bar.append(fill);
    const percent = document.createElement("span");
    percent.textContent = `${item.share}%`;
    share.append(bar, percent);
    const score = document.createElement("div");
    score.className = "board-score";
    score.textContent = `+${item.score}`;
    row.append(answer, share, score);
    host.append(row);
  }
}

async function nextRound() {
  playSound("click");
  state.result = null;
  state.roundSettling = false;
  if (state.mode === "endless") {
    if (state.balloons <= 0) return finishGame();
    try {
      const deal = await api("/api/deal", { method: "POST", body: JSON.stringify({ mode: "endless", recent: state.recent }) });
      if (!deal.prompts.length) return finishGame();
      state.prompts = deal.prompts;
      state.recent.push(...deal.prompts.map(prompt => prompt.id));
      state.round = 0;
      renderQuestion();
    } catch { finishGame(); }
    return;
  }
  state.round += 1;
  if (state.round >= state.prompts.length) return finishGame();
  renderQuestion();
  showScreen("game-screen");
}

function finishGame() {
  stopTimer();
  const totalQuestions = state.roundsPlayed;
  $("#final-score").textContent = String(state.score).padStart(3, "0");
  $("#middle-hits").textContent = state.middleHits;
  $("#questions-played").textContent = totalQuestions;
  $("#best-answer").textContent = state.bestAnswer.length > 12 ? `${state.bestAnswer.slice(0, 11)}…` : state.bestAnswer;
  $("#summary-title").textContent = state.score >= 500 ? "You read the room." : state.score >= 300 ? "You're finding the middle." : "The crowd is a puzzle.";
  $("#summary-copy").textContent = state.mode === "endless" ? `You stayed in for ${totalQuestions} prompts and finished with ${state.balloons} balloons.` : `You found ${state.middleHits} perfect middle answer${state.middleHits === 1 ? "" : "s"} in this run.`;
  if (state.mode === "daily" && state.dailyDate) localStorage.setItem(`midillion:daily:${state.dailyDate}`, JSON.stringify({ score: state.score, finishedAt: Date.now() }));
  showScreen("summary-screen");
  playSound("score");
}

function backToMenu() {
  stopTimer();
  state.result = null;
  showScreen("home-screen");
}

$("#sound-toggle").addEventListener("click", () => {
  state.sound = !state.sound;
  if (state.sound) { audioContext(); playSound("click"); }
  updateSoundButton();
});

document.querySelectorAll("[data-mode]").forEach(button => {
  button.addEventListener("click", () => startGame(button.dataset.mode));
});

$("#multiplayer-button").addEventListener("click", () => showScreen("notice-screen"));
$("#notice-close").addEventListener("click", backToMenu);
$("#submit-answer").addEventListener("click", submitAnswer);
$("#answer-input").addEventListener("keydown", event => {
  if (event.key === "Enter") submitAnswer();
});
$("#continue-button").addEventListener("click", nextRound);
$("#leave-game").addEventListener("click", backToMenu);
$("#play-again").addEventListener("click", () => startGame("classic"));
$("#summary-menu").addEventListener("click", backToMenu);

updateSoundButton();
api("/api/health").then(data => {
  if (!data.ok) throw new Error("Health check failed");
}).catch(() => {
  document.body.dataset.offline = "true";
});
