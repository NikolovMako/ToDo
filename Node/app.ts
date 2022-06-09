import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express, { Application } from "express";
import helmet from "helmet";
import { AbstractController } from "./AbstractController";
import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user";

export default class App {
  app: Application;
  port: number;

  constructor(controllers: Array<AbstractController>, port: number) {
    this.app = express();
    this.port = port;
    this.dbConnect();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
  }
  initializeMiddleware() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  initializeControllers(controllers: Array<AbstractController>) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  }
  public dbConnect() {
    const sequelizeConnection = new Sequelize({
      database: process.env.DB,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      dialect: "postgres",
      models: [User],
    });
    sequelizeConnection.authenticate();
  }
}
