import test from "node:test";
import assert from "node:assert/strict";
import { chooseLineup, dayNumber } from "../lib/game.js";

test("Daily uses a stable seven-prompt lineup for a UTC date", () => {
  const a=chooseLineup({mode:"daily",day:"2026-11-22"});
  const b=chooseLineup({mode:"daily",day:"2026-11-22"});
  assert.deepEqual(a.map(p=>p.id),b.map(p=>p.id));
  assert.equal(a.length,7);
});

test("Classic deals seven unique prompts", () => {
  const prompts=chooseLineup({mode:"classic",day:"2026-11-22"});
  assert.equal(prompts.length,7);
  assert.equal(new Set(prompts.map(p=>p.id)).size,7);
});

test("Endless deals one fresh prompt at a time", () => {
  const first=chooseLineup({mode:"endless",recent:[]});
  const next=chooseLineup({mode:"endless",recent:[first[0].id]});
  assert.equal(first.length,1);
  assert.equal(next.length,1);
  assert.notEqual(next[0].id,first[0].id);
});

test("daily numbering begins at one", () => assert.equal(dayNumber("2026-11-22"),1));
