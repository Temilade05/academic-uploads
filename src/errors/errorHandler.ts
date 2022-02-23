import { Request, Response, NextFunction } from "express";
import { deleteImageFromCloudinary } from "../utils/cloudinaryUpload";
import logger from "../utils/logger";
import AppError from "./AppError";

const { NODE_ENV } = process.env;
const DEVELOPMENT = "development";

const errorMiddleWare = async (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // if an error occurs, delete uploaded file from cloudinary bucket bucket

  if (req.file) {
    deleteImageFromCloudinary(req.file.path);
  }

  if (req.files) {
    const files = req.files as Express.Multer.File[];
    for (const file of files) {
      deleteImageFromCloudinary(file.path);
    }
  }

  const body: any = {};
  body.status = "error";
  body.message = error.message;

  if (NODE_ENV === DEVELOPMENT) {
    body.error = error.stack;
  }

  // if status code is not set, set it to 500
  if (!error.statusCode) {
    error.statusCode = 500;
  }

  if (NODE_ENV !== DEVELOPMENT && error.statusCode >= 500) {
    error.message = "Something went very wrong";
  }
  logger.error(error.message);
  res.status(error.statusCode).json(body);
  return;
};

export default errorMiddleWare;
