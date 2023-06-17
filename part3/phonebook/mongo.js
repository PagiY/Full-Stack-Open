const mongoose = require('mongoose');

if(process.argv.length < 3){
	console.log('Please provide the password as argument.');
	process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://pagiy:${password}@cluster0.4wamgpg.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Phonebook = mongoose.model('phonebook', phonebookSchema);

if(process.argv.length > 3){
	const name = process.argv[3];
	const number = process.argv[4];

	const person = new Phonebook({
		name: name,
		number: number,
	});

	person.save().then(() => {
		console.log(`Added ${name} number ${number} to phonebook`);
		mongoose.connection.close();
	});
}
else{
	console.log('Phonebook: ');

	Phonebook
		.find({})
		.then(persons => {
			persons.forEach(person => {
				console.log(`${person.name} ${person.number}`);
			});
			mongoose.connection.close();
		});
}