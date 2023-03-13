import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => {
  // TODO: make a SQL query to make sure DB is up and running
  response.send("OK")
});

export default router;