import { describe, it, expect } from "vitest";
import { buildErrorReply } from "./route";

describe("buildErrorReply", () => {
  it("returns a friendly, non-technical fallback message", () => {
    const reply = buildErrorReply(new Error("quota exceeded"));
    expect(reply).toMatch(/trouble|unable|try again/i);
    expect(reply).not.toContain("quota exceeded");
  });
});
