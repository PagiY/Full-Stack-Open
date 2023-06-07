require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const Persons = require('./models/persons');

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'));
app.use(express.static('build'));

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
    },
    { 
        "id": 5,
        "name": "Test", 
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Persons.find({})
           .then(persons => {
                response.json(persons);
            })
})

app.get('/info', (request, response) => {
    Persons.find({})
           .then(persons => {
                const date = new Date();
                response.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>`);
            })
})

app.get('/api/persons/:id', (request, response, next) => {
    //const id = Number(request.params.id);
    // const person = persons.find(person => person.id === id);
    
    // if(!person){
    //     response.status(404).end();
    // }
    Persons.findById(request.params.id)
           .then(person => {
                response.json(person);
            })
           .catch(err => next(err))
})

// const generateID = () => {
//     const min = Math.ceil(1);
//     const max = Math.floor(10000);
//     return persons.length <= 0 ? 0 : Math.floor(Math.random() * (max - min + 1) + min);
// }

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if(!body.name || !body.number){
        response.status(404).json({
            error: "name or number is missing"
        });
        return;
    }

    // const findPerson = Persons.find({name: body.name})
    //                           .then(person => response.json(person))

    // if(findPerson){
    //     response.status(404).json({
    //         error: "name must be unique"
    //     });
    //     return;
    // }

    const person = new Persons({
        name: body.name,
        number: body.number,
    })

    person.save()
          .then((savedPerson) => {
            console.log(`${savedPerson} added to database`);
            response.json(savedPerson);
          })
})

app.delete('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id);
    // persons = persons.filter(person => person.id !== id);
    // console.log(persons);
    Persons.findByIdAndRemove(request.params.id)
            .then(() => {
                response.status(204).end();
            })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;
    console.log(body);

    const newPerson = {
        name: body.name,
        number: body.number,
    }

    Persons.findByIdAndUpdate(request.params.id, newPerson, {new:true})
           .then((updatedPerson) => {
                response.json(updatedPerson);
           })
           .catch((err) => console.log(err))
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message);
    console.log(error.name);

    if(error.name === 'CastError'){
        return response.status(404).end();
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>{ 
    console.log(`Listening at PORT ${PORT}`);
});