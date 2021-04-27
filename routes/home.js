const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ success: "Welcome to my Pik drive code challenge API" });
});

module.exports = router;
