import React from "react";

type HighlightWordProps = {
  text: string;
  matchingPrefix: string;
};
const HighlightWord: React.FC<HighlightWordProps> = ({
  text,
  matchingPrefix,
}) => {
  if (!matchingPrefix) return text;
  const regex = new RegExp(`(${matchingPrefix})`, "i");
  //   const regex = new RegExp(`\\b(${matchingPrefix})`, "i"); // Match only at the start of a word
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
  );
};

export default HighlightWord;
