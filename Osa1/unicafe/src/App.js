import { useState } from "react";

const Statistics = (props) => {
  return (
    <div>
      <p>
        good {props.good}
      </p>
      <p>
        neutral {props.neutral}
      </p>
      <p>
        bad {props.bad}
      </p>
      <p>
        all {props.allClicks}
      </p>
      <p>
        average {props.average / props.allClicks}
      </p>
      <p>
        positive {(props.good / props.allClicks) * 100} %
      </p>
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

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <button onClick={goodByOne}>
        good
      </button>
      <button onClick={neutralByOne}>
        neutral
      </button>
      <button onClick={badByOne}>
        bad
      </button>
      <h1>
        statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} average={average} />
    </div>
  )
}

export default App;
