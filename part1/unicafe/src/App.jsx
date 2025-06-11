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

  const total = good + neutral + bad;

  const Button = () => {
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
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
    );
  };

  const StatisticLine = ({ text, value }) => {
    return (
      <tr>
        <td>{text}</td> <td>{value}</td>
      </tr>
    );
  };

  if (total === 0) {
    return (
      <div>
        <Header text="give feedback" />
        <Button />
        <StatisticsHeader text="statistics" />
        <div>no feedback given</div>
      </div>
    );
  }

  return (
    <table>
      <Header text="give feedback" />
      <Button />
      <StatisticsHeader text="statistics" />
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="avarage" value={(good - bad) / total} />
      <StatisticLine text="positive" value={(good / total) * 100} />
    </table>
  );
};

export default App;
