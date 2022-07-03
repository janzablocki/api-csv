const usersHelpers = require('../dist/helpers/users');
var pool = require('../db/index');

describe('Get users from database', () => {
  test('Get users from database - successfully gets users', async () => {
    const result = await usersHelpers.getUsers();
    expect(result).toBeDefined();
  });
});

describe('Get user by id from database', () => {
  test('Get user by id from database - successfully gets user', async () => {
    let insertResponse = await pool.query('INSERT INTO users (first_name, last_name, email, role_description, team) VALUES ($1, $2, $3, $4, $5) RETURNING id', ['Jane', 'Doe', 'janedoe@example.com', 'Test', 'TestTeam']);
    let userId = insertResponse.rows[0].id;
    const result = await usersHelpers.getUserById(userId);
    expect(result).toBeDefined();
    pool.query('DELETE FROM users WHERE id = $1', [userId]);
    pool.query('DELETE FROM teams WHERE team = $1', ['TestTeam']);
  });
  test('Get user by id from database - fails to get user', async () => {
    const result = await usersHelpers.getUserById(0);
    expect(result).toBeUndefined();
  });
});
