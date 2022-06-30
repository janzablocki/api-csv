const pool = require('../db/index');

import { InputData, FormattedInputData, TeamInsertResponse, UserInsertResponse } from '../types/types';

function format(string:string | undefined): string | null {
  if (string === '' || !string || typeof string !== 'string') return null;
  return string.trim();
}

export async function insertUsers(input: FormattedInputData[]): Promise<UserInsertResponse[]> {
  const query = 'INSERT INTO users(first_name, last_name, email, role_description, team) VALUES ($1, $2, $3, $4, $5)';
  const result: Array<{ user: FormattedInputData, created: boolean, detail: string, err_code?: string }> = [];
  for (const user of input) {
    await pool.query(query, [user.first_name, user.last_name, user.email, user.role_description, user.team])
      .then(() => {
        result.push({ user, created: true, detail: 'Successfully created' });
      })
      .catch((err:any) => {
        result.push({ user, created: false, detail: err.detail, err_code: err.code });
      });
  }
  return result;
}

export async function insertTeams(input: Array<string | null>): Promise<TeamInsertResponse[]> {
  const query = 'INSERT INTO teams(team) VALUES ($1)';
  const result: Array<{ team: string; created: boolean; detail: string; err_code?: string }> = [];
  for (const team of input) {
    if (typeof team == 'string') {
      await pool.query(query, [team])
        .then(() => {
          result.push({ team: team, created: true, detail: 'Successfully created' });
        })
        .catch((err:any) => {
          result.push({ team: team, created: false, detail: err.detail, err_code: err.code });
        });
    }
  }
  return result;
}

export function formatCsv(input: InputData[]): FormattedInputData[] {
  const result: FormattedInputData[] = [];
  for (const user of input) {
    result.push({
      first_name: format(user['first name']),
      last_name: format(user['last name']),
      email: format(user.email),
      role_description: format(user['role description']),
      team: format(user.team),
    });
  }
  return result;
}

export function extractTeams(input: FormattedInputData[]): Array<string> {
  const result: Array<string> = [];
  for (const user of input) {
    if (typeof user.team === 'string' && !result.includes(user.team)) { // To be honest, those high-level javascript methods feel like cheating. That's why kids those days can't code or lift heavy weights, when I was young, we used to code punch cards with a screwdriver. Nobody complained.
      result.push(user.team);
    }
  }
  return result;
}
