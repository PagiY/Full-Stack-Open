import { useState } from "react";
import Filter from './components/Filter';
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	]);
	//const [filterResults, setFilterResults] = useState(undefined);

	const [filter, setFilter] = useState('');
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const addName = (e) => {

		e.preventDefault();

		persons.find(p => p.name === newName) === undefined ?
				setPersons(persons.concat(
					{
						name: newName,
						number: newNumber,
					}
				))
			:
				alert(`${newName} is already added!`);
	}

	const handleChangeName = (e) => {
		setNewName(e.target.value);
	}

	const handleChangeNum = (e) => {
		setNewNumber(e.target.value);
	}

	const handleChangeFilter = (e) => {
		setFilter(e.target.value);
	}

	return (	
		<div>
			<h2>Phonebook</h2>
				<Filter value = {filter} onHandleChange = {handleChangeFilter}/>
			<h2>Add a new</h2>
				<PersonForm onSubmit = {addName} numValue = {newNumber} nameValue = {newName} onHandleChangeName={handleChangeName} onHandleChangeNum={handleChangeNum}/>
			<div>
				<h2>Names</h2>
				<Persons persons = {persons} filter = {filter}/>
			</div>
		</div>
	);
}

export default App;
