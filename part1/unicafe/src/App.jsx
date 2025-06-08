import { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Grades = (props) => {
  const grades = props.grades;

  return grades.map(({ grade, count }) => (
    <div key={grade}>
      {grade} {count}
    </div>
  ));
};

const Total = (props) => {
  return (
    <div>
      all {props.grades.map(({ count }) => count).reduce((a, b) => a + b)}
    </div>
  );
};

const Average = (props) => {
  const grades = props.grades;
  const total = grades.map(({ count }) => count).reduce((a, b) => a + b);
  return (
    <div>
      average{" "}
      {grades.map(({ count, value }) => count * value).reduce((a, b) => a + b) /
        total}
    </div>
  );
};


const Positive = (props) => {
  const grades = props.grades;
  const goodGradeCount = grades[0].count;
  const total = grades.map(({ count }) => count).reduce((a, b) => a + b);

  return <div>positive {(goodGradeCount / total) * 100} %</div>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const header = "give feedback";
  const grades = [
    {
      grade: "good",
      count: good,
      value: 1,
    },
    {
      grade: "neutral",
      count: neutral,
      value: 0,
    },
    {
      grade: "bad",
      count: bad,
      value: -1,
    },
  ];

  const HandleGoodClick = () => {
    setGood(good + 1);
  };

  const HandleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const HandleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text={header} />
      <Button onClick={HandleGoodClick} text="good" />
      <Button onClick={HandleNeutralClick} text="neutral" />
      <Button onClick={HandleBadClick} text="bad" />
      <br />
      <br />
      <Grades grades={grades} />
      <Total grades={grades} />
      <Average grades={grades} />
      <Positive grades={grades} />
    </div>
  );
};

export default App;
