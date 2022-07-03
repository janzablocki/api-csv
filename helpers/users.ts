const pool = require('../db/index');

import { UserData } from '../types/types';


export async function getUsers():Promise<UserData[]> {
  const query = 'SELECT * FROM users ORDER BY id ASC';
  const users = await pool.query(query)
    .catch((err:any) => {
      console.log(err);
      return;
    });
  return users.rows;
}

export async function getUserById(id:number):Promise<UserData> {
  const query = 'SELECT * FROM users WHERE id = $1';
  const user = await pool.query(query, [id])
    .catch((err:any) => {
      console.log(err);
      return;
    });
  return user.rows[0];
}

