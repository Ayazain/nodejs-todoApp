const Joi = require("joi");
const AppError = require("../Utls/AppError");


signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10),
});

signUpMedelware = (req, res, next) => {
  const { error } = signUpSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 404, error.details));
  next();
};
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10),
  });
  
  loginMiddleWare = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return next(new AppError(error.message, 404));
    next();
  };

  module.exports ={loginMiddleWare , signUpMedelware};