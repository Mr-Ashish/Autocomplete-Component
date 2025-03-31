import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "./index";

describe("Input Component", () => {
  const mockOnChange = jest.fn();
  const mockOnFocus = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls between tests
  });

  test("renders empty text input", () => {
    render(<TextInput value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText("Start typing...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("onChange triggers when value changes", () => {
    render(<TextInput value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText("Start typing...");

    fireEvent.change(input, { target: { value: "new value" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("new value");
  });

  test("calls onFocus when input is focused", () => {
    render(
      <TextInput value="" onChange={mockOnChange} onFocus={mockOnFocus} />
    );
    const input = screen.getByPlaceholderText("Start typing...");
    fireEvent.focus(input);

    expect(mockOnFocus).toHaveBeenCalledTimes(1);
  });

  test("classname correctly assigned", () => {
    render(
      <TextInput
        value=""
        onChange={mockOnChange}
        onFocus={mockOnFocus}
        className="testClass"
      />
    );
    const input = screen.getByPlaceholderText("Start typing...");
    expect(input).toHaveClass("testClass");
  });

  test("aria labels are correctly set for input", () => {
    const testPlaceHolder = "test-placeholder";
    render(
      <TextInput
        value=""
        onChange={mockOnChange}
        onFocus={mockOnFocus}
        placeholder={testPlaceHolder}
      />
    );
    const input = screen.getByPlaceholderText(testPlaceHolder);
    expect(input).toHaveAttribute("aria-label", testPlaceHolder);
  });
});
