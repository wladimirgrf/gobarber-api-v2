<h1 align="center">
  <img alt="Logo" src=".github/assets/logo.svg" width="200px">
</h1>

<h3 align="center">
  Express Application for GoBarber project
</h3>

<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/wladimirgrf/gobarber-api?color=%23FF9000">

  <a href="https://github.com/wladimirgrf/gobarber-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/wladimirgrf/gobarber-api?color=%23FF9000">
  </a>

  <a href="https://github.com/wladimirgrf/gobarber-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/wladimirgrf/gobarber-api?color=%23FF9000">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/wladimirgrf/gobarber-api?color=%23FF9000">
</p>

<p id="insomniaButton" align="center">
  <a href="https://insomnia.rest/run/?label=GoBarber&uri=https://raw.githubusercontent.com/wladimirgrf/gobarber-api/master/.github/insomnia/insomnia.json"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"/></a>
</p>

## 🌍 Ecosystem

Below the technologies, used to build this API:

|                      Name                                   |                         Status                          |
|:-----------------------------------------------------------:|:-------------------------------------------------------:|
|<img height="44" src=".github/assets/nodejs.svg"> | <img alt="node version" src="https://img.shields.io/badge/nodejs-v12.18-blue?color=%23FF9000"> |
|<img height="41" src=".github/assets/express.svg"> | <img alt="express version" src="https://img.shields.io/badge/express-v4.17.1-blue?color=%23FF9000"> |
|<img height="48" src=".github/assets/jwt.svg"> | <img alt="jwt version" src="https://img.shields.io/badge/jwt-v8.5.1-blue?color=%23FF9000"> |
|<img height="55" src=".github/assets/typeorm.png"> | <img alt="typeorm version" src="https://img.shields.io/badge/typeorm-v0.2.25-blue?color=%23FF9000"> |
|<img height="48" src=".github/assets/redis.svg"> | <img alt="redis version" src="https://img.shields.io/badge/redis-v3.0.2-blue?color=%23FF9000"> |
|<img height="44" src=".github/assets/mongodb.svg"> | <img alt="mongodb version" src="https://img.shields.io/badge/mongodb-v3.6.0-blue?color=%23FF9000"> |
|<img height="48" src=".github/assets/typescript.svg"> | <img alt="typescript version" src="https://img.shields.io/badge/typescript-v3.9.3-blue?color=%23FF9000"> |
|<img height="48" src=".github/assets/eslint.svg"> | <img alt="eslint version" src="https://img.shields.io/badge/eslint-v6.0.8-blue?color=%23FF9000"> |
|<img height="48" src=".github/assets/prettier.svg"> | <img alt="prettier version" src="https://img.shields.io/badge/prettier-v2.0.5-blue?color=%23FF9000"> |


## 💻 Getting started

Start with [Run in Insomnia](#insomniaButton) or import the [`insomnia.json`](.github/insomnia/insomnia.json) on Insomnia App.

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)
- One instance of [Redis](https://redis.io/)
- One instance of [MongoDB](https://www.mongodb.com/)

> Obs.: I recommend Docker

**Clone the project and access the folder**

```bash
$ git clone https://github.com/wladimirgrf/gobarber-api.git && cd gobarber-api
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
# The aws variables do not need to be filled for dev environment
$ cp .env.example .env

# Create the instance of postgreSQL using docker
$ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Create the instance of mongoDB using docker
$ docker run --name mongodb -p 27017:27017 -d -t mongo

# Create the instance of redis using docker
$ docker run --name redis -p 6379:6379 -d -t redis:alpine

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# Start the api service
$ yarn dev:server
```

## 🤝 Contributing

**Fork the repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork wladimirgrf/gobarber-api
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone fork-url && cd gobarber-api

# Create a branch for your edits
$ git checkout -b new-feature

# Make the commit with your changes
$ git commit -m 'feat: New feature'

# Send the code to your remote branch
$ git push origin new-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
