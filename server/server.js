require('./config/config');

const express = require('express')
// Using Node.js `require()`
const mongoose = require('mongoose');

//Package to create a correct path
const path = require('path');

const app = express()

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// enable public folder
app.use(express.static(path.resolve( __dirname , '../client')))

// enable every controller defined in index.js
app.use(require('./controllers/index'));

// database
mongoose.connect(process.env.URLDB, (err, res) => {

    if(err) throw err;

    console.log('Database CONNECTED');

});

// port
app.listen(process.env.PORT, () => {
    console.log('Listening port: ', process.env.PORT);
});
