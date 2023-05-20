const Persons = ({persons, filter, onDelete}) => {

    const getFilteredResults = () => (persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())))
    
    const getPersons = (personData) => (personData.map((data) => <li key = {data.name}>
                                                                    {data.name} {data.number} 
                                                                    <button onClick = {() => {onDelete(data.id)}}>delete</button>
                                                                </li>)
                                        )
    return (
        <ul>
        {	
            filter === '' ? 
                getPersons(persons)
            : 	
                getPersons(getFilteredResults())
        }
        </ul>
    )
}

export default Persons;