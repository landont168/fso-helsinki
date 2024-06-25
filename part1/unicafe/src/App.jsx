import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ statistics }) => {
  if (statistics.all === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={statistics.good} />
        <StatisticLine text="neutral" value={statistics.neutral} />
        <StatisticLine text="bad" value={statistics.bad} />
        <StatisticLine text="all" value={statistics.all} />
        <StatisticLine text="average" value={statistics.average} />
        <StatisticLine text="positive" value={statistics.positive} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // object to compute/store statistics as prop to components
  const all = good + neutral + bad;
  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: (good - bad) / all,
    positive: (good / all) * 100 + "%",
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics statistics={statistics} />
    </div>
  );
};

export default App;
