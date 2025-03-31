import React from "react";
import "./textInput.css";

interface TextInputProps {
  placeholder?: string;
  onChange: (e: string) => void;
  value: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  ariaLabel?: string;
  id?: string;
  name?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  placeholder = "Start typing...",
  value,
  onFocus,
  className,
  ariaLabel,
  id,
  name,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={`textInput${className ? ` ${className}` : ""}`}
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      onFocus={onFocus}
      aria-label={ariaLabel || placeholder}
      id={id}
      name={name}
    />
  );
};

export default TextInput;
