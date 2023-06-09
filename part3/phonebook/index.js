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

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    // if(!body.name || !body.number){
    //     response.status(404).json({
    //         error: "name or number is missing"
    //     });
    //     return;
    // }

    Persons.find({name: body.name})
           .then(person => {

                if(person.length <= 0){

                    const person = new Persons({
                                name: body.name,
                                number: body.number,
                            })
                        
                    person.save()
                            .then((savedPerson) => {
                                console.log(`${savedPerson} added to database`);
                                response.json(savedPerson);
                            })
                            .catch((error) => next(error));
                }
                else{
                    response.json(person);
                }
            })

    // console.log(findPerson);

    // if(findPerson){
    //     response.status(404).json({
    //         error: "name must be unique"
    //     });
    // }
    // else{
    //     const person = new Persons({
    //         name: body.name,
    //         number: body.number,
    //     })
    
    //     person.save()
    //           .then((savedPerson) => {
    //             console.log(`${savedPerson} added to database`);
    //             response.json(savedPerson);
    //           })
    //           .catch((error) => next(error));
    // }
    
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

    Persons.findByIdAndUpdate(request.params.id, newPerson, {new:true, runValidators: true, context: 'query' })
           .then((updatedPerson) => {
                response.json(updatedPerson);
           })
           .catch((err) => next(err))
})

const errorHandler = (error, request, response, next) => {

    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'});
    }
    else if (error.name === 'ValidationError'){
        return response.status(400).send({error: error.message});
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>{ 
    console.log(`Listening at PORT ${PORT}`);
});