// const port = 3000;
// const http = require('http');

// const router = require('./router');
// const contentType = require('./contentTypes');
// const utils = require('./utils');

// router.get("/", (req, res) => {
//     res.writeHead(200, contentType.html);
//     utils.getFile("views/index.html", res)
// })

// router.get("/confetti_cuisine.css", (req, res) => {
//     res.writeHead(200, contentType.css);
//     utils.getFile("public/css/confetti_cuisine.css", res)
// })

// http.createServer(router.handle).listen(port)

// console.log('server running')

const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');

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


app.listen(app.get("port"), () => {
    console.log("server is running")
})