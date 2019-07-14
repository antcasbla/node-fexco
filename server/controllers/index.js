const express = require('express');

const app = express();

app.use(require('./amqpController'));
app.use(require('./httpController'));

module.exports = app;