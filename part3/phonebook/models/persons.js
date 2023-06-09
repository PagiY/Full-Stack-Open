const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url)
        .then(() => {
            console.log('connected to mongodb!')
        })
        .catch((err) => {
            console.log('failed to connect to mongodb', err)
        })

const personSchema = new mongoose.Schema({
    //schema validations
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: (value) => {
                const valueSplit = value.split("-");
                return ((valueSplit[0].length === 2 || valueSplit[0].length === 3) && valueSplit[1].length >= 6) && valueSplit.length <= 2;
            },
            message: (props) => `${props.value} is not a valid Phone Number.`
        },
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('phonebook', personSchema);

module.exports = Person;
