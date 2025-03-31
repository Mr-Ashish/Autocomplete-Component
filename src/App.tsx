import React from "react";
import Autocomplete from "./components/Autocomplete";
import { SingleWordOption } from "./types/autocomplete";

function App() {
  const handleSelect = (option: SingleWordOption) => {
    console.log("Selected value:", option);
  };
  return (
    <div className="appContainer">
      <h1>Autocomplete Component</h1>
      <Autocomplete onSelect={handleSelect} />
    </div>
  );
}

export default App;
