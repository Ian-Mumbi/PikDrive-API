const express = require("express");
const {
  SupplierProduct,
  validateSupplierProduct,
} = require("../models/supplier-product");
const { Product } = require("../models/product");
const { Supplier } = require("../models/supplier");

const router = express.Router();

router.get("/productSupplier", async (req, res) => {
  const items = await SupplierProduct.find()
    .populate("product")
    .populate("supplier");

  const itemsFiltered = items.filter((item) => {
    if (item.product && item.supplier) {
      return item;
    }
  });

  // Delete all the invalid data
  const itemsID = items.map((item) => item.id);
  const itemsFilteredID = itemsFiltered.map((item) => item.id);

  itemsID.forEach(async (id) => {
    if (!itemsFiltered.includes(id)) {
      await SupplierProduct.findByIdAndRemove(id);
    }
  });

  res.send(itemsFiltered);
});

router.post("/productSupplier", async (req, res) => {
  const result = validateSupplierProduct(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const supplierProduct = new SupplierProduct(req.body);

  // Check validity of ID product and supplier saving
  const product = await Product.findById(supplierProduct.product);
  const supplier = await Supplier.findById(supplierProduct.supplier);

  if (!product || !supplier)
    return res.status(400).send("Invalid product or supplier ID provided!");

  await supplierProduct.save();

  res.status(201).send(supplierProduct);
});

router.delete("/productSupplier/:id", async (req, res) => {
  const id = req.params.id;
  const productSupplier = await SupplierProduct.findByIdAndRemove(id);

  if (!productSupplier)
    return res.status(404).send(`Product-Supplier with id of ${id} not found.`);

  res.status(200).send(productSupplier);
});

module.exports = router;
