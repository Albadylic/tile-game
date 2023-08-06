import Tile from "./Tile";
import generateRandomSymbol from "../helpers/generateRandomSymbol";

function RandomTile() {
  return (
    <div>
      <p>This is your tile</p>
      <Tile symbol={generateRandomSymbol()} />
    </div>
  );
}

export default RandomTile;
