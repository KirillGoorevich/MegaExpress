const Joi = require("joi");

function validateOrder(order) {
  const schema = Joi.object({
    card: {
      image: {
        url: Joi.string().min(6).max(1024),
        alt: Joi.string().min(2).max(256),
      },
      name: Joi.string().min(2).max(256).required(),
      description: Joi.string().min(2).max(1024).required(),
      bizName: Joi.string().min(2).max(256),
      price: Joi.number().required(),
      ship: Joi.number().required(),
      returnfree: Joi.string().required(),
      sellerId: Joi.string().required(),
      cardId: Joi.string().required(),
    },
    data: {
      selectedFeature: Joi.string().required(),
      displayPrice: Joi.number().required(),
      displayColor: Joi.string().required(),
      selectedQuantity: Joi.number().required(),
      selectedCountry: Joi.string().required(),
      name: Joi.string().min(2).max(256).required().label("Name"),
      phone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),
      address: Joi.string().required().min(6).label("Business address"),
      cardNumber: Joi.string().regex(/^\d+$/).min(16).max(16).required().label("Card Number"),
      cardName: Joi.string().min(2).max(256).required().label("Cardholder Name"),
      validMonth: Joi.string().required(),
      validYear: Joi.string().required(),
      cvv: Joi.string().min(3).max(4).regex(/^\d+$/).required().label("CVV"),
    },
    date: Joi.string().required(),
    deliveryDate: Joi.string().required(),
  });
  return schema.validate(order);
}

exports.validateOrder = validateOrder;
