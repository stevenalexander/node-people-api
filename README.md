# Node People API

[![BuildStatus](https://travis-ci.org/stevenalexander/node-people-api.svg?branch=master)](https://travis-ci.org/stevenalexander/node-people-api?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Simple [Express](https://expressjs.com/) RESTful API for People data.

Using as part of testing various build/containerisation PoCs.

## Requires

* [Node](https://nodejs.org/en/)
* [Docker](https://www.docker.com/) (optional)

## Run

```
npm install

# Start PostGres container
# docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres

# Setup DB
npm run migrations

# available http://localhost:3001/people
npm start
```

### Run in container

```
# Spin up PostGres and node-people-api containers
docker-compose up
```

## Test

```
npm test
```

## API Documentation

The API is documented using [API Blueprint](https://apiblueprint.org/) at `PeopleApi.apib` and a friendly static HTML version is generated using [aglio](https://github.com/danielgtaylor/aglio) which is available on at URL `/documentation.html`.

The documentation is be updated for changes by:

```
npm install -g aglio
aglio -i PeopleApi.apib --theme-template triple -o app/documentation/documentation.html
```

The `PeopleApi.apib` file can be used by [various tools](https://apiblueprint.org/tools.html) to aid with testing or generating clients.

## Notes

* used `npm shrinkwrap` to fix dependency versions
* added `wait-for-postgres.sh` script to poll container using `knex migrate:currentVersion` before running migration scripts, avoiding the need to call migration scripts outside container
