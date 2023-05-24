const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'));

morgan.token('type', function (req, res) { 
    return JSON.stringify(req.body) 
})

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/info', (request, response) => {
    const phonebookCount = persons.length;
    const date = new Date();
    response.send(`<p>Phonebook has info for ${phonebookCount} people.</p><p>${date}</p>`);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    
    if(!person){
        response.status(404).end();
    }

    response.json(person);
})

const generateID = () => {
    const min = Math.ceil(1);
    const max = Math.floor(10000);
    return persons.length <= 0 ? 0 : Math.floor(Math.random() * (max - min + 1) + min);
}

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if(!body.name || !body.number){
        response.status(404).json({
            error: "name or number is missing"
        });
        return;
    }

    const findPerson = persons.find(p => p.name === body.name);

    if(findPerson){
        response.status(404).json({
            error: "name must be unique"
        });
        return;
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID(),
    }

    persons = persons.concat(person);

    response.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    console.log(persons);
    response.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () =>{ 
    console.log(`Listening at PORT ${PORT}`);
});