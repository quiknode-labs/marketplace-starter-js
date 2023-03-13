import { Router } from 'express';

const router = Router();

router.post('/', (request, response) => {
  // TODO: validate quicknode-id
  response.status(200).json({
    message: 'Welcome to the JSON-RPC API'
  })
});

export default router;