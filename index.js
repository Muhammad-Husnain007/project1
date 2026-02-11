// server.js
import { env } from "./config/extra/env.config.js";
import logger from "./config/extra/logger.config.js";
import MongoConnection from "./config/mongodb/connection.mongo.js";
import { app } from "./src/app.js";

MongoConnection()
  .then(() => {
    app.listen(env.PORT, () => {
      logger.info(`Server running at http://localhost:${env.PORT}`);
      logger.info("Admin panel: http://localhost:3000/admin");
    });
  })
  .catch((err) => {
    logger.error("Error in DB connect", err);
  });
