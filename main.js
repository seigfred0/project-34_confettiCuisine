
const mongoose = require('mongoose');
const Subscriber = require("./models/subscriber");
const subscribersController = require("./controllers/subscribersController")

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("succes")
})


const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');

const errorController = require('./controllers/errorController')
const homeController = require('./controllers/homeControllers')
const usersController = require("./controllers/usersController")

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

app.get("/users", usersController.index, usersController.indexView)

// app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
//     console.log("Number of subscribers in req.data:", req.data.length);
//     res.render("subscribers", {subscribers: req.data});
// })
app.get("/subscribers", subscribersController.getAllSubscribers);


app.get("/courses", homeController.showCourses);
// app.get("/contact", homeController.showSignUp);
// app.post("/contact", homeController.postedSignUpForm);

app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);



app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log("server is running")
})


