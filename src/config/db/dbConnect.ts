import mongoose from "mongoose"
import { config } from "../env.const"

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(config.mongodb_uri, {
    });

    console.log(`connected successfully with ${db.connection.host}`);
  } catch (error: any) {
    console.error(`error ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect
