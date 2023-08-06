# Tile Game

This project uses React and Typescript. The goal here was to work with these technologies to further my understanding of both.

The game will present the user with a certain tile. The user aims to guess how many times this tile will occur in a 5x4 grid. The grid is randomly generated and each tile within it could be one of four different symbols.

## Project set up

### Running this project

// This will be deployed to Netlify
// Clone and npm i to run locally

### My set up for this project

Run `npx create-react-app my-react-app --template typescript` in the terminal. Remove some extraneous files.

## Components

Key components:

- A random tile
- A form for the guess
  - Input (number)
  - Button (submit)
- The grid
- The result

These were the main sections which would be rendered to the app.

We would require a single tile as a subcomponent which could be used both in the `<RandomTile />` and the `<Grid />`. This tile would have anside it a particular symbol, which would be one of the four possible.

## Errors

The first type error occured when writing the Tile component. I started with the following code:

```tsx
function Tile(symbol) {
  return (
    <article>
      <p>{symbol}</p>
    </article>
  );
}

export default Tile;
```

which gave us the following error:

```
TS7006: Parameter 'symbol' implicitly has an 'any' type.
```

Since we're working with TypeScript, we must define what type the parameter will be. In this case, we'll use a string to define the symbol. Later on, we'll be able to use this string to define an image to display on the tile. We can correct the function definition to be:

```tsx
function Tile(symbol: string) {
  //...
}
```

With this correction, I went to the RandomTile component which would import the Tile. Here, I added the following:

```tsx
<Tile symbol="air" />
```

which gave the following error:

```
Type '{ symbol: string; }' is not assignable to type 'string'.ts(2322)
```

ChatGPT helped me understand that the props needed to be destructured from the object they are passed as. In order to use the value within the Tile component, we had to update the definiton to be:

```tsx
function Tile({ symbol }: { symbol: string }) {
```

## Generating a random tile

The user would be guessing occurences of one of the four symbols. This symbol would be generated at random.

In the `<Tile />`, I wanted to pass in a random value as the `symbol` prop. I did this within the `<RandomTile />` component like so:

```tsx
function RandomTile() {
  const symbols = ["earth", "air", "water", "fire"];
  const randomIndex = Math.floor(Math.random() * symbols.length);
  const randomSymbol = symbols[randomIndex];

  return (
    <div>
      <p>This is your tile</p>
      <Tile symbol={randomSymbol} />
    </div>
  );
}
```

When I had this written out, I realised that I'd need the same logic when creating the grid. In the grid, each tile would have a random symbol. To keep this DRY, I moved the randomSymbol logic out to a helper function which I'd be able to reference in both components.

## Setting state for the Grid

The Grid should only have the symbols revealed once a guess has been made. Otherwise, the user would be able to count occurences and always succeed in their 'guess' – where's the fun in that?!

In order to determine whether the grid should display a symbol or not, we need a state passed between the form and the grid. This would need to be defined in `<App />` and made available to both components.
