import test from "node:test";
import assert from "node:assert/strict";
import { PROMPTS, findAnswer, findPrompt, scoreForRank, tierForRank, publicBoard, boardForPrompt, scoreAnswer, findCorrection } from "../game-data.js";

test("middle rank receives the maximum score", () => {
  assert.equal(scoreForRank(5, 9), 100);
  assert.equal(tierForRank(5, 9), "skyhigh");
});

test("scores taper symmetrically toward both popularity extremes", () => {
  assert.deepEqual([1,2,3,4,5,6,7,8,9].map(rank => scoreForRank(rank,9)), [20,40,60,80,100,80,60,40,20]);
});

test("rank tiers mirror the middle-weighted score curve", () => {
  assert.deepEqual([1,2,3,4,5,6,7,8,9].map(rank => tierForRank(rank,9)), ["grounded","treetop","kite","cloud","skyhigh","cloud","kite","treetop","grounded"]);
});

test("answer aliases resolve to canonical answers and their score", () => {
  const result=scoreAnswer(findPrompt("movie-snack"),"pop corn");
  assert.equal(result.accepted,true);
  assert.equal(result.answer,"Popcorn");
  assert.equal(result.rank,1);
  assert.equal(result.points,20);
});

test("public answer board contains nine ranked answers", () => {
  const board=boardForPrompt(PROMPTS[0]);
  assert.equal(board.length,9);
  assert.equal(board[4].rank,5);
  assert.equal(board[4].points,100);
  assert.equal(board[4].tier,"skyhigh");
  assert.equal(publicBoard(PROMPTS[0])[8].points,20);
});

test("off-board answers require relevance approval and receive the lowest score", () => {
  const prompt=findPrompt("movie-snack");
  assert.equal(scoreAnswer(prompt,"car").accepted,false);
  const accepted=scoreAnswer(prompt,"ice cream",{allowUnknown:true});
  assert.equal(accepted.accepted,true);
  assert.equal(accepted.points,20);
  assert.equal(accepted.tier,"grounded");
});

test("typo correction returns an unambiguous canonical answer", () => {
  assert.equal(findCorrection(findPrompt("movie-snack"),"popcorm"),"Popcorn");
});

test("all sample prompts have nine board positions", () => {
  assert.ok(PROMPTS.length>=7);
  for(const prompt of PROMPTS) assert.equal(prompt.board.length,9);
});
