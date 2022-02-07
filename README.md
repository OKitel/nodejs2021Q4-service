<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

This application is a [Trello](https://trello.com/) competitor. It can be used for managing tasks and boards. Backend is written in [Typescript](https://www.typescriptlang.org/) and uses [Nest](https://github.com/nestjs/nest). It may be used on every type of OS because it works inside isolated [Docker](https://www.docker.com/) containers. Data is stored inside [PostgreSQL](postgresql.org) database.

## Downloading

```sh
git clone https://github.com/OKitel/nodejs2021Q4-service.git
```

## Installation

```bash
$ npm install
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

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```sh
npm test
```

To run only one of all test suites (users, boards or tasks)

```sh
npm test <suite name>
```

To run all test with authorization

```sh
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```sh
npm run test:auth <suite name>
```

### Auto-fix and format

```sh
npm run lint
```

## Docker 🐳

This application is using docker compose file to declare and build images. Also it creates user defined network between containers.
To run the entire app use the next command in your terminal in the project root directory

```sh
docker compose up
```

This command will build containers with app and postgreSQL database.

When containers start, the application waits for the Postgres container to start first.

If you want to keep your terminal free of logs you may use the next command

```sh
docker compose up -d
```

To see logs from the container in the detached mode use

```sh
docker compose logs -f
```

If any error occurs container will be automatically restarted.

Logs and data are stored outside containers (in volumes), that is why they will be saved even if you delete images from your PC and then rebuild it again.

Nodemon watches after changes inside _src_ directory and will rebuild containers.

There is no need to rebuild images after changes inside .env file.

To stop containers use

```sh
docker compose stop
```

To stop and delete containers use

```sh
docker compose down
```

To delete images from your PC use

```sh
docker image rm <image ID>
```

The image of this app is in private Docker Hub repository [okitel/rsschool-nodejs-service](https://hub.docker.com/repository/docker/okitel/rsschool-nodejs-service).

To launch tests you need to install all dependencies into the root directory. There are no tests inside docker containers.

# Performance comparison table Nestjs/express vs Nestjs/fastify

This table was made based on [artillery](https://www.artillery.io/) reports.

| Data                       | Express                        | Fastify                        |
| -------------------------- | ------------------------------ | ------------------------------ |
| http.requests              | 3630                           | 3630                           |
| http.responses             | 3630                           | 3630                           |
| http.response_time(median) | 108.9                          | 102.5                          |
| http.response_time(min)    | 3                              | 4                              |
| http.response_time(max)    | 345                            | 319                            |
| Status Codes [code:count]  | [200:2178] [201:726] [204:726] | [200:2178] [201:726] [204:726] |

## Nestjs/Express

### Summary report Express

```none
--------------------------------
Summary report @ 22:42:50(+0100)
--------------------------------

http.codes.200: ................................................................ 2178
http.codes.201: ................................................................ 726
http.codes.204: ................................................................ 726
http.request_rate: ............................................................. 50/sec
http.requests: ................................................................. 3630
http.response_time:
  min: ......................................................................... 3
  max: ......................................................................... 345
  median: ...................................................................... 108.9
  p95: ......................................................................... 169
  p99: ......................................................................... 186.8
http.responses: ................................................................ 3630
vusers.completed: .............................................................. 726
vusers.created: ................................................................ 726
vusers.created_by_name.Test Users CRUD: ........................................ 726
vusers.session_length:
  min: ......................................................................... 192.8
  max: ......................................................................... 664.7
  median: ...................................................................... 424.2
  p95: ......................................................................... 497.8
  p99: ......................................................................... 550.1
```

## Nestjs/Fastify

### Summary report Fastify

```none
--------------------------------
Summary report @ 23:12:24(+0100)
--------------------------------

http.codes.200: ................................................................ 2178
http.codes.201: ................................................................ 726
http.codes.204: ................................................................ 726
http.request_rate: ............................................................. 50/sec
http.requests: ................................................................. 3630
http.response_time:
  min: ......................................................................... 4
  max: ......................................................................... 319
  median: ...................................................................... 102.5
  p95: ......................................................................... 190.6
  p99: ......................................................................... 210.6
http.responses: ................................................................ 3630
vusers.completed: .............................................................. 726
vusers.created: ................................................................ 726
vusers.created_by_name.Test Users CRUD: ........................................ 726
vusers.session_length:
  min: ......................................................................... 219.3
  max: ......................................................................... 693.1
  median: ...................................................................... 459.5
  p95: ......................................................................... 528.6
  p99: ......................................................................... 584.2
```
