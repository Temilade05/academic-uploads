import { Response } from "express";
import { PaginatedResult } from "./types";

const successResponse = (
  res: Response,
  status: number,
  message: string,
  data: any
) => {
  res.status(status).json({
    status: "success",
    message,
    data,
  });
};

export default successResponse;
