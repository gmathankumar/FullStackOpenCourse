import { useState } from "react"

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const voteMap = []
  anecdotes.forEach((a, i) => {
    voteMap.push({ vote: 0, anecdote: a, id: i })
  })
  const [selected, setSelected] = useState(0)
  const [voteAnecdote, setVote] = useState(voteMap)
  const randomAnecdotes = () => {
    setSelected(parseInt(Math.random() * 7))
  }

  const voteTheAnecdote = () => {
    setVote(voteAnecdote.map(ele => ele.id === selected ? { ...ele, vote: ele.vote + 1 } : ele))
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={voteTheAnecdote}>vote</button>
      <button onClick={randomAnecdotes}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {voteAnecdote.reduce((p, c) => { return p.vote > c.vote ? p : c }).anecdote}
    </div>
  );
}

export default App;
