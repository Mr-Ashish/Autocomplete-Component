import React, { RefObject, useRef, useState } from "react";
import TextInput from "../TextInput";
import { SingleWordOption } from "../../types/autocomplete";
import "./index.css";
import { useAutoCompleteSuggestions } from "../../hooks/useAutoCompleteSuggestions";
import Dropdown from "../Dropdown";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

export interface AutoCompleteProps {
  onSelect: (value: SingleWordOption) => void;
}

const Autocomplete: React.FC<AutoCompleteProps> = ({ onSelect }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [matchingPrefix, setMatchingPrefix] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(true);
  const debouncedSearchTerm = useDebounce(matchingPrefix, 300);
  const handleInputChange = (value: string) => {
    setMatchingPrefix(value);
  };

  // removing this as it is not predictable
  // const handleInputBlur = () => {
  //   setIsInputFocused(false);
  // };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  useClickOutside(containerRef, () => setIsInputFocused(false));

  const shouldShowSuggestions = isInputFocused;

  const handleOptionSelect = (option: SingleWordOption) => {
    onSelect(option);
    setMatchingPrefix(option.text);
    setIsInputFocused(false);
  };

  const {
    data: suggestions,
    loading,
    error,
  } = useAutoCompleteSuggestions(debouncedSearchTerm);

  return (
    <div
      ref={containerRef}
      className="autocompleteContainer"
      role="combobox"
      aria-expanded={shouldShowSuggestions}
      aria-owns="autocomplete-dropdown"
      aria-haspopup="listbox"
    >
      <TextInput
        onChange={handleInputChange}
        value={matchingPrefix}
        onFocus={handleInputFocus}
        aria-controls="autocomplete-dropdown"
        aria-autocomplete="list"
      />
      <div role="alert" aria-live="polite" className="error">
        Error: {error?.message}
      </div>{" "}
      <Dropdown
        id="autocomplete-dropdown"
        options={suggestions || []}
        onSelect={handleOptionSelect}
        selectedOption={null}
        show={shouldShowSuggestions}
        matchingPrefix={matchingPrefix}
        isLoading={loading}
        isError={error !== null}
      />
    </div>
  );
};

export default Autocomplete;
