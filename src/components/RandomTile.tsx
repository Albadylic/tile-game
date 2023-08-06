import Tile from "./Tile";

function RandomTile({ randomSymbol }: { randomSymbol: string }) {
  return (
    <div>
      <p>This is your tile</p>
      <Tile symbol={randomSymbol} />
    </div>
  );
}

export default RandomTile;
