const fs = require('fs');
const contentTypes = require('./contentTypes');

module.exports = {

    getFile: (file, res) => {
        fs.readFile(`./${file}`, (error, data) => {
            if (error) {
                res.writeHead(404, contentTypes.html);
                res.end("There was an error serving content");
            }
            res.end(data);
        })
    }
}