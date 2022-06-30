const importHelpers = require('../dist/helpers/import');
var pool = require('../db/index');

describe('Insert users to database', () => {
  test('Insert users to database - successfully creates user when no duplicate is found', async () => {
    const input = [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@test.com',
        role_description: 'Test',
        team: 'Test',
      },
    ];
    await pool.query('DELETE FROM users WHERE email = $1', [input[0].email]);
    const result = await importHelpers.insertUsers(input);
    expect(result[0].user).toEqual(input[0]);
    expect(result[0].created).toBe(true);
  });

  test('Insert users to database - fails to create user when duplicate is found', async () => {
    const input = [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@test.com',
        role_description: 'Test',
        team: 'Test',
      },
    ];
    const result = await importHelpers.insertUsers(input);
    expect(result[0].user).toEqual(input[0]);
    expect(result[0].created).toBe(false);
    expect(result[0].err_code).toBe('23505');
    pool.query('DELETE FROM users WHERE email = $1', [input[0].email]);
  });
});

describe('Insert teams to database', () => {
  test('Insert teams to database - successfully creates team when no duplicate is found', async () => {
    const input = ['Test'];
    await pool.query('DELETE FROM teams WHERE team = $1', [input[0]]);
    const result = await importHelpers.insertTeams(input);
    expect(result[0].team).toEqual(input[0]);
    expect(result[0].created).toBe(true);
  });

  test('Insert teams to database - fails to create team when duplicate is found', async () => {
    const input = ['Test'];
    const result = await importHelpers.insertTeams(input);
    expect(result[0].team).toEqual(input[0]);
    expect(result[0].created).toBe(false);
    expect(result[0].err_code).toBe('23505');
  });
});

describe('Format csv data', () => {
  test('Format csv data - successfully formats data', () => {
    const input = [
      {
        'first name': 'John',
        'last name': 'Doe',
        email: 'johndoe@test.com',
        'role description': 'Test',
        team: 'Test',
      },
    ];
    const result = importHelpers.formatCsv(input);
    expect(result[0].first_name).toEqual('John');
    expect(result[0].last_name).toEqual('Doe');
    expect(result[0].email).toEqual('johndoe@test.com');
    expect(result[0].role_description).toEqual('Test');
    expect(result[0].team).toEqual('Test');
  });
});

describe('Extract teams from csv data', () => {
  test('Extract teams from csv data - successfully extracts teams', () => {
    const input = [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@test.com',
        role_description: 'Test',
        team: 'Test',
      },
    ];
    const result = importHelpers.extractTeams(input);
    expect(result).toEqual(['Test']);
  });
});

