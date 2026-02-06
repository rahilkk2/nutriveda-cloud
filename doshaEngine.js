/**
 * Dosha Analysis Engine
 * Returns scores + dominant dosha
 */

function doshaEngine(input) {
  let scores = { vata: 0, pitta: 0, kapha: 0 };

  // Body type
  if (input.body === "thin") scores.vata += 2;
  if (input.body === "medium") scores.pitta += 2;
  if (input.body === "heavy") scores.kapha += 2;

  // Digestion
  if (input.digestion === "irregular") scores.vata += 2;
  if (input.digestion === "strong") scores.pitta += 2;
  if (input.digestion === "slow") scores.kapha += 2;

  // Stress
  if (input.stress === "high") scores.vata += 1;

  const dominant = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  return { scores, dominant };
}

module.exports = doshaEngine;
