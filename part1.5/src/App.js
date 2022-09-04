import { useState } from "react";

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const avg = total > 0 && (good + (bad * -1)) / total
  const positive = total > 0 && ((good / total) * 100).toFixed(1) + '%'
  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={() => setGood(good + 1)} text='good' />
      <Button clickHandler={() => setNeutral(neutral + 1)} text='neutral' />
      <Button clickHandler={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} positive={positive} />
    </div>

  );
}

const Button = ({ clickHandler, text }) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad, total, avg, positive }) => {
  return (
    <div>
      <h1>Statistics</h1>
      {total === 0 && <p>No feedback given</p>}
      {total > 0 && <>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={total} />
            <StatisticLine text='average' value={avg.toFixed(1)} />
            <StatisticLine text='positive' value={positive} />
          </tbody>
        </table>
      </>}
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App;
