import { useState } from "react";

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
      <p>
        good {good}
      </p>
      <p>
        neutral {neutral}
      </p>
      <p>
        bad {bad}
      </p>
      <p>
        all {allClicks}
      </p>
      <p>
        average {average / allClicks}
      </p>
      <p>
        positive {(good / allClicks) * 100} %
      </p>
    </div>
  )
}

export default App;
