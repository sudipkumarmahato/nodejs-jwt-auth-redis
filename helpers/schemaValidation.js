const Joi = require('joi');

const authSchema = Joi.object({
  username: Joi.string().lowercase().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

module.exports = authSchema;
