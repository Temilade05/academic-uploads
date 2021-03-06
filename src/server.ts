import app from "./app";
import dotenv from "dotenv";
import logger from "./utils/logger";
import connectToMongo from "./utils/connectToMongo";

dotenv.config();
const PORT = parseInt(process.env.PORT as string);

const startServer = async () => {
  await connectToMongo();
  app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "test") {
      logger.info(`
                ################################################
                🛡️  Server listening on port: ${PORT} 🛡️
                ################################################
                SERVER IN ${process.env.NODE_ENV as string} MODE
              `);
    }
  });
};

startServer();
