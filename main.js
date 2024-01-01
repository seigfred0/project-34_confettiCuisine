// const MongoDB = require('mongodb')
// const dbURL = "mongodb://localhost:27017";
// const dbName = "recipe_db";


// MongoDB.connect(dbURL, (error, client) => {
//     if (error) throw error;
//     let db = client.db(dbName);
//     db.collection("contacts").find().toArray((error, data) => {
//         if (error) throw error;
//         console.log(data);
//     })

//     db.collection("contacts").insert({
//         name: "Freddie Mercury",
//         email: "fredie@email.com"
//     }, (error, db) => {
//         if (error) throw error;
//         console.log(db);
//     })
// })
// const { MongoClient } = require('mongodb');

// const dbURL = "mongodb://localhost:27017";
// const dbName = "recipe_db";

// MongoClient.connect(dbURL, (error, client) => {
//     if (error) throw error;

//     const db = client.db(dbName);

//     // Find documents in the "contacts" collection
//     db.collection("contacts").find().toArray((error, data) => {
//         if (error) throw error;
//         console.log("Contacts:");
//         console.log(data);
//     });

//     // Insert a new document into the "contacts" collection
//     db.collection("contacts").insertOne({
//         name: "Freddie Mercury",
//         email: "freddie@email.com"
//     }, (error, result) => {
//         if (error) throw error;
//         console.log("Inserted document:", result.ops[0]);
//     });

//     // Close the connection after operations
//     client.close();
// });
const mongoose = require('mongoose');
const Subscriber = require("./models/subscriber");

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("succes")
})



var subscriber1 = new Subscriber({
    name: "Jon Wexler",
    email: "jon@jonwexler.com"
});

var subscriber2 = new Subscriber({
    name: "Seigfred Sayson",
    email: "seigfred@mail.com"
});

Subscriber.create()
subscriber1.save()
subscriber2.save()

    // {
    //     name: "Jon Wexler",
    //     email: "jon@jonwexler.com"
    // },
    // function (error, savedDocument) {
    //     if (error) console.log(error);
    //     console.log(savedDocument)
    // }



const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');

const errorController = require('./controllers/errorController')
const homeController = require('./controllers/homeControllers')


app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use(express.static("public"))
app.use(layouts)
app.use(express.urlencoded({
    extended: false
}));

app.get("/", (req, res) => {
    res.render("index")
    
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log("server is running")
})