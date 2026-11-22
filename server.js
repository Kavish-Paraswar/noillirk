import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { PROMPTS, STANDARD_ROUNDS, ROUND_SECONDS, findAnswer, publicBoard } from "./game-data.js";

const ROOT = fileURLToPath(new URL(".", import.meta.url)).replace(/[\\/]$/, "");
const PORT = Number(process.env.PORT || 4173);
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function send(res, status, data, type = "application/json; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  res.end(type.startsWith("application/json") ? JSON.stringify(data) : data);
}

async function body(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 100_000) throw new Error("Request body too large");
  }
  return raw ? JSON.parse(raw) : {};
}

function seededOrder(seed) {
  let state = 2166136261;
  for (const char of String(seed)) state = Math.imul(state ^ char.charCodeAt(0), 16777619) >>> 0;
  const list = [...PROMPTS];
  for (let i = list.length - 1; i > 0; i -= 1) {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    const j = (state >>> 0) % (i + 1);
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function promptCard(prompt, index, total) {
  return { id: prompt.id, text: prompt.text, category: prompt.category, number: index + 1, total };
}

async function staticFile(pathname, res) {
  const requested = pathname === "/" ? "/index.html" : decodeURIComponent(pathname);
  const safe = normalize(requested).replace(/^([.][.][/\\])+/, "").replace(/^[/\\]+/, "");
  const file = join(ROOT, safe);
  if (!file.startsWith(ROOT + sep) && file !== join(ROOT, "index.html")) return send(res, 403, { error: "Forbidden" });
  try {
    const content = await readFile(file);
    send(res, 200, content, MIME[extname(file)] || "application/octet-stream");
  } catch {
    send(res, 404, { error: "Not found" });
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      return send(res, 200, { ok: true, app: "MIDILLION", version: "0.1.0", source: "independent-demo-data" });
    }

    if (req.method === "POST" && url.pathname === "/api/deal") {
      const input = await body(req);
      const mode = ["daily", "classic", "endless"].includes(input.mode) ? input.mode : "classic";
      const recent = new Set(Array.isArray(input.recent) ? input.recent : []);
      const today = new Date().toISOString().slice(0, 10);
      const order = seededOrder(mode === "daily" ? `daily:${today}` : `${mode}:${Date.now()}:${Math.random()}`)
        .filter(prompt => !recent.has(prompt.id));
      const count = mode === "endless" ? 1 : STANDARD_ROUNDS;
      const chosen = order.slice(0, count);
      return send(res, 200, {
        mode,
        day: mode === "daily" ? today : null,
        secondsPerRound: ROUND_SECONDS,
        prompts: chosen.map((prompt, index) => promptCard(prompt, index, count))
      });
    }

    if (req.method === "POST" && url.pathname === "/api/answer") {
      const input = await body(req);
      const prompt = PROMPTS.find(item => item.id === input.promptId);
      if (!prompt) return send(res, 404, { error: "Prompt not found" });
      const match = findAnswer(prompt, input.answer);
      if (!match) {
        return send(res, 200, {
          accepted: false,
          retryable: true,
          reason: "That answer is not in this demo survey board. Try another answer."
        });
      }
      return send(res, 200, {
        accepted: true,
        answer: match.answer,
        rank: match.rank,
        points: match.score,
        share: match.share,
        message: match.rank === 5 ? "Right in the middle. Perfect read of the crowd." : "Answer accepted. See where the crowd placed it.",
        board: publicBoard(prompt)
      });
    }

    if (req.method === "GET" && url.pathname === "/api/board") {
      const prompt = PROMPTS.find(item => item.id === url.searchParams.get("promptId"));
      if (!prompt) return send(res, 404, { error: "Prompt not found" });
      return send(res, 200, { promptId: prompt.id, board: publicBoard(prompt) });
    }

    if (req.method === "GET") return staticFile(url.pathname, res);
    return send(res, 405, { error: "Method not allowed" });
  } catch (error) {
    return send(res, 400, { error: error.message || "Bad request" });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  process.stdout.write(`MIDILLION running at http://127.0.0.1:${PORT}\n`);
});
