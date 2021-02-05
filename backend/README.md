# Moove Unified UI backend

## Description

A backend application for Unified UI. Uses NestJS framework.

## Installation

```bash
$ npm install
```

## Running the app locally

Create a copy of `.env.example` and rename it to `.env`, then set appropriate environment variables.

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

## Local development with Docker

Create a copy of `.env.example` and rename it to `.env`, then set appropriate environment variables.

### Install dependencies locally

```bash
$ npm install
```

### Run the API via docker-compose

```bash
# watch mode
$ npm run docker:start:dev

# debug mode
$ npm run docker:start:debug
```

After that API should become available on `localhost` on the port specified in `.env` file
