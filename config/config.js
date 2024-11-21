// Load environment variables from the .env file
require("dotenv").config();

module.exports = {
  // Configuration for the development environment
  development: {
    username: process.env.DB_USERNAME, // Database username for development
    password: process.env.DB_PASSWORD, // Database password for development
    database: process.env.DB_NAME, // Database name for development
    host: process.env.DB_HOST, // Database host for development
    port: process.env.DB_PORT, // Database port for development
    dialect: "postgres", // Database dialect (PostgreSQL)
    dialectOptions: {
      ssl: false, // SSL is not used in development
    },
  },
  // Configuration for the test environment
  test: {
    username: process.env.DB_USERNAME, // Database username for testing
    password: process.env.DB_PASSWORD, // Database password for testing
    database: process.env.DB_NAME, // Database name for testing
    host: process.env.DB_HOST, // Database host for testing
    port: process.env.DB_PORT, // Database port for testing
    dialect: "postgres", // Database dialect (PostgreSQL)
    dialectOptions: {
      ssl: false,
    },
  },
  // Configuration for the production environment
  production: {
    username: process.env.DB_USERNAME, // Database username for production
    password: process.env.DB_PASSWORD, // Database password for production
    database: process.env.DB_NAME, // Database name for production
    host: process.env.DB_HOST, // Database host for production
    port: process.env.DB_PORT, // Database port for production
    dialect: "postgres", // Database dialect (PostgreSQL)
    dialectOptions: {
      ssl: {
        require: true, // SSL is required in production
        rejectUnauthorized: true,
      },
    },
  },
};
