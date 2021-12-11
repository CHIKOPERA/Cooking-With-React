import React, { useState,useContext } from "react";
import {ThemeContext} from "./App";

export default function CounterHooks({ initValue = 0 }) {
  const [counter, setCounter] = useState(initValue);
  const style = useContext(ThemeContext)
  return (
    <div>
      <button style={style} onClick={() => setCounter((counter) => counter - 1)}>-</button>
      <span>{counter}</span>
      <button style={style} onClick={() => setCounter((counter) => counter + 1)}>+</button>
    </div>
  );
}
