import React from "react";
import Selectdropdown from "./pages/dropdown";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Custom dropdown with search</h1>
      <div className="dropdown-div">
        <Selectdropdown />
      </div>
    </div>
  );
}

export default App;
