import dotenv from "dotenv";
dotenv.config();
import mongoose, { ConnectOptions } from "mongoose";
import logger from "./logger";
import constants from "../utils/constants";

const { TEST } = constants.environments;
const { MONGO_URL, MONGO_URL_TEST } = process.env;

export default async (): Promise<void> => {
  try {
    const url =
      process.env.NODE_ENV === TEST
        ? (MONGO_URL_TEST as string)
        : (MONGO_URL as string);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    logger.info("DB connected successfully");
  } catch (err) {
    console.log(err);
    logger.error("DB connection not successful");
  }
};
