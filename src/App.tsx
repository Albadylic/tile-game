import React, { useState } from "react";
import "./App.css";
import * as Components from "./components/";
import generateRandomSymbol from "./helpers/generateRandomSymbol";

function App() {
  const [randomSymbol] = useState(generateRandomSymbol());
  const [guessed, setGuessed] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tile game</h1>
      </header>
      <Components.RandomTile randomSymbol={randomSymbol} />
      <Components.Form guessed={guessed} setGuessed={setGuessed} />
      <Components.Grid guessed={guessed} />
      <Components.Result />
    </div>
  );
}

export default App;
