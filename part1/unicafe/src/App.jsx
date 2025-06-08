import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const DisplayStatistics = (props) => {
  const statistics = props.statistics

  return ( 
    statistics.map(({grade, value}) => <div>{grade} {value}</div>)
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const header = 'give feedback'
  const statistics = [
    {
      grade: 'good',
      value: good
    },
    {
      grade: 'neutral',
      value: neutral
    },
    {
      grade: 'bad',
      value: bad
    }
  ]


  const HandleGoodClick = () => {
    setGood(good + 1);
  }

  const HandleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const HandleBadClick = () => {
    setBad(bad + 1);
  }



  return (
    <div>
      <Header text={header} />
      <Button onClick={HandleGoodClick} text='good' />
      <Button onClick={HandleNeutralClick} text='neutral' />
      <Button onClick={HandleBadClick} text='bad' />
      <br /><br />
      <DisplayStatistics statistics={statistics}/>
    </div>
  )
}

export default App