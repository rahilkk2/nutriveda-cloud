/**
 * Ayurvedic Diet Engine
 * Priority order:
 * Agni > Appetite > Dosha > Lifestyle
 */

function dietEngine(dosha, agni, lifestyle = {}, budget = "medium") {
  const appetite = lifestyle.appetite || "normal";
  const stress = lifestyle.stress || "low";
  const bodyType = lifestyle.bodyType || "medium";

  let plan = {
    breakfast: [],
    lunch: [],
    dinner: []
  };

  /* ------------------
     BASE DOSHA
  ------------------ */
  if (dosha === "vata") {
    plan.breakfast = ["Warm milk", "Oats"];
    plan.lunch = ["Rice", "Moong dal"];
    plan.dinner = ["Khichdi"];
  }

  if (dosha === "pitta") {
    plan.breakfast = ["Fruits"];
    plan.lunch = ["Rice", "Vegetables", "Curd"];
    plan.dinner = ["Light vegetable soup"];
  }

  if (dosha === "kapha") {
    plan.breakfast = ["Millets"];
    plan.lunch = ["Vegetables", "Dal"];
    plan.dinner = ["Soup"];
  }

  /* ------------------
     AGNI OVERRIDE
  ------------------ */
  if (agni === "Vishama Agni") {
    plan.breakfast = ["Warm water", "Oats"];
    plan.lunch = ["Rice", "Moong dal"];
    plan.dinner = ["Light khichdi"];
  }

  if (agni === "Manda Agni") {
    plan.breakfast = ["Warm water"];
    plan.lunch = ["Thin dal soup"];
    plan.dinner = ["Very light soup"];
  }

  /* ------------------
     APPETITE OVERRIDE
  ------------------ */
  if (appetite === "low") {
    plan.breakfast = ["Warm water"];
    plan.lunch = ["Light khichdi"];
    plan.dinner = ["Very light soup"];
  }

  if (appetite === "high") {
    plan.breakfast.push("Soaked nuts");
    plan.lunch.push("Extra dal");
  }

  if (appetite === "variable") {
    plan.breakfast = ["Warm water", "Ginger tea"];
    plan.dinner = ["Early light dinner"];
  }

  /* ------------------
     STRESS
  ------------------ */
  if (stress === "high") {
    plan.dinner.push("Ashwagandha milk");
  }

  /* ------------------
     BODY TYPE
  ------------------ */
  if (bodyType === "heavy") {
    plan.lunch = plan.lunch.filter(i => i !== "Rice");
    plan.lunch.push("Millets");
  }

  /* ------------------
     BUDGET
  ------------------ */
  if (budget === "low") {
    plan.breakfast = plan.breakfast.filter(i => i !== "Coconut water");
  }

  return plan;
}

module.exports = dietEngine;
