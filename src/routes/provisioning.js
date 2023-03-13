import { Router } from 'express';

const router = Router();

router.post('/provision', (request, response) => {
  response.send("OK")
});

router.put('/update', (request, response) => {
  response.send("OK")
});

router.delete('/deactivate_endpoint', (request, response) => {
  response.send("OK")
});

router.delete('/deprovision', (request, response) => {
  response.send("OK")
});

export default router;