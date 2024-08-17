import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Herosection from "@/components/hospitals/landingpage/herosection";

describe("Herosection", () => {
  test("renders hero section content", async () => {
    render(<Herosection />);

    expect(screen.getByText(/Health Comes First/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Care Connect: Finding the right care for you/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Our mission is to connect you with the best healthcare options/i
      )
    ).toBeInTheDocument();

    expect(screen.getByText(/Find Hospitals/i)).toBeInTheDocument();
    expect(screen.getByText(/About Project/i)).toBeInTheDocument();

    const stats = await screen.findAllByText(/2,000+/i);
    expect(stats.length).toBeGreaterThanOrEqual(1);

    const hospitalsHeadings = await screen.findAllByText(/Hospitals/i);
    expect(hospitalsHeadings.length).toBeGreaterThanOrEqual(1);
  });
});
