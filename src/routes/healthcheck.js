import { Router } from 'express';

const router = Router();

import models, { sequelize } from '../models';

router.get('/', async (request, response) => {
  const count = await models.Account.count();
  console.log("Healthcheck: " + count)
  response.send("OK")
});

export default router;