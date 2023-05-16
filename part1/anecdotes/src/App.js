import { useState } from 'react';

const App = () => {

  const [selected, setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [scores, setScores] = useState(Array(anecdotes.length - 1).fill(0));

  const handleSelected = () => {
    const min = Math.ceil(0);
    const max = Math.floor(anecdotes.length - 1);
    const random = Math.floor(Math.random() * (max - min) + min);

    setSelected(random);

  }

  const handleScore = () => {
    const scoreCopy = [...scores];
    scoreCopy[selected] += 1;
    setScores(scoreCopy);
  }

  const getHighestVote = () => {
    const max = Math.max(...scores);
    return scores.indexOf(max);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {scores[selected]} votes</p>
      <button onClick = {handleScore}>Vote</button><button onClick = {handleSelected}>next anecdote</button>
      <h1>Anecdote with highest vote</h1>
      {anecdotes[getHighestVote()]}
    </div>
  );
}

export default App;
