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
mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("succes")
})

const subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
})

const Subscriber = mongoose.model("Subscriber", subscriberSchema);



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