import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      currentUser: any;
    }
  }
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).send("Not authenticated");
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(500).send({ message: `Internal error ${err}` });
  }
  if (!decodedToken) {
    return res.status(401).send("Not authenticated");
  }
  req.currentUser = decodedToken.userId;
  next();
};

export default auth;
