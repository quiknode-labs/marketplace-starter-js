# qn-js-add-on

This repo is an example of how to build a QuickNode Marketplace add-on using node.js, Express.js, and sequelize with PostgreSQL.


## Getting Started

1. Pull this repo locally.
2. `npm install`
3. Create database: `npx sequelize-cli db:create`
3. Run migrations: `npx sequelize-cli db:migrate --migrations-path src/migrations`
4. Run seeders to have test data in development env: `npx sequelize-cli db:seed:all  --seeders-path src/seeders`


