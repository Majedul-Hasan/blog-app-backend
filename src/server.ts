import http from "http";
import dbConnect from "@infra/database/mongoose/dbConnect";
import config from "@shared/config/env.const";
import app from "@app/app";

const PORT = config.port || 5001;

const startServer = async () => {
  try {
    await dbConnect();

    const server = http.createServer(app).listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.log("Failed to start server:", error);
    process.exit(1);
  }
};


if (process.env.NODE_ENV !== "production") {
  startServer();
}