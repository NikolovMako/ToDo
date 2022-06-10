import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { AbstractController } from "../AbstractController";
import { ITodo, IUser } from "../interfaces";
import auth from "../middleware/auth";
import { Todo } from "../models/toDo";
import { User } from "../models/user";

export default class TodoController extends AbstractController {
  path = "/todo";
  router = Router();

  constructor() {
    super();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post(
      this.path,
      auth,
      body("description")
        .trim()
        .isLength({ min: 5, max: 255 })
        .withMessage(
          "Description should be at least 5 characters long and 255 maximum"
        ),
      this.createTodo
    );
    this.router.get(this.path, auth, this.getTodo);
  }

  async createTodo(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const description = req.body.description;
    const currentUser = req.currentUser;
    const user = await User.findByPk(currentUser);

    const todo = new Todo({
      description,
      userId: user.id,
    });
    todo.save();

    if (todo) {
      return res
        .status(200)
        .json({ message: "Todo created succesfully", user });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
  async getTodo(req: Request, res: Response, next: NextFunction) {
    const toDo = await Todo.findAll({ include: [User] });
    if (toDo) {
      return res
        .status(200)
        .json({ message: "fetched todos succesfully", toDo });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
