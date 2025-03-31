import React, { useEffect, useRef, useState } from "react";
import { SingleWordOption } from "../../types/autocomplete";
import "./index.css";
import HighlightWord from "../HighlightWord";

type DropdownProps = {
  options: SingleWordOption[];
  onSelect: (option: SingleWordOption) => void;
  selectedOption: SingleWordOption | null;
  show: boolean;
  matchingPrefix: string;
  isLoading: boolean;
  isError: boolean;
  id: string;
  onEscape?: () => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selectedOption,
  show,
  matchingPrefix,
  isLoading,
  isError,
  id,
  onEscape,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Array of refs for each option

  // reset to -1 on options change
  useEffect(() => {
    setFocusedIndex(-1);
  }, [options]);

  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedIndex]);

  const handleOptionSelect = (selectedValue: SingleWordOption) => {
    if (selectedValue) {
      const selectedOption = options.find(
        (option) => option.id === selectedValue.id
      );
      if (selectedOption) {
        onSelect(selectedOption);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === options.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex <= 0 ? options.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      onSelect(options[focusedIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onEscape?.();
    }
  };

  const handleMouseEnter = (index: number) => {
    setFocusedIndex(index);
  };

  const renderOptions = () => {
    return (
      <>
        {options.map((option: SingleWordOption, index) => {
          return (
            <div
              key={option.id}
              id={`option-${option.id}`}
              data-testid={option.id}
              ref={(el) => (optionRefs.current[index] = el)} // Assign ref to each option
              className={`suggestion ${
                selectedOption && selectedOption.id === option.id
                  ? "selected"
                  : ""
              } ${focusedIndex === index ? "focused" : ""}`}
              tabIndex={0}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => handleOptionSelect(option)}
              role="option"
              aria-selected={selectedOption?.id === option.id}
            >
              <HighlightWord
                text={option.text}
                matchingPrefix={matchingPrefix}
              />
            </div>
          );
        })}
      </>
    );
  };

  const renderEmptyState = () => {
    return <div className="no-suggestions">No suggestions available</div>;
  };

  const renderLoading = () => {
    return <div className="loading">Loading</div>;
  };

  // already handled in the parent component
  const renderError = () => {
    return null;
  };

  const renderComponentBasedOnState = () => {
    if (isError) return renderError();
    if (isLoading) return renderLoading();
    if (options.length === 0) return renderEmptyState();
    return renderOptions();
  };

  if (!show) return null;

  return (
    <div className="dropdownWrapper">
      <div
        id={id}
        className="dropdownContainer"
        onKeyDown={handleKeyDown}
        role="listbox"
        aria-activedescendant={
          focusedIndex >= 0 ? options[focusedIndex]?.id : undefined
        }
      >
        {renderComponentBasedOnState()}
      </div>
    </div>
  );
};

export default Dropdown;
