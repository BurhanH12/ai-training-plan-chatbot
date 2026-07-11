import { describe, it, expect } from "vitest";
import { buildSystemPrompt } from "./gemini";
import { siteContent } from "@/content/site-content";

describe("buildSystemPrompt", () => {
  it("includes the brand name", () => {
    expect(buildSystemPrompt()).toContain(siteContent.brand.name);
  });

  it("includes every feature name so the bot can answer questions about any of them", () => {
    const prompt = buildSystemPrompt();
    for (const category of siteContent.featureCategories) {
      for (const feature of category.features) {
        expect(prompt).toContain(feature.name);
      }
    }
  });

  it("includes instructions to only answer from the provided content", () => {
    const prompt = buildSystemPrompt();
    expect(prompt.toLowerCase()).toContain("only");
  });
});
