import { render, screen, fireEvent } from "@testing-library/react";
// import { LogoutButton } from "@/components/LogoutButton"; // Update the import path if needed
import { LogoutButton } from "@/components/LogoutButton";
import { logout } from "@/serveractions/logout";

// Mock the logout function
jest.mock("@/serveractions/logout", () => ({
  logout: jest.fn(),
}));

describe("LogoutButton", () => {
  it("calls the logout function when clicked", () => {
    // Render the LogoutButton component
    render(<LogoutButton />);

    // Find the button by its text
    const button = screen.getByText("Logout");

    // Simulate a click event on the button
    fireEvent.click(button);

    // Check if the logout function was called
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
