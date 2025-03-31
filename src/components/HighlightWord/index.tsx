import React from "react";

type HighlightWordProps = {
  text: string;
  matchingPrefix: string;
};

const escapeRegex = (str: string) =>
  str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

const HighlightWord: React.FC<HighlightWordProps> = ({
  text,
  matchingPrefix,
}) => {
  if (!text) return null;
  if (!matchingPrefix) return <>{text}</>;

  const safePrefix = escapeRegex(matchingPrefix);
  const regex = new RegExp(`(${safePrefix})`, "i");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === matchingPrefix.toLowerCase() ? (
          <mark key={i}>{part}</mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export default HighlightWord;
