import { test } from "node:test";
import assert from "node:assert/strict";
import { generatePassphrase, generatePassword } from "../src/index.ts";

test("password has the requested length", () => {
  for (const length of [8, 16, 64]) {
    assert.equal(generatePassword({ length }).length, length);
  }
});

test("password contains every chosen character group", () => {
  for (let i = 0; i < 50; i++) {
    const p = generatePassword({ length: 8 });
    assert.match(p, /[a-z]/);
    assert.match(p, /[A-Z]/);
    assert.match(p, /[0-9]/);
    assert.match(p, /[^A-Za-z0-9]/);
  }
});

test("symbols can be switched off", () => {
  const p = generatePassword({ length: 40, symbols: false });
  assert.match(p, /^[A-Za-z0-9]+$/);
});

test("too-short length is rejected", () => {
  assert.throws(() => generatePassword({ length: 4 }), RangeError);
});

test("passphrase has the requested words plus a number", () => {
  const parts = generatePassphrase(5).split("-");
  assert.equal(parts.length, 6);
  assert.match(parts[5], /^\d{2}$/);
});
