const { Router } = require('express');
import { Request, Response } from 'express';
var pool = require('../db/index');

const router = Router();

router.get('/', (_request:Request, response:Response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC')
    .then((result: any) => {
      response.json(result.rows);
    },
    ).catch((err: any) => {
      response.status(500).send(err);
    });
});

router.get('/:id', (request:Request, response:Response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT * FROM users WHERE id = $1', [id])
    .then((result: any) => {
      response.json(result.rows);
    })
    .catch((err: any) => {
      response.status(500).send(err);
    });
});

module.exports = router;