import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ showAll, handleShowAllChange }) => {
  return (
    <div>
      find countries <input
      value={showAll}
      onChange={handleShowAllChange}
      />
    </div>
  )
}

const Country = ({ country }) => {
  const languages = Object.values(country.languages)
  return (
    <div>
      <h1>
        {country.name.common}
      </h1>
      <p>
        capital {country.capital}<br/>
        area {country.area}
      </p>
      <h4>
        languages:
      </h4>
      <ul>
        {languages.map(language =>
          <li key={language}>
            {language}
          </li>
        )}
      </ul>
      <h1>
        {country.flag}
      </h1>
    </div>
  )
}

const Countries = ({ showCountries }) => {
  if (showCountries.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }
  else if (showCountries.length <= 10 && showCountries.length > 1) {
    return (
      <div>
        {showCountries.map(country =>
          <p key={country.name.common}>
            {country.name.common}
          </p>
        )}
      </div>
    )
  }
  else if (showCountries.length === 1) {
    return (
      <div>
        {showCountries.map(country =>
          <Country key={country.name.common} country={country} />
        )}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState('')

  useEffect (() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleShowAllChange = (event) => {
    setShowAll(event.target.value)
  }

  const showCountries = showAll === ''
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(showAll))

  return (
    <div>
      <Filter showAll={showAll} handleShowAllChange={handleShowAllChange} />
      <Countries showCountries={showCountries} />
    </div>
  )
}

export default App;