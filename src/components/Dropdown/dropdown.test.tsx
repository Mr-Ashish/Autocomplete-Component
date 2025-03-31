import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Dropdown from "./index";
import { SingleWordOption } from "../../types/autocomplete";

describe("Dropdown Component", () => {
  const mockOnSelect = jest.fn();
  const options: SingleWordOption[] = [
    { text: "Option 1", id: "option_1" },
    { text: "Option 2", id: "option_2" },
    { text: "Option 3", id: "option_3" },
  ];

  beforeAll(() => {
    // Mock scrollIntoView for all tests as it is not there no scroll into view for jsdom
    Element.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when show is false", () => {
    const { queryByRole } = render(
      <Dropdown
        options={options}
        onSelect={mockOnSelect}
        selectedOption={null}
        show={false}
        matchingPrefix=""
        isLoading={false}
        isError={false}
        id="dropdown"
      />
    );
    expect(queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders correctly when show is true", () => {
    const { getByRole } = render(
      <Dropdown
        options={options}
        onSelect={mockOnSelect}
        selectedOption={null}
        show={true}
        matchingPrefix=""
        isLoading={false}
        isError={false}
        id="dropdown"
      />
    );
    expect(getByRole("listbox")).toBeInTheDocument();
  });

  it("renders the correct number of options", () => {
    const { getAllByRole } = render(
      <Dropdown
        options={options}
        onSelect={mockOnSelect}
        selectedOption={null}
        show={true}
        matchingPrefix=""
        isLoading={false}
        isError={false}
        id="dropdown"
      />
    );
    expect(getAllByRole("option").length).toBe(options.length);
  });

  it("displays 'Loading' when isLoading is true", () => {
    const { getByText } = render(
      <Dropdown
        options={options}
        onSelect={mockOnSelect}
        selectedOption={null}
        show={true}
        matchingPrefix=""
        isLoading={true}
        isError={false}
        id="dropdown"
      />
    );
    expect(getByText("Loading")).toBeInTheDocument();
  });

  it("displays 'Error Occurred' when isError is true", () => {
    const { getByText } = render(
      <Dropdown
        options={options}
        onSelect={mockOnSelect}
        selectedOption={null}
        show={true}
        matchingPrefix=""
        isLoading={false}
        isError={true}
        id="dropdown"
      />
    );
    expect(getByText("Error Occurred")).toBeInTheDocument();
  });

  it("displays 'No suggestions available' when options are empty", () => {
    const { getByText } = render(
      <Dropdown
        options={[]}
        onSelect={mockOnSelect}
        selectedOption={null}
        show={true}
        matchingPrefix=""
        isLoading={false}
        isError={false}
        id="dropdown"
      />
    );
    expect(getByText("No suggestions available")).toBeInTheDocument();
  });

  it("calls onSelect when an option is clicked", () => {
    const { getByText } = render(
      <Dropdown
        options={options}
        onSelect={mockOnSelect}
        selectedOption={null}
        show={true}
        matchingPrefix=""
        isLoading={false}
        isError={false}
        id="dropdown"
      />
    );
    fireEvent.click(getByText("Option 2"));
    expect(mockOnSelect).toHaveBeenCalledWith(options[1]);
  });

  it("updates focusedIndex on mouse enter", () => {
    const { getByText } = render(
      <Dropdown
        options={options}
        onSelect={mockOnSelect}
        selectedOption={null}
        show={true}
        matchingPrefix=""
        isLoading={false}
        isError={false}
        id="dropdown"
      />
    );
    fireEvent.mouseEnter(getByText("Option 3"));
    expect(getByText("Option 3")).toHaveClass("focused");
  });

  it("supports keyboard navigation with ArrowDown and ArrowUp", () => {
    const { getByRole, getByText } = render(
      <Dropdown
        options={options}
        onSelect={mockOnSelect}
        selectedOption={null}
        show={true}
        matchingPrefix=""
        isLoading={false}
        isError={false}
        id="dropdown"
      />
    );
    const dropdown = getByRole("listbox");

    fireEvent.keyDown(dropdown, { key: "ArrowDown" });
    expect(getByText("Option 1")).toHaveClass("focused");

    fireEvent.keyDown(dropdown, { key: "ArrowDown" });
    expect(getByText("Option 2")).toHaveClass("focused");

    fireEvent.keyDown(dropdown, { key: "ArrowUp" });
    expect(getByText("Option 1")).toHaveClass("focused");
  });

  it("selects an option with Enter key", () => {
    const { getByRole } = render(
      <Dropdown
        options={options}
        onSelect={mockOnSelect}
        selectedOption={null}
        show={true}
        matchingPrefix=""
        isLoading={false}
        isError={false}
        id="dropdown"
      />
    );
    const dropdown = getByRole("listbox");

    fireEvent.keyDown(dropdown, { key: "ArrowDown" });
    fireEvent.keyDown(dropdown, { key: "Enter" });

    expect(mockOnSelect).toHaveBeenCalledWith(options[0]);
  });
});
