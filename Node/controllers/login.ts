import { NextFunction, Request, Response, Router } from "express";
import { AbstractController } from "../AbstractController";

export default class LoginController extends AbstractController {
  path = "/login";
  router = Router();

  constructor() {
    super();
    this.initializeRoutes();
  }
  initializeRoutes() {}
  async login(req: Request, res: Response, next: NextFunction) {}
}
