import React, { useState } from "react";
import "./App.css";
import CounterHooks from "./CounterHooks";

export const ThemeContext = React.createContext();

function App() {
  const [style, setStyle] = useState("red");
  return (
    <ThemeContext.Provider value={{ backgroundColor: style }}>
      <CounterHooks initValue={5} />
      <br />
      <button
        onClick={() =>
          setStyle((style) => {
            return style === "red" ? "blue" : "red";
          })
        }
      >
        Toggle theme{" "}
      </button>
      <p>theme color: {style}</p>
    </ThemeContext.Provider>
  );
}

export default App ;
