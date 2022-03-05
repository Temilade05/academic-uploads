import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";

/**
 * Ensures a user is signed in
 */
const requireSignIn: RequestHandler = async (req, res, next) => {
  //get bearer token from request header
  let token = req.headers.authorization;

  //if token does not exist
  if (!token) {
    return next(new AppError("Authentication is required", 400));
  }

  //if token is not bearer token
  if (!token.startsWith("Bearer")) {
    return next(new AppError("Invalid Token", 400));
  }
  token = token.split(" ")[1];

  try {
    //verify the token and get the user id
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (err, decoded: any) => {
        if (err) {
          return next(new AppError("Invalid or expired token", 400));
        }
        const { email } = decoded;

        if (email !== process.env.ADMIN_EMAIL) {
          return next(
            new AppError("YOu're not authorized to use this route", 403)
          );
        }

        req.isAuthorized = true;
        next();
      }
    );
  } catch (err) {
    return next(err);
  }
};

export { requireSignIn };
