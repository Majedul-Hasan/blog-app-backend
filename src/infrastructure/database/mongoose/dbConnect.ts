import mongoose from 'mongoose';
import { config } from '../../../shared/config/env.const';
import logger from '@infra/logging/logger';

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(config.mongodb_uri, {});

    logger.info(`connected successfully with ${db.connection.host}`);
  } catch (error: any) {
    logger.error(`error ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
