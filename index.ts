const express = require('express');
import Express from 'express';

const app:Express.Application = express();
const bodyParser = require('body-parser');

const users = require('./routes/users');

module.exports = app;

app.use(bodyParser.json());

app.use('/users', users);

app.listen(4000);
console.log('listening on localhost:4000');