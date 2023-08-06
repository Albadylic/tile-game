interface Props {
  guessed: boolean;
  setGuessed: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form({ guessed, setGuessed }: Props) {
  return (
    <form>
      <label htmlFor="number">How many times?</label>
      <input type="number" />
      <button
        onClick={(event) => {
          event.preventDefault();
          setGuessed(true);
        }}
      >
        Guess
      </button>
    </form>
  );
}

export default Form;
