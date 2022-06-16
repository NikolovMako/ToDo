import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { AbstractController } from "../AbstractController";
import { User } from "../models/user";
import * as argon from "argon2";
import jwt from "jsonwebtoken";

export default class LoginController extends AbstractController {
  path = "/login";
  router = Router();

  constructor() {
    super();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post(
      this.path,
      [
        body("email").isEmail().trim().withMessage("Invalid email adress"),
        body("password")
          .trim()
          .isLength({ min: 5, max: 20 })
          .withMessage("Password is requiered"),
      ],
      this.login
    );
  }
  async login(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    try {
      if (!user) {
        return res.status(422).send({ message: "Invalid email adress" });
      }
      if (!(await argon.verify(user.password, password))) {
        return res.status(422).send({ message: "Password is incorrect" });
      }
      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      return res.status(200).json({
        token,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: `Internal server error.\n\n${err}` });
    }
  }
}
