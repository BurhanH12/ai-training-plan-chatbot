import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { siteContent } from "@/content/site-content";

describe("Home", () => {
  it("renders the hero and CTA copy from site content", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toHaveTextContent(siteContent.landing.heroHeadlineSuffix);
    expect(
      screen.getByRole("heading", { name: siteContent.landing.finalCta.heading })
    ).toBeInTheDocument();
  });
});
