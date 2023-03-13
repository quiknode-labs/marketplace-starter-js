import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => {
  // TODO: implement jwt auth
  response.status(200).json({
    'status': 'cool'
  })
});

export default router;