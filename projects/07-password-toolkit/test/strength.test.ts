import { test } from "node:test";
import assert from "node:assert/strict";
import { checkStrength } from "../src/index.ts";

test("common passwords score zero", () => {
  assert.equal(checkStrength("password").score, 0);
  assert.equal(checkStrength("Password").rating, "very weak");
});

test("long mixed passwords are very strong", () => {
  assert.equal(checkStrength("t7#Kp2!vQz9@Lm4&").rating, "very strong");
});

test("tips explain what is missing", () => {
  const { tips } = checkStrength("abcdefgh");
  assert.ok(tips.includes("Add digits"));
  assert.ok(tips.includes("Add symbols"));
});

test("repeated characters cost points", () => {
  assert.ok(checkStrength("Aaaa1!xyzQ").score < checkStrength("Abcd1!xyzQ").score);
});
