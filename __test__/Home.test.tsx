import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("should have Sign Up text", () => {
  render(<Home />);

  const myElem = screen.getByText("Sign Up");

  expect(myElem).toBeInTheDocument();
});

import "@testing-library/jest-dom";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Home />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings.length).toBeGreaterThan(0);
  });
});
