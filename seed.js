const mongoose = require('mongoose');
const Subscriber = require('./models/subscriber');

mongoose.connect(
    "mongodb://localhost:27017/recipe_db"
)

mongoose.connection;

const contacts = [
    {
        name: "seigfred sayson",
        email: "seigfred@gmail.com",
        zipCode: 10016
    },
    {
        name: "christian perricone",
        email: "christian@gmail.com",
        zipCode: 10019
    },
    {
        name: "jacob perricone",
        email: "jacob@gmail.com",
        zipCode: 10020
    }
]

// Subscriber.deleteMany().exec().then(() => {
//     console.log("Subscriber data is empty");
// });

// var commands = [];
// contacts.forEach((c) => {
//     commands.push(Subscriber.create({
//         name: c.name,
//         email: c.email
//     }))
// })

// Promise.all(commands).then(r => {
//     console.log(JSON.stringify(r));
//     mongoose.connection.close();
// }).catch(error => {
//     console.log(`ERROR: ${error}`)
// })

const deleteAndCreateDocuments = async () => {
    try {
        // Delete existing documents
        await Subscriber.deleteMany().exec();
        console.log("Subscriber data is empty");

        // Create new documents
        const createCommands = contacts.map(c => Subscriber.create({
            name: c.name,
            email: c.email
        }));

        const result = await Promise.all(createCommands);
        console.log(JSON.stringify(result));

        mongoose.connection.close();
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
};

deleteAndCreateDocuments();