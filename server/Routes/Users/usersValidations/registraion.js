const Joi = require("Joi");

function validateRegistration(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: Joi.string().min(8).max(1024).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=(?:\D*\d){4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    biz: Joi.boolean(),
    isAdmin: Joi.boolean(),
    address: Joi.string().min(6).max(255),
    phone: Joi.string()
    .min(10)
    .max(11)
    .required()
    .regex(/^0[2-9]\d{0,1}[ ,-]{0,1}\d{7,8}$/),
    bank: Joi.string(),
    bankNumber: Joi.string(),
  });

  return schema.validate(user);
}

module.exports = validateRegistration;
