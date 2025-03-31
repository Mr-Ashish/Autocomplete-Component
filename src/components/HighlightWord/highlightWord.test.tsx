import React from "react";
import { render } from "@testing-library/react";
import HighlightWord from "./index";

describe("HighlightWord Component", () => {
  it("renders the full text when no matchingPrefix is provided", () => {
    const { getByText } = render(
      <HighlightWord text="Hello World" matchingPrefix="" />
    );
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("highlights the matching prefix in the text", () => {
    const { container } = render(
      <HighlightWord text="Hello World" matchingPrefix="Hello" />
    );
    const highlighted = container.querySelector("mark");
    expect(highlighted).toBeInTheDocument();
    expect(highlighted?.textContent).toBe("Hello");
  });

  it("is case-insensitive when highlighting", () => {
    const { container } = render(
      <HighlightWord text="Hello World" matchingPrefix="hello" />
    );
    const highlighted = container.querySelector("mark");
    expect(highlighted).toBeInTheDocument();
    expect(highlighted?.textContent).toBe("Hello");
  });

  it("does not highlight anything if matchingPrefix is not found", () => {
    const { container } = render(
      <HighlightWord text="Hello World" matchingPrefix="Test" />
    );
    const highlighted = container.querySelector("mark");
    expect(highlighted).not.toBeInTheDocument();
  });

  it("highlights multiple occurrences of the matching prefix", () => {
    const { container } = render(
      <HighlightWord text="Hello Hello World" matchingPrefix="Hello" />
    );
    const highlighted = container.querySelectorAll("mark");
    expect(highlighted.length).toBe(2);
    expect(highlighted[0].textContent).toBe("Hello");
    expect(highlighted[1].textContent).toBe("Hello");
  });

  it("renders correctly with an empty text", () => {
    const { container } = render(
      <HighlightWord text="" matchingPrefix="Hello" />
    );
    expect(container.textContent).toBe("");
  });

  it("renders correctly with an empty matchingPrefix", () => {
    const { getByText } = render(
      <HighlightWord text="Hello World" matchingPrefix="" />
    );
    expect(getByText("Hello World")).toBeInTheDocument();
  });
});
