const errorHandler = require("../middleware/errorHandler");
const testRoute = require("../routes/home");
const productsRoute = require("../routes/products");
const suppliersRoute = require("../routes/suppliers");
const ordersRoute = require("../routes/orders");
const suppliersProducts = require("../routes/supplier-product");

module.exports = (app) => {
  app.use("/api/test", testRoute);
  app.use("/api", productsRoute);
  app.use("/api", suppliersRoute);
  app.use("/api", ordersRoute);
  app.use("/api", suppliersProducts);
  // Error handlers
  app.use(errorHandler);
};
