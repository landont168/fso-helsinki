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
  const [all, setAll] = useState(0);

  const handleGoodClick = () => {
    setAll(all + 1);
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setAll(all + 1);
    setBad(bad + 1);
  };

  // object to compute/store statistics as prop to components
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
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics statistics={statistics} />
    </div>
  );
};

export default App;
