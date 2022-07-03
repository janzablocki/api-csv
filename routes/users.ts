const { Router } = require('express');
import { Request, Response } from 'express';
import { getUsers, getUserById } from '../helpers/users';

const router = Router();

router.get('/', async (_request:Request, response:Response) => {
  const result = await getUsers();
  response.json(result);
});

router.get('/:id', async (request:Request, response:Response) => {
  const id = parseInt(request.params.id);
  if (isNaN(id)) {
    response.status(400).json({ error: 'Invalid id' });
    return;
  }
  const result = await getUserById(id);
  if (!result) {
    response.status(404).json({ error: 'User not found' });
    return;
  }
  response.json([result]);
});

module.exports = router;