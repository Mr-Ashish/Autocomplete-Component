import React from "react";
import "./textInput.css";

interface TextInputProps {
  placeholder?: string;
  onChange: (e: string) => void;
  value: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  placeholder = "Start typing...",
  value,
  onFocus,
  className,
}) => {
  const handleInputChangeDebounced = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={`textInput ${className || ""}`}
      type="text"
      value={value}
      onChange={handleInputChangeDebounced}
      placeholder={placeholder}
      onFocus={onFocus}
      aria-label={placeholder}
    />
  );
};

export default TextInput;
