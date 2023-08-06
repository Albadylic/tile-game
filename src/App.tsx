import React, { useState } from "react";
import "./App.css";
import * as Components from "./components/";
import generateRandomSymbol from "./helpers/generateRandomSymbol";

function App() {
  const [randomSymbol] = useState(generateRandomSymbol());
  const [guessed, setGuessed] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tile game</h1>
      </header>
      <Components.RandomTile randomSymbol={randomSymbol} />
      <Components.Form guessed={guessed} setGuessed={setGuessed} />
      <Components.Grid
        randomSymbol={randomSymbol}
        guessed={guessed}
        numCorrect={numCorrect}
        setNumCorrect={setNumCorrect}
      />
      <Components.Result numCorrect={numCorrect} />
    </div>
  );
}

export default App;
