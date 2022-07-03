const { Router } = require('express');
import { Request, Response } from 'express';
import { getTeams, getTeamWithUsers, getTeamById } from '../helpers/teams';

const router = Router();

router.get('/', async (_request:Request, response:Response) => {
  const teams = await getTeams();
  const result = [];
  for (const team of teams) {
    const usersInTeam = await getTeamWithUsers(team);
    result.push(usersInTeam);
  }
  response.json(result);
});

router.get('/:id', async (request:Request, response:Response) => {
  const id = parseInt(request.params.id);
  if (isNaN(id)) {
    response.status(400).json({ error: 'Invalid id' });
    return;
  }
  const team = await getTeamById(id);
  if (!team) {
    response.status(404).json({ error: 'Team not found' });
    return;
  }
  const result = await getTeamWithUsers(team);
  response.json([result]);
});

module.exports = router;