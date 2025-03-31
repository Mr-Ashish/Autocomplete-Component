import React, { useState } from "react";
import TextInput from "../TextInput";
import { SingleWordOption } from "../../types/autocomplete";
import "./index.css";
import { getAutoCompleteSuggestions } from "../../hooks/getAutoCompleteSuggestions";
import Dropdown from "../Dropdown";
import useDebounce from "../../hooks/useDebounce";

export interface AutoCompleteProps {
  onSelect: (value: SingleWordOption) => void;
}

const Autocomplete: React.FC<AutoCompleteProps> = ({ onSelect }) => {
  const [matchingPrefix, setMatchingPrefix] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(true);
  const debouncedSearchTerm = useDebounce(matchingPrefix, 300);
  const handleInputChange = (value: string) => {
    setMatchingPrefix(value);
  };

  const handleInputBlur = () => {
    setIsInputFocused(true);
  };
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const shouldShowSuggestions = () => {
    return isInputFocused;
  };

  const handleOptionSelect = (option: SingleWordOption) => {
    console.log("Selected option:", option);
    onSelect(option);
  };

  const {
    data: suggestions,
    loading,
    error,
  } = getAutoCompleteSuggestions(debouncedSearchTerm);

  return (
    <div
      className="autocompleteContainer"
      role="combobox"
      aria-expanded={shouldShowSuggestions()}
      aria-owns="autocomplete-dropdown"
      aria-haspopup="listbox"
    >
      <TextInput
        onChange={handleInputChange}
        value={matchingPrefix}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        aria-controls="autocomplete-dropdown"
      />
      {error && <div className="error">Error: {error.message}</div>}
      <Dropdown
        id="autocomplete-dropdown"
        options={suggestions}
        onSelect={handleOptionSelect}
        selectedOption={null}
        show={shouldShowSuggestions()}
        matchingPrefix={matchingPrefix}
        isLoading={loading}
        isError={error !== null}
      />
    </div>
  );
};

export default Autocomplete;
