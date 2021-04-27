const mongoose = require("mongoose");
const Joi = require("joi");

const supplierProductSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "supplier",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
});

module.exports = {
  supplierProductSchema,
  SupplierProduct: mongoose.model("supplierProduct", supplierProductSchema),
  validateSupplierProduct: (supplierProduct) => {
    const schema = Joi.object({
      supplier: Joi.objectId().required(),
      product: Joi.objectId().required(),
    });

    return schema.validate(supplierProduct);
  },
};
