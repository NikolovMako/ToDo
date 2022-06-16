import App from "./app";
import LoginController from "./controllers/login";
import RegisterController from "./controllers/register";
import TodoController from "./controllers/toDo";
import UserController from "./controllers/user";

const app = new App(
  [
    new RegisterController(),
    new LoginController(),
    new TodoController(),
    new UserController(),
  ],
  parseInt(process.env.PORT)
);

app.listen();
