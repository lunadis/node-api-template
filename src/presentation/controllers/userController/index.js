const { createUserSchema } = require('../../validators/schemas/user.schemas');
const validator = require('../../validators');
const {
  createUser,
} = require('../../../application/handlers/user/user.handler');

module.exports = function (app) {
  'use strict';
  return {
    createUser: (req, res) => {
      validator(app, req, res, createUserSchema, createUser);
    },
  };
};
