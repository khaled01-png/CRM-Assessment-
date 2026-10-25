const assert = require("node:assert");
const { firstNonRepeatingChar, findTwoSum, countLeadsByStatus } = require("./solutions");

let passed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log("PASS  " + name);
  } catch (err) {
    console.log("FAIL  " + name);
    console.log("      " + err.message);
    process.exitCode = 1;
  }
}

test("firstNonRepeatingChar: aabbcdd", () => {
  assert.strictEqual(firstNonRepeatingChar("aabbcdd"), "c");
});

test("firstNonRepeatingChar: swiss", () => {
  assert.strictEqual(firstNonRepeatingChar("swiss"), "w");
});

test("firstNonRepeatingChar: no unique character", () => {
  assert.strictEqual(firstNonRepeatingChar("aabb"), null);
});

test("firstNonRepeatingChar: empty string", () => {
  assert.strictEqual(firstNonRepeatingChar(""), null);
});

test("firstNonRepeatingChar: ignores case when counting, keeps original case", () => {
  assert.strictEqual(firstNonRepeatingChar("aAbB"), null);
  assert.strictEqual(firstNonRepeatingChar("Aab"), "b");
  assert.strictEqual(firstNonRepeatingChar("aBBc"), "a");
  assert.strictEqual(firstNonRepeatingChar("sTreSs"), "T");
});

test("firstNonRepeatingChar: spaces are ignored", () => {
  assert.strictEqual(firstNonRepeatingChar("a b a"), "b");
  assert.strictEqual(firstNonRepeatingChar("   "), null);
});

test("firstNonRepeatingChar: punctuation counts as a normal character", () => {
  assert.strictEqual(firstNonRepeatingChar("a!a"), "!");
  assert.strictEqual(firstNonRepeatingChar("!!a!"), "a");
});

test("firstNonRepeatingChar: non-string input", () => {
  assert.strictEqual(firstNonRepeatingChar(undefined), null);
  assert.strictEqual(firstNonRepeatingChar(123), null);
});

test("findTwoSum: example 1", () => {
  assert.deepStrictEqual(findTwoSum([2, 7, 11, 15], 9), [0, 1]);
});

test("findTwoSum: example 2", () => {
  assert.deepStrictEqual(findTwoSum([3, 2, 4], 6), [1, 2]);
});

test("findTwoSum: duplicate values", () => {
  assert.deepStrictEqual(findTwoSum([3, 3], 6), [0, 1]);
});

test("findTwoSum: no pair", () => {
  assert.strictEqual(findTwoSum([1, 2, 3], 10), null);
});

test("findTwoSum: does not reuse the same element", () => {
  assert.strictEqual(findTwoSum([3], 6), null);
  assert.strictEqual(findTwoSum([3, 4], 6), null);
});

test("findTwoSum: negatives, zero and empty array", () => {
  assert.deepStrictEqual(findTwoSum([-3, 4, 3, 90], 0), [0, 2]);
  assert.deepStrictEqual(findTwoSum([0, 4, 0], 0), [0, 2]);
  assert.strictEqual(findTwoSum([], 5), null);
});

test("countLeadsByStatus: example from the brief", () => {
  const leads = [
    { name: "Alice", status: "NEW" },
    { name: "Bob", status: "CONTACTED" },
    { name: "Charlie", status: "NEW" },
    { name: "David", status: "QUALIFIED" },
  ];
  assert.deepStrictEqual(countLeadsByStatus(leads), { NEW: 2, CONTACTED: 1, QUALIFIED: 1 });
});

test("countLeadsByStatus: empty array", () => {
  assert.deepStrictEqual(countLeadsByStatus([]), {});
});

test("countLeadsByStatus: new status values are counted", () => {
  const leads = [
    { name: "Eve", status: "LOST" },
    { name: "Frank", status: "LOST" },
    { name: "Grace", status: "WON" },
  ];
  assert.deepStrictEqual(countLeadsByStatus(leads), { LOST: 2, WON: 1 });
});

test("countLeadsByStatus: does not change the original array", () => {
  const leads = [
    { name: "Alice", status: "NEW" },
    { name: "Bob", status: "NEW" },
  ];
  const copy = JSON.parse(JSON.stringify(leads));
  countLeadsByStatus(leads);
  assert.deepStrictEqual(leads, copy);
});

test("countLeadsByStatus: status named like an object property", () => {
  const leads = [{ name: "Zed", status: "constructor" }];
  assert.deepStrictEqual(countLeadsByStatus(leads), { constructor: 1 });
});

console.log("\n" + passed + " tests passed");
