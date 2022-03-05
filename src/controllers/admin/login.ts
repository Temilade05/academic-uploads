import { RequestHandler } from "express";
import AppError from "../../errors/AppError";
import successResponse from "../../utils/successResponse";
import { generateAccessToken } from "../../utils/token";

const login: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;

  const isvalid =
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD;

  if (!isvalid) return next(new AppError("Invalid username or password", 400));

  const accessToken = generateAccessToken(email);
  return successResponse(res, 200, "Login successful", { accessToken });
};

export default login;
