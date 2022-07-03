const teamsHelpers = require('../dist/helpers/teams');
var pool = require('../db/index');

describe('Get teams from database', () => {
  test('Get teams from database - successfully gets teams', async () => {
    const result = await teamsHelpers.getTeams();
    expect(result).toBeDefined();
  });
});

describe('Get team by id from database', () => {
  test('Get team by id from database - successfully gets team', async () => {
    let insertResponse = await pool.query('INSERT INTO teams (team) VALUES ($1) RETURNING id', ['TestTeam']);
    let teamId = insertResponse.rows[0].id;
    const result = await teamsHelpers.getTeamById(teamId);
    expect(result).toBeDefined();
    pool.query('DELETE FROM teams WHERE id = $1', [teamId]);
  });
  test('Get team by id from database - fails to get team', async () => {
    const result = await teamsHelpers.getTeamById(0);
    expect(result).toBeUndefined();
  });
});