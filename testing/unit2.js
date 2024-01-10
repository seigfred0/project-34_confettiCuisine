const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`request made to ${req.url}`);
    console.log(req.query);
    next();
})

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("static"))

app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POSTED");
})

app.get("/", (req, res) => {
    res.send("Hello World Anoterh Text")
})

app.get("/items/:shoes", (req, res) => {
    res.send(req.params.shoes);
})


app.listen(5000)

console.log('running')
