import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_EXPIRES } = process.env;

//generates jwt access token from user Id.
const generateAccessToken = (email: string): string => {
  return jwt.sign({ email }, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES,
  });
};

export { generateAccessToken };
