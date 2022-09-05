const Persons = ({search,persons}) => {
  return (
    <>
    {persons.filter(p => p.name.toLowerCase().includes(search)).map(p => <div key={p.id}>{p.name} {p.number}</div>)}
    </>
    //<div>{name} {number}</div>
  )
}

export default Persons