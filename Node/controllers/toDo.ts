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
    this.router.get(`${this.path}/:id`, auth, this.getTodoById);
    this.router.put(`${this.path}/:id`, auth, this.editTodo);
    this.router.delete(`${this.path}/:id`, auth, this.deleteTodo);
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
  async editTodo(req: Request, res: Response, next: NextFunction) {
    const descrId = req.params.id;
    const description = req.body.description;

    try {
      const descriptionToEdit = await Todo.findByPk(descrId);
      descriptionToEdit.description = description;

      const newDescription = await descriptionToEdit.save();

      return res
        .status(200)
        .json({ message: "Edited description", newDescription });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Internal server error.\n\n${err}` });
    }
  }
  async getTodoById(req: Request, res: Response, next: NextFunction) {
    const descrId = req.params.id;

    try {
      const description = await Todo.findOne({
        where: { id: descrId },
        include: [User],
      });
      return res
        .status(200)
        .json({ message: "fetched description by id", description });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Internal server error.\n\n${err}` });
    }
  }
  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    const descrId = req.params.id;
    try {
      await Todo.destroy({ where: { id: descrId } });
      return res.status(200).json({ message: "deleted description" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Internal server error.\n\n${err}` });
    }
  }
}
