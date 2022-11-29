import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ showAll, handleShowAllChange }) => {
  return (
    <div>
      filter shown with <input
      value={showAll}
      onChange={handleShowAllChange}
      />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
        value={newName}
        onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
        value={newNumber}
        onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}

const Persons = ({ showPersons }) => {
  return (
    <div>
      {showPersons.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleShowAllChange = (event) => {
    setShowAll(event.target.value)
  }

  const showPersons = showAll === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showAll={showAll} handleShowAllChange={handleShowAllChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons showPersons={showPersons} />
    </div>
  )

}

export default App;