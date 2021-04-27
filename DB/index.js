const mongoose = require("mongoose");
const logger = require("../log/logger");

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
    .then(() => logger.info("Connected to MongoDB..."));
};
