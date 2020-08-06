'use strict';

module.exports = app => {
  const { io } = app;
  io.of('/').route('default', io.controller.default.ping);
};
