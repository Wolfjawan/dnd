import React from "react";
import DND from "./dnd";
const App = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>DnD</h1>
      <DND />
    </div>
  );
};
export default App;
