const logger = require("./log/logger");
const app = require("./server");

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  logger.info(`Server running on port ${port}!`)
);

module.exports = server;
