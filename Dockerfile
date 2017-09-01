FROM node:8.4.0-wheezy

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN yarn install
RUN yarn add global pm2

COPY . /usr/src/app

CMD pm2 start server.js