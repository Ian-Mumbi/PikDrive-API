const express = require("express");
const { Product, validateProduct } = require("../models/product");

const router = express.Router();

router.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.status(200).send(products);
});

router.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("No product with that ID!");
  res.status(200).send(product);
});

router.post("/products", async (req, res) => {
  const result = validateProduct(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const product = new Product(req.body);

  await product.save();

  res.status(201).send(product);
});

router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndRemove(id);

  if (!product)
    return res.status(404).send(`Product with id of ${id} not found.`);

  res.send(product);
});

module.exports = router;
