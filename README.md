# Quiz Backend API

## Setup ⚙️

```
$ git clone https://github.com/ehenon/quiz-backend-api.git
$ cd quiz-backend-api
$ npm i
$ cp .env.sample .env
```

Fill environment variables in `.env` file.

## Available commands 🔥

```
$ npm run lint
$ npm run test
$ npm run start:dev
$ npm run start:debug
$ npm run start
$ npm run build
$ npm run start:prod
```

## Run via Docker 🐋

Launch via Docker Compose:

```
$ docker-compose up -d
```

Launch via Docker Compose while rebuilding the image and forcing a fresh install of the dependencies:

```
$ docker-compose up -d -V --build
```

Once the container is running, you can access the app at `localhost:3000`.
