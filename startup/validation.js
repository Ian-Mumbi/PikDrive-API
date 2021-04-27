const Joi = require("joi");

module.exports = () => {
  Joi.objectId = require("joi-objectid")(Joi); // add a method to Joi for validating objectId's
};
