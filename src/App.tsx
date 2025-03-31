import React, { useState } from "react";
import Autocomplete from "./components/Autocomplete";
import { SingleWordOption } from "./types/autocomplete";

function App() {
  const [selectedOption, setSelectedOption] = useState<SingleWordOption | null>(
    null
  );

  const handleSelect = (option: SingleWordOption) => {
    console.log("Selected value:", option);
    setSelectedOption(option);
  };
  return (
    <div className="appContainer">
      <h1>Autocomplete Component</h1>
      <Autocomplete onSelect={handleSelect} />
      {selectedOption ? (
        <div className="selectedValue">
          You have selected: {selectedOption?.text}
        </div>
      ) : null}
    </div>
  );
}

export default App;
