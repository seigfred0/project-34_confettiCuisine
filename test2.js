const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/recipe_db");

const Subscriber = require("./models/subscriber");
const User = require("./models/user");
const subscriber = require('./models/subscriber');

let testUser ;

User.create({
    name: {
        first: "Seigfred",
        last: "Sayson"
    },
    email: "seigfred@gmail.com",
    password: "pass123"
}).then(user => {
    testUser = user;
    return  Subscriber.findOne({
        email: user.email
    });
}).then(subscriber => {
    console.log(subscriber)
    testUser.subscribedAccount = subscriber;
    testUser.save().then(user => console.log('user updated'));
}).catch(error => console.log(error.message))



// let targetSubscriber;
// Subscriber.findOne({
//     email: "christian@gmail.com"
// }).then(subscriber => {
//     targetSubscriber = subscriber;
//     console.log(targetSubscriber.email)

// }).catch(error => console.log(error.message))

