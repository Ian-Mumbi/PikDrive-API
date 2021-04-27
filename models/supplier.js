const mongoose = require("mongoose");
const Joi = require("joi");

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 45,
    required: true,
  },
});

supplierSchema.virtual("supplierProducts", {
  ref: "SupplierProduct",
  localField: "_id",
  foreignField: "supplier",
});

module.exports = {
  supplierSchema,
  Supplier: mongoose.model("supplier", supplierSchema),
  validateSupplier: (supplier) => {
    const schema = Joi.object({
      name: Joi.string().max(45).required(),
    });

    return schema.validate(supplier);
  },
};
