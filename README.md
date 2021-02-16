# Backend Chaincode E-Budgeting

## Description

Backend service for e-budgeting with blockchain network using Nest JS and Hyperledger Fabric.

## Directory Structure

- api <br>
  RESTful API using NestJS.
- chaincode <br>
  Fabric chaincode location.
- network <br>
  Blockchain network configuration.
- explorer <br>
  Hyperledger explorer configuration.

## API Development

### Installation

```bash
$ cd api

$ npm install
```

### Setup network

```bash
$ cd network

# up
$ ./startFabric.sh

# down
$ ./networkDown.sh
```

### Running the app

```bash
$ cd api

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
$ cd api

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Docs URL

> http://localhost:3000/docs

## Hyperledger Explorer URL

> http://localhost:8080
> <br>
> username: exploreradmin
> <br>
> password: exploreradminpw
