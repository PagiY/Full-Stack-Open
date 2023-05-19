import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: 'Arto Hellas',
			number: '09-12130112'
		}
	]);

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

	return (	
		<div>
			<h2>Phonebook</h2>
			<form onSubmit = {addName}>
				<div>
					name: <input value = {newName} onChange = {handleChangeName}/>
				</div>
				<div>
					number: <input value = {newNumber} onChange = {handleChangeNum}/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<div>
				<h2>Names</h2>
				<ul>
				{
					persons.map((person) => <li key = {person.name}>{person.name} {person.number}</li>)
				}
				</ul>
			</div>
		</div>
	);
}

export default App;
