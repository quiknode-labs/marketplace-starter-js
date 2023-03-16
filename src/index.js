import 'dotenv/config';
import cors from 'cors';
import routes from './routes';

const express = require('express')

import models, { sequelize } from './models';

const bodyParser = require('body-parser')
const app = express()
const port = process.env.HTTP_PORT

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/api', routes.api);
app.use('/dashboard', routes.dashboard);
app.use('/healthcheck', routes.healthcheck);
app.use('/', routes.provisioning);
app.use('/rpc', routes.rpc);


// A home page for your add-on
app.get('/', (request, response) => {
  response.send('A QuickNode Marketplace Add-On example build with node.js, Express, and PostgreSQL')
})

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
});