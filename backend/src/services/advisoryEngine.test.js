import { describe, expect, it } from "vitest";
import { generateAdvisory } from "./advisoryEngine.js";

describe("generateAdvisory", () => {
  it("returns general and crop-specific advice for rice", () => {
    const advice = generateAdvisory(
      {
        temperature: 39,
        humidity: 92,
        windSpeed: 18,
        rainProbability: 75,
      },
      "Rice",
    );

    expect(advice).toEqual(
      expect.arrayContaining([
        "Heavy rain likely. Avoid irrigation and fertilizer application.",
        "Strong winds detected. Avoid pesticide spraying.",
        "Extreme heat conditions. Ensure proper irrigation.",
        "Very high humidity may increase fungal disease risk.",
        "Conditions favor rice blast disease. Inspect leaves.",
        "High temperature stress for rice. Maintain field water levels.",
        "Rain expected. Delay irrigation in paddy fields.",
      ]),
    );
  });

  it("falls back to the default message when no rules match", () => {
    expect(
      generateAdvisory(
        {
          temperature: 22,
          humidity: 40,
          windSpeed: 3,
          rainProbability: 10,
        },
        "Wheat",
      ),
    ).toEqual([
      "Weather conditions appear suitable for normal farming activities.",
    ]);
  });
});
