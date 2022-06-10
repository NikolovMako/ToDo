import App from "./app";
import LoginController from "./controllers/login";
import RegisterController from "./controllers/register";
import TodoController from "./controllers/toDo";

const app = new App(
  [new RegisterController(), new LoginController(), new TodoController()],
  parseInt(process.env.PORT)
);

app.listen();
