import { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticsHeader = ({ text }) => {
  return <h1>{text}</h1>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const Statistics = () => {
    const total = good + neutral + bad;
    const average = (good - bad) / total;
    const positive = (good / total) * 100;

    if (total === 0) {
      return <div>No feedback given</div>;
    }

    return (
      <div>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>average {average}</div>
        <div>positive {positive} %</div>
      </div>
    );
  };

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <StatisticsHeader text="statistics" />
      <Statistics />
    </div>
  );
};

export default App;
