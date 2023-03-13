import { Router } from 'express';

const router = Router();

router.get('/', async (request, response) => {
  // TODO: add API KEY Authentication
  response.status(200).json({
    message: 'Welcome to the API'
  })
});

export default router;