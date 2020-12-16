//VAIDATION
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {

  const schema = Joi.object({
    // role: Joi.string().min(5).required(),
    name: Joi.string().min(5).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {

  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data);
};

//Register Validation
const updateValidation = (data) => {

  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(6).required().email(),
    position: Joi.string().min(1).required(),
    pictureUrl: Joi.string().min(1).required().uri(),
  })

  return schema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;