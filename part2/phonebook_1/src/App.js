import { useState, useEffect } from "react";
import personsService from './services/persons';

import Filter from './components/Filter';
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);

	const [filter, setFilter] = useState('');
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	
	useEffect(() => {
		personsService
			.getAll()
			.then(data => setPersons(data));

	}, []);

	const addName = (e) => {

		e.preventDefault();

		const newPerson = {
			name: newName,
			number: newNumber
		}

		const person = persons.find(p => p.name === newName) 

		if(person === undefined){
			personsService
				.create(newPerson)
				.then((res) => {
					setPersons(persons.concat(res))
				})
		}
		else{
			if(window.confirm(`${person.name} is already added to phonebook, replace old number with new one?`)){
				const updatedPerson = {...person, number: newNumber}
				personsService
					.update(person.id, updatedPerson)
					.then((data) => setPersons(persons.map(p => p.id !== person.id ? p : data)))
			}
		}
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

	const handleDelete = (id) => {
		const person = persons.find((p) => p.id === id);
		if(window.confirm(`Do you want to delete ${person.name}?`)){
			personsService	
				.remove(person.id)
				.then(() => {
					setPersons(persons.filter((p) => p.id !== person.id));
				})
				.catch((error) => {
					alert(`Error! Entry already deleted.`);
					console.log(error);
				})
		}
	}

	return (	
		<div>
			<h2>Phonebook</h2>
				<Filter value = {filter} onHandleChange = {handleChangeFilter}/>
			<h2>Add a new</h2>
				<PersonForm onSubmit = {addName} numValue = {newNumber} nameValue = {newName} onHandleChangeName={handleChangeName} onHandleChangeNum={handleChangeNum}/>
			<div>
				<h2>Names</h2>
				<Persons persons = {persons} filter = {filter} onDelete = {handleDelete}/>
			</div>
		</div>
	);
}

export default App;
