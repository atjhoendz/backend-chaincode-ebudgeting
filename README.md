# Backend Chaincode E-Budgeting

## Description

Backend service for e-budgeting with blockchain network using Nest JS and Hyperledger Fabric.

## Installation

```bash
$ npm install
```

## Setup network

```bash
$ cd src/core

# up
$ ./startFabric.sh

# down
$ ./networkDown.sh
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Docs

> http://localhost:3000/docs
