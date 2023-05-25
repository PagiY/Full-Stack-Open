import { useState, useEffect } from "react";
import personsService from './services/persons';

import Filter from './components/Filter';
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);

	const [filter, setFilter] = useState('');
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		personsService
			.getAll()
			.then(data => setPersons(data));

	}, []);

	const handleChangeName = (e) => {
		setNewName(e.target.value);
	}

	const handleChangeNum = (e) => {
		setNewNumber(e.target.value);
	}

	const handleChangeFilter = (e) => {
		setFilter(e.target.value);
	}

	const addName = (e) => {

		e.preventDefault();

		if(newName === '' || newNumber === ''){
			setErrorMessage(`Name and Phone Number must not be empty.`);
			setTimeout(() => {setErrorMessage(null)}, 5000);
			return;
		}

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
					setSuccessMessage(`Added ${newPerson.name}`);
					setTimeout(() => {setSuccessMessage(null)}, 5000);
				})
		}
		else{
			if(window.confirm(`${person.name} is already added to phonebook, replace old number with new one?`)){
				const updatedPerson = {...person, number: newNumber}
				personsService
					.update(person.id, updatedPerson)
					.then((data) => {
						setPersons(persons.map(p => p.id !== person.id ? p : data))
						setSuccessMessage(`Updated ${updatedPerson.name}`);
						setTimeout(() => {setSuccessMessage(null)}, 5000);
					})
					.catch(() => {
						setErrorMessage(`Information of ${person.name} has already been removed from the server.`);
						setTimeout(() => {setErrorMessage(null)}, 5000);
					})
			}
		}
	}

	const handleDelete = (id) => {
		const person = persons.find((p) => p.id === id);
		if(window.confirm(`Do you want to delete ${person.name}?`)){
			personsService	
				.remove(person.id)
				.then(() => {
					setPersons(persons.filter((p) => p.id !== person.id));
					setSuccessMessage(`Deleted ${person.name}`);
					setTimeout(() => {setSuccessMessage(null)}, 5000);
				})
				.catch(() => {
					setErrorMessage(`Error! Entry already deleted.`);
					setTimeout(() => {setErrorMessage(null)}, 5000);
				})
		}
	}

	return (	
		<div>
			<h2>Phonebook</h2>
				<Notification message = {errorMessage} className={"error"}/>
				<Notification message = {successMessage} className={"success"}/>
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
