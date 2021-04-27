const express = require("express");
const { Supplier, validateSupplier } = require("../models/supplier");

const router = express.Router();

router.get("/suppliers", async (req, res) => {
  const suppliers = await Supplier.find({});
  res.status(200).send(suppliers);
});

router.get("/suppliers/:id", async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) return res.status(404).send("No supplier with that ID!");
  res.status(200).send(supplier);
});

router.post("/suppliers", async (req, res) => {
  const result = validateSupplier(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const supplier = new Supplier(req.body);

  await supplier.save();

  res.status(201).send(supplier);
});

router.delete("/suppliers/:id", async (req, res) => {
  const id = req.params.id;
  const supplier = await Supplier.findByIdAndRemove(id);

  if (!supplier)
    return res.status(404).send(`Supplier with id of ${id} not found.`);

  res.send(supplier);
});

module.exports = router;
