import { Router } from 'express';
const basicAuth = require('express-basic-auth')
const router = Router();

import models, { sequelize } from '../models';

// Provisioning API is behind basic auth
const authDetails = {}
authDetails[process.env.BASIC_AUTH_USERNAME] = process.env.BASIC_AUTH_PASSWORD
const authInfo = {
  users: authDetails,
  challenge: true,
  unauthorizedResponse: 'Not Authorized',
}

router.post('/provision', basicAuth(authInfo), async (request, response) => {
  const [account, accountCreated] = await models.Account.findOrCreate({
    where: { quicknode_id: request.body['quicknode-id'] },
    defaults: {
      is_test: request.headers['X-QN-TESTING'] === 'true',
      plan: request.body['plan'],
    }
  });
  console.log("Upserted account with id: " + account.get('id'))


  const [endpoint, endpointCreated] = await models.Endpoint.findOrCreate({
    where: {
      quicknode_id: request.body['endpoint-id'],
      account_id: account.get('id'),
    },
    defaults: {
      is_test: request.headers['X-QN-TESTING'] === 'true',
      plan: request.body['plan'],
      chain: request.body['chain'],
      network: request.body['network'],
      wss_url: request.body['wss_url'],
      http_url: request.body['http_url'],
    }
  });
  console.log("Upserted endpoint with id: " + endpoint.get('id'))

  var baseUrl = request.protocol + '://' + request.get('host')

  response.json({
      'status': 'success',
      // replace below with real URL for sso login
      'dashboard-url': `${baseUrl}/dashboard`,
      'access-url': `${baseUrl}/api`, // Return null if not applicable
  })
});

router.put('/update', basicAuth(authInfo), async (request, response) => {
  const account = await models.Account.findOne({
    where: {
      quicknode_id: request.body['quicknode-id'],
    }
  });
  if (account === null) {
    console.log("Could not find account with id: " + request.body['quicknode-id'])
    response.status(404).json({
      'status': 'error',
      'message': 'Could not find account with id: ' + request.body['quicknode-id'],
    })
  } else {
    console.log("Finding endpoint with id: " + request.body['endpoint-id'])
    const endpoint = await models.Endpoint.findOne({
      where: {
        quicknode_id: request.body['endpoint-id'],
        account_id: account.get('id'),
      }
    });
    
    if (endpoint === null) {
      console.log("Could not find endpoint with id: " + request.body['endpoint-id'])
      response.status(404).json({
        'status': 'error',
        'message': 'Could not find endpoint with id: ' + request.body['endpoint-id'],
      })
    } else {
      console.log('Updating account plan to' +  request.body['plan'])
      account.plan = request.body['plan']
      await account.save()

      console.log("Updating endpoint with id: " + endpoint.get('id'))
      endpoint.plan = request.body['plan']
      endpoint.chain = request.body['chain']
      endpoint.network = request.body['network']
      endpoint.wss_url = request.body['wss_url']
      endpoint.http_url = request.body['http_url']
      endpoint.is_test = request.headers['X-QN-TESTING'] === 'true'
      await endpoint.save();

      var baseUrl = request.protocol + '://' + request.get('host')
      response.json({
          'status': 'success',
          // replace below with real URL for sso login
          'dashboard-url': `${baseUrl}/dashboard`,
          'access-url': `${baseUrl}/api`, // Return null if not applicable
      })
    }
  }
});

router.delete('/deactivate_endpoint', basicAuth(authInfo), async (request, response) => {
  const account = await models.Account.findOne({
    where: {
      quicknode_id: request.body['quicknode-id'],
    }
  });
  if (account === null) {
    console.log("Could not find account with id: " + request.body['quicknode-id'])
      response.status(404).json({
        'status': 'error',
        'message': 'Could not find account with id: ' + request.body['quicknode-id'],
      })
  } else {
    console.log("Finding endpoint with id: " + request.body['endpoint-id'])
    const endpoint = await models.Endpoint.findOne({
      where: {
        quicknode_id: request.body['endpoint-id'],
        account_id: account.get('id'),
      }
    });

    // Deleting the endpoint
    await endpoint.destroy();

    response.json({
      'status': 'success',
    });
  }
});

router.delete('/deprovision', basicAuth(authInfo), async (request, response) => {
  const account = await models.Account.findOne({
    where: {
      quicknode_id: request.body['quicknode-id'],
    }
  });
  if (account === null) {
    console.log("Could not find account with id: " + request.body['quicknode-id'])
      response.status(404).json({
        'status': 'error',
        'message': 'Could not find account with id: ' + request.body['quicknode-id'],
      })
  } else {

    // Deleting the endpoint
    await account.destroy();

    response.json({
      'status': 'success',
    });
  }
});

export default router;