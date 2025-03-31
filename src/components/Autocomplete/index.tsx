import React, { useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [matchingPrefix, setMatchingPrefix] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(true);
  const debouncedSearchTerm = useDebounce(matchingPrefix, 300);

  const handleInputChange = (value: string) => {
    if (value === matchingPrefix) return;
    setMatchingPrefix(value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleEscape = () => {
    setIsInputFocused(false);
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
      {error && (
        <div role="alert" className="error" aria-live="polite">
          {error.message}
        </div>
      )}
      <Dropdown
        id="autocomplete-dropdown"
        options={suggestions || []}
        onSelect={handleOptionSelect}
        selectedOption={null}
        show={shouldShowSuggestions}
        matchingPrefix={matchingPrefix}
        isLoading={loading}
        isError={error !== null}
        onEscape={handleEscape}
      />
    </div>
  );
};

export default Autocomplete;
