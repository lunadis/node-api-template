const Joi = require('joi');

module.exports = {
  createUserSchema: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
  }),
};
