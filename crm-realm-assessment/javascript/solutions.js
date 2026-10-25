function firstNonRepeatingChar(str) {
  if (typeof str !== "string") {
    return null;
  }

  const counts = new Map();

  for (const ch of str) {
    if (/\s/.test(ch)) {
      continue;
    }
    const key = ch.toLowerCase();
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  for (const ch of str) {
    if (/\s/.test(ch)) {
      continue;
    }
    if (counts.get(ch.toLowerCase()) === 1) {
      return ch;
    }
  }

  return null;
}

function findTwoSum(numbers, target) {
  if (!Array.isArray(numbers)) {
    return null;
  }

  const seen = new Map();

  for (let i = 0; i < numbers.length; i++) {
    const needed = target - numbers[i];

    if (seen.has(needed)) {
      return [seen.get(needed), i];
    }

    seen.set(numbers[i], i);
  }

  return null;
}

function countLeadsByStatus(leads) {
  const counts = {};

  if (!Array.isArray(leads)) {
    return counts;
  }

  for (const lead of leads) {
    const status = lead.status;
    const current = Object.hasOwn(counts, status) ? counts[status] : 0;
    counts[status] = current + 1;
  }

  return counts;
}

module.exports = { firstNonRepeatingChar, findTwoSum, countLeadsByStatus };
