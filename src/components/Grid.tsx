import Tile from "./Tile";
import generateRandomSymbol from "../helpers/generateRandomSymbol";

function Grid() {
  const elements = [];

  for (let i = 0; i < 20; i++) {
    elements.push(<Tile symbol={generateRandomSymbol()} key={i + 1} />);
  }

  return <section className="tile_grid">{elements}</section>;
}

export default Grid;
