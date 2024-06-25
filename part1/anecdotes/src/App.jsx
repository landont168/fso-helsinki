import { useState } from "react";

const Display = ({ anecdote, votes }) => {
  return (
    <div>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const length = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(length).fill(0));
  const [maxIndex, setMaxIndex] = useState(0);

  // randomly pick number within index of array
  const getNextAnecdote = () => {
    const getRandomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    setSelected(getRandomInt(0, length - 1));
  };

  const updateVotes = () => {
    // return index of highest votes within array
    const getMaxIndex = (arr, curIndex, maxIndex) => {
      if (arr[curIndex] > arr[maxIndex]) {
        return curIndex;
      }
      return maxIndex;
    };

    // update votes state array
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
    setMaxIndex(getMaxIndex(copyVotes, selected, maxIndex));
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={getNextAnecdote} text="next annecdote" />
      <Button handleClick={updateVotes} text="vote" />
      <h1>Anecdote with most votes</h1>
      <Display anecdote={anecdotes[maxIndex]} votes={votes[maxIndex]} />
    </div>
  );
};

export default App;
