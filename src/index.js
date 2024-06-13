require('dotenv').config();
const express = require('express');
const app = express();
const { dbConnection } = require('./config/db');
const routes = require('./routes/productRoutes');
const methodOverride = require('method-override')
const errorHandler = require('./middlewares/errorHandler')


// Middlewares para habilitar recepción de JSONs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'))



const PORT = process.env.PORT;

app.use('/', routes);

dbConnection();

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;