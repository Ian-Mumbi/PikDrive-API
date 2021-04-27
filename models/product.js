const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 45,
    required: true,
  },
  description: {
    type: String,
    maxlength: 45,
  },
  quantity: {
    type: Number,
  },
});

productSchema.virtual("supplierProducts", {
  ref: "SupplierProduct",
  localField: "_id",
  foreignField: "product",
});

module.exports = {
  productSchema,
  Product: mongoose.model("product", productSchema),
  validateProduct: (product) => {
    const schema = Joi.object({
      name: Joi.string().max(45).required(),
      description: Joi.string().max(45).allow(null, ""),
      quantity: Joi.number().allow(null, ""),
    });

    return schema.validate(product);
  },
};
