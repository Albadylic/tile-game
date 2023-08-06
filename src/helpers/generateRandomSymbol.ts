function generateRandomSymbol(): string {
  const symbols = ["earth", "air", "water", "fire"];
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
}
export default generateRandomSymbol;
