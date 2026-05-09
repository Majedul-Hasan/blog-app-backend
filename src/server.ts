import http from 'http';
import dbConnect from "@conf/db/dbConnect";
import config from "@conf/env.const";
import app from '@app/app';


const PORT = config.port || 5001;

const startServer = async () => {
  try {
    // Initialize database connection
    await dbConnect();

    // Create HTTP server
    const httpServer = http.createServer(app);
    // Start the server
    const server = httpServer.listen(PORT, "127.0.0.1", () => {
      console.log(`Server running on port ${PORT} click http://localhost:${PORT}/`);
    });

    // Handle graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down server...');
      server.close(async () => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.log('Failed to start server:', error)

    process.exit(1);
  }
};

startServer();

