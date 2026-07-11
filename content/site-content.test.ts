import { describe, it, expect } from "vitest";
import { siteContent } from "./site-content";

describe("siteContent", () => {
  it("has brand info", () => {
    expect(siteContent.brand.name).toBe("AiTrainingPlan");
  });

  it("has all 6 feature categories", () => {
    expect(siteContent.featureCategories).toHaveLength(6);
    const ids = siteContent.featureCategories.map((c) => c.id);
    expect(ids).toEqual([
      "training",
      "ai-coach",
      "nutrition",
      "health",
      "performance",
      "settings",
    ]);
  });

  it("has 34 total features across categories", () => {
    const total = siteContent.featureCategories.reduce(
      (sum, c) => sum + c.features.length,
      0
    );
    expect(total).toBe(34);
  });

  it("every feature has a non-empty description, at least one bullet, and at least one FAQ", () => {
    for (const category of siteContent.featureCategories) {
      for (const feature of category.features) {
        expect(feature.description.length).toBeGreaterThan(0);
        expect(feature.bullets.length).toBeGreaterThan(0);
        expect(feature.faqs.length).toBeGreaterThan(0);
        for (const faq of feature.faqs) {
          expect(faq.question.length).toBeGreaterThan(0);
          expect(faq.answer.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("has 5 sport categories and 4 race priority tiers", () => {
    expect(siteContent.sports).toHaveLength(5);
    expect(siteContent.racePriorities).toHaveLength(4);
  });

  it("has 5 integrations", () => {
    expect(siteContent.integrations).toHaveLength(5);
  });
});
