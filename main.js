
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

// var subscriber1 = new Subscriber({
//     name: "Jon Wexler",
//     email: "jon@jonwexler.com"
// });

// var subscriber2 = new Subscriber({
//     name: "Seigfred Sayson",
//     email: "seigfred@mail.com"
// });

// subscriber1.save()
//     .then(() => subscriber2.save())
//     .then(() => {
//         return Subscriber.findOne({
//             name: "Jon Wexler"
//         }).where("email", /wexler/).exec();
//     })
//     .then((data) => {
//         if (data) console.log(data.name);
//     })
//     .catch((error) => {
//         console.error(error);
//     });


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



app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
    // console.log(req.data);
    // res.status(200).send(req.data);
    console.log("Number of subscribers in req.data:", req.data.length);
    

    res.render("subscribers", {subscribers: req.data});
})


app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);



app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log("server is running")
})