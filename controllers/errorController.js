const httpStatus = require('http-status-code')

exports.pageNotFoundError = (req, res) => {
    let errorCode = 404;
    res.status(404);
    res.render("error")
}

exports.internalServerError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR at ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} APP IS DOWN`)
}