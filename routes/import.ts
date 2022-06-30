const { Router } = require('express');
// const pool = require('../db/index');
import { parse } from 'csv-string';
import { Request, Response } from 'express';
// import { FormattedInputData, InputData, UserInsertResponse, TeamInsertResponse } from '../types/types';
import { InputData } from '../types/types';
import { insertUsers, insertTeams, formatCsv, extractTeams } from '../helpers/import';

const router = Router();

router.post('/', async (request: Request, response: Response) => {
  let body = '';
  request.on('data', (data) => {
    body += data;
  });
  request.on('end', async function () {
    let parsedInputData: InputData[] = parse(body, { output: 'objects' }); // works with all delimiters
    if (!parsedInputData[0]) {
      response.status(400).send('Invalid CSV');
      return;
    }
    if (parsedInputData[0]?.team === undefined || parsedInputData[0]?.email === undefined) {
      response.status(400).send('Invalid CSV. You must provide a team and email column.');
      return;
    }

    const formattedInputData = formatCsv(parsedInputData);
    const teams = extractTeams(formattedInputData);

    const teamInsertResult = await insertTeams(teams);
    const userInsertResult = await insertUsers(formattedInputData);

    const result = {
      teams: teamInsertResult,
      users: userInsertResult,
    };
    
    response.json(result);
    return;
  });
});

module.exports = router;