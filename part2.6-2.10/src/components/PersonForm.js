import { useState } from "react"
import personsService from '../services/persons'

const PersonForm = ({ persons, setPersons, handleNotification }) => {
  const [newName, setNewName] = useState('')
  const [phNumber, setPhNumber] = useState('')

  const onAdd = (e) => {
    e.preventDefault()
    var personObj = persons.find(p => p.name === newName)
    if (personObj) {
      setNewName('')
      setPhNumber('')
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`) && phNumber !== '') {
        personsService.updatePerson(personObj.id, { ...personObj, number: phNumber })
          .then(res => {
            setPersons(persons.map(p => p.id === personObj.id ? res : p))
          }).catch(handleNotification(`Information of ${newName} has already been removed from server`, 'error'))
      }
    } else {
      personsService.createPerson({ name: newName, number: phNumber }).then(res => setPersons(persons.concat(res)))
      handleNotification(`Added ${newName}`, 'success')
    }
    setNewName('')
    setPhNumber('')
  }
  return (
    <form onSubmit={onAdd}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input type="tel" value={phNumber} onChange={(e) => setPhNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

  )
}

export default PersonForm