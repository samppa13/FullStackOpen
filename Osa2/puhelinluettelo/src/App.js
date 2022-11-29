import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({ person, deletePerson }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={deletePerson} id={person.id}>
        delete
      </button>
    </p>
  )
}

const Persons = ({ showPersons, deletePerson }) => {
  return (
    <div>
      {showPersons.map(person =>
        <Person key={person.name} person={person} deletePerson={deletePerson} />
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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
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
  const deletePerson = (event) => {
    personService
      .remove(event.target.id)
      .then(removedPerson => {
        setPersons(persons.filter(person => person.id != event.target.id))
      })
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
      <Persons showPersons={showPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App;