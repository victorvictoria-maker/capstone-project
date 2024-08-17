import { render, screen, fireEvent, act } from "@testing-library/react";
import { Hospital } from "../../types";
import EditPopover from "@/components/hospitals/edithospitalform";

const mockHospital: Hospital = {
  id: 1,
  name: "Test Hospital",
  address: "123 Main St",
  phone_number: "123-456-7890",
  state: { id: 1, name: "Test State" },
  stateId: 1,
  tier: { id: 1, name: "Tier 1" },
  tierId: 1,
  type: { id: 1, name: "General" },
  typeId: 1,
};

const mockDropdownOptions = {
  states: [{ id: 1, name: "Test State" }],
  types: [{ id: 1, name: "General" }],
  tiers: [{ id: 1, name: "Tier 1" }],
};

describe("EditPopover", () => {
  test("renders and submits form", async () => {
    const mockOnClose = jest.fn();
    const mockOnHospitalUpdated = jest.fn();

    render(
      <EditPopover
        hospital={mockHospital}
        onClose={mockOnClose}
        onHospitalUpdated={mockOnHospitalUpdated}
        dropdownOptions={mockDropdownOptions}
      />
    );

    expect(screen.getByPlaceholderText(/Name/i)).toHaveValue("Test Hospital");
    expect(screen.getByPlaceholderText(/Address/i)).toHaveValue("123 Main St");
    expect(screen.getByPlaceholderText(/Phone Number/i)).toHaveValue(
      "123-456-7890"
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/Update/i));
    });

    expect(mockOnHospitalUpdated).toHaveBeenCalledWith(mockHospital);
  });
});
