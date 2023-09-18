import { render, fireEvent, screen } from "@testing-library/react";
import Form from "../src/components/Form/index";
import "@testing-library/jest-dom";

// Define mock functions for event handlers
const handleCountryCodeChange = jest.fn();
const handleQuantityChange = jest.fn();
const handleGenerateClick = jest.fn();

const renderForm = (props = {}) => {
  const defaultProps = {
    countryCode: "",
    quantity: 0,
    countryCodeError: "",
    quantityError: "",
    onCountryCodeChange: handleCountryCodeChange,
    onQuantityChange: handleQuantityChange,
    onGenerateClick: handleGenerateClick,
    ...props,
  };

  return render(<Form {...defaultProps} />);
};

describe("Form Component", () => {
  it("Form has been rendered without errors", () => {
    const { container } = renderForm();
    expect(container.firstChild).toBeInTheDocument();
  });
  it("renders the form with correct initial values", () => {
    renderForm();

    expect(screen.getByLabelText("Country Code")).toBeInTheDocument();
    expect(screen.getByLabelText("Quantity")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Generate Phone Numbers" })
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Country Code")).toHaveValue("");
    expect(screen.getByLabelText("Quantity")).toHaveValue(0);
  });

  it("calls the onGenerateClick handler when the button is clicked", () => {
    renderForm();

    const generateButton = screen.getByRole("button", {
      name: "Generate Phone Numbers",
    });
    fireEvent.click(generateButton);

    expect(handleGenerateClick).toHaveBeenCalled();
  });
});
