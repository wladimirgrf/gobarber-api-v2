<h1 align="center">
  <img alt="Logo" src=".github/assets/logo.svg" width="200px">
</h1>

<h3 align="center">
  Express Application for GoBarber project
</h3>

<p align="center">The best way to schedule your service!</p>

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

## 👨🏻‍💻  About

This api provides everything needed to organize appointments for a Barber Shop.

Customers can choose the best time available to them.

Providers can manage your appointments, organize your agenda and receive notifications about schedule changes.

To see the **web system**, click here: [GoBarber Web](https://github.com/wladimirgrf/gobarber-web)<br />
To see the **mobile app**, click here: [GoBarber Mobile](https://github.com/wladimirgrf/gobarber-mobile)

## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Date-fns](https://date-fns.org/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Husky](https://github.com/typicode/husky)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Getting started



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

# To finish, run the api service
$ yarn dev:server

# Project is started!
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
$ git clone your-fork-url && cd gobarber-api

# Create a branch with your feature
$ git checkout -b new-feature

# Make the commit with your changes
$ git commit -m 'feat: New feature'

# Send the code to your remote branch
$ git push origin new-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
