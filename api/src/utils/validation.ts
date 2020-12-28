//VAIDATION
import Joi from '@hapi/joi';

//Register Validation
export const registerValidation = (data: object) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

//Login Validation
export const loginValidation = (data: object) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

//Register Validation
export const updateValidation = (data: object) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(6).required().email(),
    position: Joi.string().min(1).required(),
    pictureUrl: Joi.string().min(1).required().uri(),
  });

  return schema.validate(data);
};
