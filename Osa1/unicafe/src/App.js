import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodByOne = () => setGood(good + 1)
  const neutralByOne = () => setNeutral(neutral + 1)
  const badByOne = () => setBad(bad + 1)

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
    </div>
  )
}

export default App;
