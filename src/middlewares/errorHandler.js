const { baseHtml, getNavBar } = require('../controllers/productController')

function errorHandler (err, req, res, next) {

    console.error("ERROR:" + err.message)
    const statusCode = err.status || 500 //Si no hay status code asignado le pone 500

    const errorHtml = `
    <div class="error">
        <h1>Error ${statusCode}</h1>
        <p>${err.message}</p>
    </div>
    `
    bodyPlaceholder = getNavBar() + errorHtml

    let html = baseHtml(bodyPlaceholder)

    //console.log("ErrorMiddlewareActivo")
    res.status(statusCode).send(html)
};

module.exports = errorHandler;