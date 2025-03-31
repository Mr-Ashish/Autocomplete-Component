import React from "react";
import { SingleWordOption } from "../../types/autocomplete";
import "./index.css";
import HighlightWord from "../HighlightWord";

type DropdownProps = {
  options: SingleWordOption[];
  onSelect: (option: SingleWordOption) => void;
  selectedOption: SingleWordOption | null;
  show: boolean;
  matchingPrefix: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selectedOption,
  show,
  matchingPrefix,
}) => {
  if (!show) return null;
  const handleOptionSelect = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const selectedId = target.id;
    if (selectedId) {
      const selectedOption = options.find(
        (option) => option.id === Number(selectedId)
      );
      if (selectedOption) {
        onSelect(selectedOption);
      }
    }
  };

  return (
    <div className="dropdownContainer">
      {options.map((options: SingleWordOption) => {
        return (
          <div
            key={options.id}
            className={`suggestion ${
              selectedOption && selectedOption.id === options.id
                ? "selected"
                : ""
            }`}
            onClick={handleOptionSelect}
          >
            <HighlightWord
              text={options.text}
              matchingPrefix={matchingPrefix}
            />
          </div>
        );
      })}
      {options.length === 0 && (
        <div className="no-suggestions">No suggestions available</div>
      )}
    </div>
  );
};

export default Dropdown;
