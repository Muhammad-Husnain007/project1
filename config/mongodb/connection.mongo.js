import mongoose from 'mongoose';
import { DB_NAME } from './name.mongo.js';
import logger from '../extra/logger.config.js';
import { env } from '../extra/env.config.js';

const MongoConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${env.MONGODB_URL}${DB_NAME}`)
    logger.info(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    logger.info("MONGODB connection FAILED ", error);
    process.exit(1)
  }
};

export default MongoConnection;