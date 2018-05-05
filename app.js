/*
 *
 * Main Modules 
 *  
 */
const express = require('express');
const mongoose = require('mongoose');

// IMPORT MIDDLEWARES
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// CONFIG FILE
const config = require('./config');


const app = express();
/*
 *
 * Middlewares
 * 
 */
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * 
 * Database Connection
 * 
 */


mongoose.connect(config.database);
mongoose.connection.on('connected' , () => {
    console.log('Database Connected Successfully!');
})



/*
 *
 * Routes
 * 
 */







/*
 *
 * Http Listen Port
 * 
 */

app.listen(config.port, () => {
    console.log(`App Is Running in Port ${config.port}`)
})









