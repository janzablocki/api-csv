const pool = require('../db/index');

import { TeamWithUsers, TeamData } from '../types/types';

export async function getTeamWithUsers(team: TeamData):Promise<TeamWithUsers> {
  const query = 'SELECT * FROM users WHERE team = $1';
  const users = await pool.query(query, [team.team])
    .catch((err:any) => {
      console.log(err);
      return;
    });
  const result: TeamWithUsers = {
    id: team.id,
    team: team.team,
    users: users.rows,
  };
  return result;
}

export async function getTeams():Promise<TeamData[]> {
  const query = 'SELECT * FROM teams ORDER BY id ASC';
  const teams = await pool.query(query)
    .catch((err:any) => {
      console.log(err);
      return;
    });
  return teams.rows;
}

export async function getTeamById(id:number):Promise<TeamData> {
  const query = 'SELECT * FROM teams WHERE id = $1';
  const team = await pool.query(query, [id])
    .catch((err:any) => {
      console.log(err);
      return;
    });
  return team.rows[0];
}

