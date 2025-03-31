import React, { useState } from "react";
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
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selectedOption,
  show,
  matchingPrefix,
  isLoading,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  if (!show) return null;
  const handleOptionSelect = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const selectedId = target.id;
    if (selectedId) {
      const selectedOption = options.find((option) => option.id === selectedId);
      if (selectedOption) {
        onSelect(selectedOption);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === options.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      onSelect(options[focusedIndex]);
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
              id={option.id}
              className={`suggestion ${
                selectedOption && selectedOption.id === option.id
                  ? "selected"
                  : ""
              } ${focusedIndex === index ? "focused" : ""}`}
              tabIndex={0}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={handleOptionSelect}
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

  const renderCOmponentBasedOnState = () => {
    if (isLoading) return renderLoading();
    if (options.length === 0) return renderEmptyState();
    return renderOptions();
  };

  return (
    <div className="dropdownContainer" onKeyDown={handleKeyDown} tabIndex={-1}>
      {renderCOmponentBasedOnState()}
    </div>
  );
};

export default Dropdown;
