import { advisoryRules } from "../rules/advisoryRules.js";

export function generateAdvisory(weather, soil, crop) {
  const normalizedCrop = crop?.trim().toLowerCase() || null;

  const advice = [];

  for (const rule of advisoryRules) {
    const ruleCrop =
      rule.crop === "ALL" ? "ALL" : rule.crop.trim().toLowerCase();

    const appliesToCrop = ruleCrop === "ALL" || ruleCrop === normalizedCrop;

    if (appliesToCrop && rule.condition(weather, soil)) {
      advice.push(rule.message);
    }
  }

  if (advice.length === 0) {
    advice.push(
      "Weather conditions appear suitable for normal farming activities.",
    );
  }

  return advice;
}
