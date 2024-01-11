
const mongoose = require('mongoose');
const Subscriber = require("./models/subscriber");
const subscribersController = require("./controllers/subscribersController");


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
const router = express.Router();

const methodOverride = require("method-override");

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

app.use(express.urlencoded({ extended: true }));

app.use("/", router);

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


router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);


// router.get("/users/:id", (req, res) => {
//     console.log(req.params);
// });

router.get("/users/:id", usersController.show, usersController.showView);


router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
// router.post("/users/create", (req, res) => {
//     console.log(req.body);
// })
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


