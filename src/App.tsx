import React from "react";
import Autocomplete from "./components/Autocomplete";
import { SingleWordOption } from "./types/autocomplete";

function App() {
  const handleSelect = (option: SingleWordOption) => {
    console.log("Selected value:", option);
  };
  return <Autocomplete onSelect={handleSelect} />;
}

export default App;
