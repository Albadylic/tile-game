import React from "react";
import "./App.css";
import * as Components from "./components/";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tile game</h1>
      </header>
      <Components.RandomTile />
      <Components.Form />
      <Components.Grid />
      <Components.Result />
    </div>
  );
}

export default App;
