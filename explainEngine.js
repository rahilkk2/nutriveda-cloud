/**
 * Explanation Engine (English – Professional & Clinical)
 * -----------------------------------------------------
 * Generates clear, human-readable reasoning
 * for why a particular diet was recommended.
 */

function explainEngine(input, dosha, agni) {
  let reasons = [];

  // Appetite based explanations
  if (input.appetite === "low") {
    reasons.push(
      "Because your appetite is low, light and easy-to-digest meals have been recommended to avoid overloading digestion."
    );
  }

  if (input.appetite === "high") {
    reasons.push(
      "Since your appetite is strong, nourishing foods with adequate protein and energy have been included."
    );
  }

  if (input.appetite === "variable") {
    reasons.push(
      "Irregular appetite indicates fluctuating digestion, so simple and consistent meals have been suggested."
    );
  }

  // Agni based explanations
  if (agni === "Vishama Agni") {
    reasons.push(
      "Irregular digestive fire (Vishama Agni) benefits from warm, cooked and grounding foods."
    );
  }

  if (agni === "Manda Agni") {
    reasons.push(
      "Weak digestive fire (Manda Agni) requires very light meals to support proper digestion."
    );
  }

  if (agni === "Strong Agni") {
    reasons.push(
      "Strong digestion allows for balanced and complete meals without stressing the system."
    );
  }

  // Stress based explanation
  if (input.stress === "high") {
    reasons.push(
      "High stress can disturb digestion, so calming and grounding foods have been added."
    );
  }

  // Dosha based explanation
  reasons.push(
    `The diet has been customized to help balance your dominant ${dosha.dominant} dosha.`
  );

  return reasons;
}

module.exports = explainEngine;
