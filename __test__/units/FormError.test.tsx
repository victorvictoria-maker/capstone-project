import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormError } from "@/components/FormError";

describe("FormError", () => {
  test("renders the error message when provided", () => {
    const errorMessage = "This is an error message";

    render(<FormError message={errorMessage} />);

    const messageElement = screen.getByText(errorMessage);
    expect(messageElement).toBeInTheDocument();
  });

  test("does not render anything when no message is provided", () => {
    const { container } = render(<FormError />);

    expect(container.firstChild).toBeNull();
  });
});
