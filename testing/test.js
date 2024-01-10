
const http = require('http');
const fs = require('fs');




const app = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
    res.writeHead(200, contentType.text)
    fs.readFile("./index.html", (error , data) => {
        res.write(data)
        res.end()
    })
   
})

app.listen(5000)

