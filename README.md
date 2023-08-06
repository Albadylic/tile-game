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

## IntrinsicAttributes error

When creating the components, I was running into the following error:

> Type '{ guessed: boolean; setGuessed: Dispatch<SetStateAction<boolean>>; }' is not assignable to type 'IntrinsicAttributes'.
> Property 'guessed' does not exist on type 'IntrinsicAttributes'.ts(2322)

This occurs when we have not anticipated the types of the props inside of the components. In order to resolve this, we must be specific about what types the props will be from within the component.

We can do this in two different ways, the simpler is to define the type in the function definition

```tsx
function Grid({ guessed }: { guessed: boolean }) {
```

The second is using an `interface`:

```tsx
interface Props {
  guessed: boolean;
  setGuessed: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form({ guessed, setGuessed }: Props) {
```

### Updating the state

Once the user has made a guess, we'll update the state. We do this inside the form, once the button has been clicked.

We can change the state by handling the click event like this:

```tsx
function Form({ guessed, setGuessed }: Props) {
  const handleChange = () => {
    setGuessed(true);
  };
  return (
    <form>
      <label htmlFor="number">How many times?</label>
      <input type="number" />
      <button onClick={handleChange}>Guess</button>
    </form>
  );
}
```

However, I had a bug here where the whole page would re-render immediately after the update. This would then define a new `<RandomTile />` and re-render the whole grid, which would be blank once more.

The fix here was simple. The page reloads as the form is 'submitted' on the button click. We can prevent this with `preventDefault()`.

A separate issue occured with the random tile which had been generated. The component would be re-rendered when the state was updated inside the `<Form />` which would then mean the symbol to look for would be re-rendered and was likely to change.

To avoid this, I added state to them `<RandomTile />` which would hold the symbol and would not change unless it was directly updated.

When I added the state, I added it directly inside the component. However, I knew that further down the line this may become problematic. When we want to verify whether the user's guess was correct, we'll need to know what symbol had been randomly selected, and then count occurences of that symbol. We could do this by reading the text from the component later on but this seemed unituitive and hacky.

The better approach to resolving this issue was to bring the state up a level into the `<App />` and this could then be passed both to the `<RandomTile />` and to the eventual `<Result />`.
