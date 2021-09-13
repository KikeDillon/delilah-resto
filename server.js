const express = require('express');
const userRouter = require('./routers/userRouter');

function makeServer() {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use(userRouter);

  return server;
}

module.exports = {
  makeServer,
};