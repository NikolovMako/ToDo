import { NextFunction, Request, Response, Router } from "express";
import { AbstractController } from "../AbstractController";
import auth from "../middleware/auth";
import { User } from "../models/user";

export default class UserController extends AbstractController {
  path = "/user";
  router = Router();

  constructor() {
    super();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get(`${this.path}/me`, auth, this.getMe);
  }
  async getMe(req: Request, res: Response, next: NextFunction) {
    const currentUser = req.currentUser;
    const user = await User.findByPk(currentUser);
    if (user) {
      return res
        .status(200)
        .json({ message: "Fetched user me succesfully", user });
    }
    return res.status(500).send({ message: "Internal server error" });
  }
}
