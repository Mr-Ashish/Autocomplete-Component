import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Autocomplete from "./index";
import { useAutoCompleteSuggestions } from "../../hooks/useAutoCompleteSuggestions";

jest.mock("../../hooks/useAutoCompleteSuggestions", () => ({
  useAutoCompleteSuggestions: jest.fn(),
}));

describe("Autocomplete Component", () => {
  const mockOnSelect = jest.fn();
  const mockSuggestions = [
    { text: "Option 1", id: "option_1" },
    { text: "Option 2", id: "option_2" },
    { text: "Option 3", id: "option_3" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    (useAutoCompleteSuggestions as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    const { getByRole } = render(<Autocomplete onSelect={mockOnSelect} />);
    expect(getByRole("combobox")).toBeInTheDocument();
  });

  it("renders the TextInput component with correct props", () => {
    (useAutoCompleteSuggestions as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    const { getByPlaceholderText } = render(
      <Autocomplete onSelect={mockOnSelect} />
    );
    const input = getByPlaceholderText("Start typing...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("renders the Dropdown component when shouldShowSuggestions is true", () => {
    (useAutoCompleteSuggestions as jest.Mock).mockReturnValue({
      data: mockSuggestions,
      loading: false,
      error: null,
    });

    const { getByRole } = render(<Autocomplete onSelect={mockOnSelect} />);
    expect(getByRole("listbox")).toBeInTheDocument();
  });

  it("updates matchingPrefix when typing in TextInput", () => {
    (useAutoCompleteSuggestions as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    const { getByPlaceholderText } = render(
      <Autocomplete onSelect={mockOnSelect} />
    );
    const input = getByPlaceholderText("Start typing...");

    fireEvent.change(input, { target: { value: "Option" } });
    expect(input).toHaveValue("Option");
  });

  it("displays suggestions in Dropdown based on matchingPrefix", async () => {
    (useAutoCompleteSuggestions as jest.Mock).mockReturnValue({
      data: mockSuggestions,
      loading: false,
      error: null,
    });

    const { getByPlaceholderText, getByTestId } = render(
      <Autocomplete onSelect={mockOnSelect} />
    );
    const input = getByPlaceholderText("Start typing...");

    fireEvent.change(input, { target: { value: "Option" } });

    await waitFor(() => {
      expect(getByTestId("option_1")).toBeInTheDocument();
      expect(getByTestId("option_2")).toBeInTheDocument();
      expect(getByTestId("option_3")).toBeInTheDocument();
    });
  });

  it("calls handleOptionSelect when an option is clicked", async () => {
    (useAutoCompleteSuggestions as jest.Mock).mockReturnValue({
      data: mockSuggestions,
      loading: false,
      error: null,
    });

    const { getByTestId } = render(<Autocomplete onSelect={mockOnSelect} />);
    const option = getByTestId("option_2");

    fireEvent.click(option);

    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith({
        text: "Option 2",
        id: "option_2",
      });
    });
  });

  it("displays 'Loading' when loading is true", () => {
    (useAutoCompleteSuggestions as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    const { getByText } = render(<Autocomplete onSelect={mockOnSelect} />);
    expect(getByText("Loading")).toBeInTheDocument();
  });

  it("displays an error message when error is not null", () => {
    (useAutoCompleteSuggestions as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: { message: "Something went wrong" },
    });

    const { getByText } = render(<Autocomplete onSelect={mockOnSelect} />);
    expect(getByText("Something went wrong")).toBeInTheDocument();
  });

  it("displays 'No suggestions available' when no suggestions are returned", async () => {
    (useAutoCompleteSuggestions as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    const { getByText } = render(<Autocomplete onSelect={mockOnSelect} />);
    await waitFor(() => {
      expect(getByText("No suggestions available")).toBeInTheDocument();
    });
  });
});
