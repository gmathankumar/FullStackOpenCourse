import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Person from "./components/Person"
import personsService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(res => setPersons(res))
  }, [])

  const deletePerson = (id) => {
    var name = persons.find(p => p.id === id).name
    window.confirm(`Delete ${name}?`) && personsService.deletePerson(id).then(setPersons(persons.filter(per => per.id !== id)))
  }
  const filteredPerson = persons.filter(p => p.name.toLowerCase().includes(search))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h1>Add a new</h1>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {
        filteredPerson.map(person => <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />)
      }
    </div>
  )
}

export default App;
