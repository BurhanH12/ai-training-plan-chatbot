import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders the default scaffold heading", () => {
    render(<Home />);
    expect(
      screen.getByText(/to get started, edit the page.tsx file/i)
    ).toBeInTheDocument();
  });
});
