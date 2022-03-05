import jwt from "jsonwebtoken";

//allows me to user req.user in the requests handlers.

declare global {
  namespace Express {
    export interface Request {
      isAuthorized: boolean;
    }
  }
}
