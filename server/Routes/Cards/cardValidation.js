const Joi = require("joi");

function validateCard(card) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    url: Joi.string().min(6).max(1024),
    alt: Joi.string().min(2).max(256),
    category: Joi.string().min(2).max(256).required(),
    subcategory: Joi.string().min(2).max(256).required(),
    price: Joi.string().min(4).max(256).required(),
    sold: Joi.number().required(),
    ship: Joi.string().min(4).max(256).required(),
    returnfree: Joi.string().required(),
    numFeatures: Joi.number().required(),
    feature1: Joi.string().allow(""),
    feature2: Joi.string().allow(""),
    feature2price: Joi.string().min(4).max(256).allow(""),
    feature3: Joi.string().allow(""),
    feature3price: Joi.string().min(4).max(256).allow(""),
    feature4: Joi.string().allow(""),
    feature4price: Joi.string().min(4).max(256).allow(""),
    feature5: Joi.string().allow(""),
    feature5price: Joi.string().min(4).max(256).allow(""),
    numColors: Joi.number().required(),
    color1: Joi.string().allow(""),
    color2: Joi.string().allow(""),
    url2: Joi.string().min(6).max(1024).allow(""),
    alt2: Joi.string().min(2).max(256).allow(""),
    color3: Joi.string().allow(""),
    url3: Joi.string().min(6).max(1024).allow(""),
    alt3: Joi.string().min(2).max(256).allow(""),
    color4: Joi.string().allow(""),
    url4: Joi.string().min(6).max(1024).allow(""),
    alt4: Joi.string().min(2).max(256).allow(""),
    color5: Joi.string().allow(""),
    url5: Joi.string().min(6).max(1024).allow(""),
    alt5: Joi.string().min(2).max(256).allow(""),
    quantity: Joi.number().integer().min(1).required(),
    sellerId: Joi.string().required(),
  });
  return schema.validate(card);
}

exports.validateCard = validateCard;
