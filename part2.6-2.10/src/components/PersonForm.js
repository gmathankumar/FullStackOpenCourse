import { useState } from "react"

const PersonForm = ({persons,setPersons}) => {
    const [newName, setNewName] = useState('')
    const [phNumber, setPhNumber] = useState()
    const onAdd = (e) => {
        e.preventDefault()
        if (persons.find(p => p.name === newName)) {
          setNewName('')
          setPhNumber('')
          return alert(`${newName} is already added to the phonebook.`)
        }
        setPersons(persons.concat({ name: newName, number: phNumber, id: persons.length + 1 }))
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