const express = require("express");
const { Order, validateOrder } = require("../models/order");

const router = express.Router();

router.get("/orders", async (req, res) => {
  const orders = await Order.find({});
  res.status(200).send(orders);
});

router.get("/orders/top-sales", async (req, res) => {
  const orders = await Order.find({}).sort({ count: -1 }).limit(3);
  res.status(200).send(orders);
});

router.post("/orders", async (req, res) => {
  const result = validateOrder(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const order = new Order(req.body);

  await order.save();

  res.status(201).send(order);
});

router.delete("/orders/:id", async (req, res) => {
  const id = req.params.id;
  const order = await Order.findByIdAndRemove(id);

  if (!order) return res.status(404).send(`Order with id of ${id} not found.`);

  res.send(order);
});

module.exports = router;
