// Chapter 7.8 - Writing automated tests with node:test
// Run: npx tsx --test chapter-07-modules-tooling/08-testing.ts
//
// Real-world picture: a quality-control station at a factory. Every product is
// checked automatically before it leaves, so faults are caught early, every time.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { circleArea, floorArea } from "./lib/geometry.ts";
import { incomeTax } from "./lib/legacy-tax.js";

describe("geometry", () => {
  test("circle of radius 1 has area PI", () => {
    assert.equal(circleArea(1), Math.PI);
  });

  test("floor area adds up all rooms", () => {
    const area = floorArea([
      { name: "A", width: 2, length: 3 },
      { name: "B", width: 1.5, length: 2 },
    ]);
    assert.equal(area, 9);
  });
});

describe("income tax", () => {
  test("no tax up to 3 lakh", () => {
    assert.equal(incomeTax(300_000), 0);
  });

  test("5% slab", () => {
    assert.equal(incomeTax(500_000), 10_000);
  });

  test("10% slab above 7 lakh", () => {
    assert.equal(incomeTax(800_000), 30_000);
  });
});
