const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('user', 'admin').required()
});

const vehicleSchema = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  price: Joi.number().required()
});

const pieceSchema = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  price: Joi.number().required()
});

module.exports = {
  userSchema,
  vehicleSchema,
  pieceSchema
};
