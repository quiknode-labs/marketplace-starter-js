import { Router } from 'express';

const router = Router();

const jwt = require('jsonwebtoken');

import models, { sequelize } from '../models';

router.get('/', async (request, response) => {
  try {
    console.log('Decoding JWT: ' + request.query.jwt)
    let decoded = jwt.verify(request.query.jwt, process.env.QN_SSO_SECRET)
    console.log('Decoded JWT for quicknode_id = ', decoded['quicknode_id'])

    const account = await models.Account.findOne({
      where: {
        quicknode_id: decoded['quicknode_id'],
      }
    });
    if (account === null) {
      console.log("Could not find account with id: " + request.body['quicknode-id'])
      return response.status(401).send('Unauthorized')
    } else {
      return response.status(200).send(
        `Welcome to dashboard for ${account.get('quicknode_id')} (${account.get('plan')} plan)`
      )
    }
  } catch(e) {
    console.log('Error decoding JWT: ' + e)
    return response.status(401).send('Unauthorized')
  }

  return response.status(401).send('Unauthorized')
});

export default router;