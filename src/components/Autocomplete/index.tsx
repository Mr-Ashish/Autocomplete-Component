import React, { useEffect, useState } from "react";
import TextInput from "../TextInput";
import { SingleWordOption } from "../../types/autocomplete";
import "./index.css";
import { getAutoCompleteSuggestions } from "../../hooks/getAutoCompleteSuggestions";
import Dropdown from "../Dropdown";

const Autocomplete = (props) => {
  // const [suggestions, setSuggestions] = useState<SingleWordOption[]>([]);
  const [matchingPrefix, setMatchingPrefix] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(true);

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
  };

  const {
    data: suggestions,
    loading,
    error,
  } = getAutoCompleteSuggestions(matchingPrefix);

  useEffect(() => {
    console.log("----here", { matchingPrefix, suggestions, loading, error });
  }, [matchingPrefix, suggestions, loading, error]);

  return (
    <div className="autocompleteContainer">
      <TextInput
        onChange={handleInputChange}
        // value={matchingPrefix}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      {/* {loading && <div className="loading">Loading...</div>} */}
      {error && <div className="error">Error: {error.message}</div>}
      <Dropdown
        options={suggestions}
        onSelect={handleOptionSelect}
        selectedOption={null}
        show={shouldShowSuggestions()}
        matchingPrefix={matchingPrefix}
      />
    </div>
  );
};

export default Autocomplete;
