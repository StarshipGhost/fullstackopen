const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}


const Content = ({ course }) => {

  const parts = course.parts;

  return (
    <div>
      {parts.map(({ name, exercises }) => <p key={name}>{name} {exercises}</p>)}
    </div>
  )
}

const Total = ({ course }) => {
  const total = course.parts.map(({ exercises }) => exercises).reduce((a, b) => a + b);
  return (
    <p>Number of exercices {total}</p>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}



export default App