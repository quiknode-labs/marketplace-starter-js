# qn-js-add-on

This repo is an example of how to build a QuickNode Marketplace add-on using node.js, Express.js, and sequelize with PostgreSQL.


## Getting Started

1. Pull this repo locally.
2. `npm install`
3. Copy and fill .env: `cp .env.example .env`
4. Create database: `npx sequelize-cli db:create`
5. Run migrations: `npx sequelize-cli db:migrate --migrations-path src/migrations`
6. Run seeders to have test data in development env: `npx sequelize-cli db:seed:all  --seeders-path src/seeders`
7. Run `npm start`


## Using qn-marketplace-cli for testing

You can use the [qn-marketplace-cli](https://github.com/quiknode-labs/qn-marketplace-cli) tool to quickly test your add-on while developing it.

To obtain a basic auth string, you can use Ruby or your language of choice with your username and password, as such:

```ruby
Base64.encode64("luc:password")
```

PUDD:

```sh
./qn-marketplace-cli pudd --base-url http://localhost:3030/provisioning --basic-auth bHVjOnBhc3N3b3Jk\n
```

SSO:

```sh
./qn-marketplace-cli sso --basic-auth bHVjOnBhc3N3b3Jk\n --url http://localhost:3030/provisioning/provision --jwt-secret jwt-secret
```

RPC:

```sh
./qn-marketplace-cli rpc --url http://localhost:3030/provisioning/provision --rpc-method qn_test --rpc-url http://localhost:3030/rpc  --rpc-params "[\"abc\"]" --basic-auth bHVjOnBhc3N3b3Jk\n
```
