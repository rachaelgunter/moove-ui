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

### Execute DB migrations in Docker container

```bash
# create migrations (without immediate execution)
$ npm run docker:migrate:create

# create and execute (apply this on first local run)
$ npm run docker:migrate
```

### Installing packages while developing with Docker

Run this command to make changes in node_modules available in docker container:

```bash
$ npm run docker:rebuild-volumes
```

### Generate application_default_credentials.json

1.  Go https://console.cloud.google.com.
2.  choose project "moove-platform-lineate-dev".
3.  Choose "IAM & Admin" in sidebar.
4.  Choose "Service Accounts" in sidebar.
5.  Click table row with column name "App Engine default service account".
6.  Go to tab "KEYS".
7.  Click button "ADD KEY".
8.  Choose "Create new key".
9.  Choose "json type" (recomended).
10. Create.

Or you can try this [link](https://console.cloud.google.com/iam-admin/serviceaccounts/details/107913221646435328542?authuser=2&project=moove-platform-lineate-dev)

After you click "Create" you download .json file with your key. Rename it to "application_default_credentials.json" and put in root of backend folder.
