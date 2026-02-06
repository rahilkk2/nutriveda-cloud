/**
 * Agni Analysis Engine
 */

function agniEngine(input) {
  if (input.digestion === "strong" && input.appetite === "high") {
    return "Strong Agni";
  }

  if (input.digestion === "irregular") {
    return "Vishama Agni";
  }

  if (input.digestion === "slow") {
    return "Manda Agni";
  }

  return "Balanced Agni";
}

module.exports = agniEngine;
