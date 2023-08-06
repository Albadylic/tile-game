import Tile from "./Tile";
import generateRandomSymbol from "../helpers/generateRandomSymbol";

function Grid({
  randomSymbol,
  guessed,
  numCorrect,
  setNumCorrect,
}: {
  randomSymbol: string;
  guessed: boolean;
  numCorrect: number;
  setNumCorrect: React.Dispatch<React.SetStateAction<number>>;
}) {
  const elements: Array<React.ReactElement> = [];

  function checkSymbolMatch(str: string) {
    if (str === randomSymbol) {
      setNumCorrect(numCorrect++);
    }
  }

  guessed ? filledTiles() : blankTiles();

  function filledTiles() {
    for (let i = 0; i < 20; i++) {
      const thisSymbol = generateRandomSymbol();
      elements.push(<Tile symbol={thisSymbol} key={i + 1} />);
      checkSymbolMatch(thisSymbol);
    }
  }

  function blankTiles() {
    for (let i = 0; i < 20; i++) {
      elements.push(<Tile symbol={"??"} key={i + 1} />);
    }
  }

  return <section className="tile_grid">{elements}</section>;
}

export default Grid;
