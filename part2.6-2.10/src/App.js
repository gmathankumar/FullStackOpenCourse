import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(res => setPersons(res.data))
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h1>Add a new</h1>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons search={search} persons={persons} />
    </div>
  )
}

export default App;
