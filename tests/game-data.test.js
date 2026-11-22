import test from "node:test";
import assert from "node:assert/strict";
import { PROMPTS, findAnswer, scoreForRank, publicBoard } from "../game-data.js";

test("middle rank receives the maximum score", () => {
  assert.equal(scoreForRank(5, 9), 100);
});

test("scores fall symmetrically toward both popularity extremes", () => {
  assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9].map(rank => scoreForRank(rank, 9)), [20, 40, 60, 80, 100, 80, 60, 40, 20]);
});

test("answer aliases resolve to their canonical survey answer", () => {
  const prompt = PROMPTS.find(item => item.id === "movie-snack");
  const result = findAnswer(prompt, "pop corn");
  assert.equal(result.answer, "Popcorn");
  assert.equal(result.rank, 1);
  assert.equal(result.score, 20);
});

test("the sample board contains nine ranked answers", () => {
  const board = publicBoard(PROMPTS[0]);
  assert.equal(board.length, 9);
  assert.equal(board[4].rank, 5);
  assert.equal(board[4].score, 100);
});
