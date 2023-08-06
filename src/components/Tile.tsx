function Tile({ symbol }: { symbol: string }) {
  return (
    <article className="Tile">
      <p>{symbol}</p>
    </article>
  );
}

export default Tile;
