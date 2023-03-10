import express from "express";
import "express-async-errors";
import routes from "./routes";
import { AppError } from "./errors/app-error";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use("/pokemon", routes);
  }

  errorHandler() {
    this.server.use((err, request, response, next) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
      }

      return response
        .status(500)
        .json({ message: `Internal server error - ${err.message}` });
    });
  }
}

export default new App().server;
