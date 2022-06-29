const { Router } = require('express');
import { Request, Response } from 'express';

const router = Router();

router.get('/', (_req:Request, res:Response) => {
  res.send('Hello World!');
});

module.exports = router;