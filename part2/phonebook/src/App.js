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

	const handleErrorMessage = (msg) => {
		setErrorMessage(msg);
		setTimeout(() => {setErrorMessage(null)}, 5000);
	}	

	const handleSuccessMessage = (msg) => {
		setSuccessMessage(msg);
		setTimeout(() => {setSuccessMessage(null)}, 5000);
	}

	useEffect(() => {
		personsService
			.getAll()
			.then(data => setPersons(data))
			.catch(error => {handleErrorMessage(error.message)})
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

		const newPerson = {
			name: newName,
			number: newNumber
		}

		const person = persons.find(p => p.name === newName);

		// personsService
		// 	.getOne(personID.id)
		// 	.then((res) => {
		// 		console.log(res);
		// 	})

		if(person === undefined){
			personsService
				.create(newPerson)
				.then((res) => {
					setPersons(persons.concat(res))
					handleSuccessMessage(`Added ${newPerson.name}`);
				})
				.catch(error => {
					handleErrorMessage(error.response.data.error);
				});
		}
		else{
			if(window.confirm(`${person.name} is already added to phonebook, replace old number with new one?`)){
				const updatedPerson = {...person, number: newNumber}
				personsService
					.update(person.id, updatedPerson)
					.then((data) => {
						if(data !== null){
							setPersons(persons.map(p => p.id !== person.id ? p : data))
							handleSuccessMessage(`Updated ${updatedPerson.name}`);
						}
						else{
							setPersons(persons.filter((p) => p.id !== person.id));
							handleErrorMessage(`Information of ${person.name} has already been removed from the server.`)
						}
					})
					.catch(error => {
						handleErrorMessage(error.response.data.error);
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
					handleSuccessMessage(`Deleted ${person.name}`);
				})
				.catch(() => {
					handleErrorMessage(`Error! Entry already deleted.`);
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
