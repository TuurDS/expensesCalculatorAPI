const { sequelize } = require("./models");
async function initializeData() {
  await sequelize.authenticate();
}

async function shutdownData() {
  const logger = getChildLogger("database");

  logger.info("Shutting down database connection");
  await sequelize.close();
  logger.info("Database connection closed");
}

module.exports = {
  initializeData,
  shutdownData,
};
