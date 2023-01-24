import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  else if (message[1] === 'error') {
    return (
      <div className='error'>
        {message[0]}
      </div>
    )
  }
  return (
    <div className='noError'>
      {message[0]}
    </div>
  )
}

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
  const [errorMessage, setErrorMessage] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find(person => person.name === newName)
        const changedPerson = { ...oldPerson, number: newNumber }
        personService
          .update(oldPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== oldPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              [`Updated ${changedPerson.name}`, 'noError']
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              [error.response.data.error, 'error']
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
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
          setErrorMessage(
            [`Added ${returnedPerson.name}`, 'noError']
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            [error.response.data.error, 'error']
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
    const deleteName = persons.filter(person =>
      person.id == event.target.id).map(person => person.name)
    if (window.confirm(`Delete ${deleteName} ?`)) {
      personService
        .remove(event.target.id)
        .then(removedPerson => {
          setPersons(persons.filter(person => person.id != event.target.id))
          setErrorMessage(
            [`Deleted ${deleteName}`, 'noError']
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const showPersons = showAll === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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