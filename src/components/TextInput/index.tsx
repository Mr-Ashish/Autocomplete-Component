import React from "react";
import "./textInput.css";

interface TextInputProps {
  placeholder?: string;
  onChange: (e: string) => void;
  value: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  placeholder = "Start typing...",
  value,
  onFocus,
  onBlur,
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
      onBlur={onBlur}
      aria-label={placeholder}
    />
  );
};

export default TextInput;
