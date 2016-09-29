FROM node:6.5.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN export NODE_ENV=production
RUN npm install

EXPOSE 3001

HEALTHCHECK CMD curl --fail http://localhost:3001/people/status || exit 1

CMD ./wait-for-mysql.sh && node_modules/.bin/knex migrate:latest --env development && npm start