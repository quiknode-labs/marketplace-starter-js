import { Router } from 'express';

const router = Router();

import models, { sequelize } from '../models';

router.post('/', async (request, response) => {
  console.log(request.body)
  var accountId = request.headers['x-quicknode-id']
  var endpointId = request.headers['x-instance-id']
  var rpcMethod = request.body.method
  var rpcParams = request.body.params
  console.log("RPC call for:")
  console.log("  accountId: " + accountId)
  console.log("  endpointId: " + endpointId)
  console.log("  method: " + rpcMethod)
  console.log("  params: " + rpcParams)

  const account = await models.Account.findOne({
    where: {
      quicknode_id: accountId,
    }
  });
  if (account === null) {
    console.log("Could not find account with id: " + accountId)
    response.status(404).json({
      'status': 'error',
      'message': 'Could not find account with id: ' + accountId,
    })
  } else {
    console.log("Finding endpoint with id: " + endpointId)
    const endpoint = await models.Endpoint.findOne({
      where: {
        quicknode_id: endpointId,
        account_id: account.get('id'),
      }
    });

    if (endpoint === null) {
      console.log("Could not find endpoint with id: " + endpointId)
      response.status(404).json({
        'status': 'error',
        'message': 'Could not find endpoint with id: ' + endpointId,
      })
    } else {
      // If you need to make a request to the QuickNode endpoint here,
      // then you can use endpoint.get('http_url') to get the URL of the endpoint.

      response.status(200).json({
        message: 'Welcome to the JSON-RPC API.',
        method: rpcMethod,
        params: rpcParams
      })
    }
  }
});

export default router;