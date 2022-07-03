const express = require('express');
import Express from 'express';

const app:Express.Application = express();
const bodyParser = require('body-parser');

const users = require('./routes/users');
const importer = require('./routes/import');
const teams = require('./routes/teams');

module.exports = app;

app.use(bodyParser.json());

app.use('/users', users);
app.use('/import', importer);
app.use('/teams', teams);

app.listen(4000);
console.log('listening on localhost:4000');