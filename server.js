const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./startup/validation")();
require("express-async-errors");
require("./DB")();
require("./startup/routes")(app);

module.exports = app;
