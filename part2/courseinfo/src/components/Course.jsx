const Course = ({ name, parts }) => {
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Footer parts={parts} />
    </div>
  );
};

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Footer = ({ parts }) => {
  return (
    <p>
      <b>
        total of exercises{" "}
        {parts.map(({ exercises }) => exercises).reduce((a, b) => a + b)}
      </b>
    </p>
  );
};

export default Course;
