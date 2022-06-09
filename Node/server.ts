import App from "./app";
import RegisterController from "./controllers/register";

const app = new App([new RegisterController()], parseInt(process.env.PORT));

app.listen();
