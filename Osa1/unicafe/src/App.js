import { useState } from "react";

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  if (props.text == "positive") {
    return (
      <div>
        <p>
          {props.text} {props.value} %
        </p>
      </div>
    )
  }
  return (
    <div>
      <p>
        {props.text} {props.value}
      </p>
    </div>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutal" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.allClicks} />
      <StatisticLine text="average" value={props.average / props.allClicks} />
      <StatisticLine text="positive" value={(props.good / props.allClicks) * 100} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const goodByOne = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
    setAverage(average + 1)
  }
  const neutralByOne = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }
  const badByOne = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
    setAverage(average - 1)
  }

  if (allClicks == 0) {
    return (
      <div>
        <h1>
          give feedback
        </h1>
        <Button handleClick={goodByOne} text='good' />
        <Button handleClick={neutralByOne} text='neutral' />
        <Button handleClick={badByOne} text='bad' />
        <h1>
          statistics
        </h1>
        <p>
          No feedback given
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={goodByOne} text='good' />
      <Button handleClick={neutralByOne} text='neutral' />
      <Button handleClick={badByOne} text='bad' />
      <h1>
        statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} average={average} />
    </div>
  )
}

export default App;
