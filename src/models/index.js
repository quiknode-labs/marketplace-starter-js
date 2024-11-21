import Sequelize from "sequelize";

import getAccountModel from "./account";
import getEndpointModel from "./endpoint";

// Set the environment and get the corresponding configuration
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];

// Initialize Sequelize with database configuration
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const models = {
  Account: getAccountModel(sequelize, Sequelize),
  Endpoint: getEndpointModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
