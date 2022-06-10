import { NextFunction, Request, Response, Router } from "express";
import { AbstractController } from "../AbstractController";
import { IUser, Roles } from "../interfaces";
import { User } from "../models/user";
import { body, validationResult } from "express-validator";
import * as argon from "argon2";

export default class RegisterController extends AbstractController {
  path = "/register";
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
        body("name")
          .trim()
          .isLength({ min: 3, max: 20 })
          .withMessage("Name is requiered"),
        body("password")
          .trim()
          .isLength({ min: 5, max: 20 })
          .withMessage("Password is requiered"),
        body("confirmPassword")
          .trim()
          .isLength({ min: 5, max: 20 })
          .withMessage("Password is requiered"),
      ],
      this.register
    );
    this.router.get(this.path, this.getUser);
  }
  async register(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { email, name, password, confirmPassword } = req.body;

    const hash = await argon.hash(password);

    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match!" });
    }

    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      return res
        .status(422)
        .send({ message: "User with this email already exists" });
    }

    const user = new User({
      email,
      name,
      password: hash,
      role: Roles.USER,
    });

    try {
      user.save();
      return res.status(200).json({
        message: "User succesfully created",
        user,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: `Internal server error.\n\n${err}` });
    }
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    const user = await User.findAll();
    return res.status(200).json({ user });
  }
}
