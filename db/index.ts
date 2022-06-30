const { Pool } = require('pg');
const { user, host, database, password, port } = require('../secrets/db_configuration');

var pool = new Pool({ user, host, database, password, port }); // using var because typescript throws a ridiculous error about block scoping when i try to import this via CommonJS require.

module.exports = pool;