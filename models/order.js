const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
  },
});

module.exports = {
  Order: mongoose.model("order", orderSchema),
  validateOrder: (order) => {
    const schema = Joi.object({
      orderNumber: Joi.string().max(45).required(),
      count: Joi.number().allow(null, ""),
    });

    return schema.validate(order);
  },
};
