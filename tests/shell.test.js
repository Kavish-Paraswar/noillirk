import test from "node:test";
import assert from "node:assert/strict";
import { buildMidillionMarkup } from "../lib/openkrillion-shell.js";

test("MIDILLION keeps the Open Noillirk game interface and uses middle scoring copy", () => {
  const html = buildMidillionMarkup();
  for (const id of [
    "ocean",
    "hero",
    "mode-picker",
    "answer-form",
    "answer-status",
    "settings-dialog",
    "wardrobe-dialog",
    "logbook-dialog",
    "party-dialog",
    "endless-oxygen",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`), `missing ${id}`);
  }
  assert.match(html, /data-mode="daily" aria-pressed="true"/);
  assert.match(html, /data-mode="classic"/);
  assert.match(html, /data-mode="endless"/);
  assert.match(html, /25 seconds each/);
  assert.match(html, /The fifth-ranked answer earns 100 points/);
  assert.match(html, /MIDILLION/);
  assert.match(html, /https:\/\/github.com\/Kavish-Paraswar\/noillirk/);
  const runtime = html.match(/<script id="runtime-config" type="application\/json">(.*?)<\/script>/)?.[1];
  assert.ok(runtime, "runtime config should exist");
  assert.doesNotThrow(() => JSON.parse(runtime));
  assert.match(html, /Open-Noillirk and OpenKrillion code/);
  assert.doesNotMatch(html, /Open Noillirk|most common answer takes you highest/i);
});
