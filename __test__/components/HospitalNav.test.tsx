import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LogoutButton } from "@/components/LogoutButton";
import HospitalNav from "@/components/hospitals/hospitalNav";

jest.mock("@/components/LogoutButton", () => ({
  LogoutButton: () => <button>Logout</button>,
}));

describe("HospitalNav", () => {
  test("renders user greeting, profile picture, and logout button", () => {
    const email = "user@example.com";
    const profilePicture = "/path/to/profile-picture.jpg";

    render(<HospitalNav email={email} profilePicture={profilePicture} />);

    expect(screen.getByText(`Hi 👋, ${email}`)).toBeInTheDocument();

    const profileImage = screen.getByAltText("User Profile Picture");
    expect(profileImage).toBeInTheDocument();

    expect(profileImage).toHaveAttribute("alt", "User Profile Picture");

    expect(screen.getByText("Logout")).toBeInTheDocument();

    expect(
      screen.getByText("Discover the best hospitals near you...")
    ).toBeInTheDocument();
  });
});
