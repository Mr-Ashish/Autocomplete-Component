import React from "react";
import { debounceWrapper } from "../../utils/app.utils";
import "./index.css";

interface TextInputProps {
  placeholder?: string;
  onChange: (e: string) => void;
  // value: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  placeholder = "search",
  // value,
  onFocus,
  onBlur,
}) => {
  const handleInputChangeDebounced = debounceWrapper(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    300
  );

  const handleInputFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };
  const handleInputBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <input
      className="textInput"
      type="text"
      // value={value}
      onChange={handleInputChangeDebounced}
      placeholder={placeholder}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
    />
  );
};

export default TextInput;
