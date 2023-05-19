const Persons = ({persons, filter}) => {

    const getFilteredResults = () => {
		const filtered = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));
		return filtered.map((person) =>  <li key = {person.name}>{person.name} {person.number}</li>)
	}
    
    return (
        <ul>
        {	
            filter === '' ? 
                persons.map((person) => <li key = {person.name}>{person.name} {person.number}</li>)
            : 	
                getFilteredResults()
        }
        </ul>
    )
}

export default Persons;