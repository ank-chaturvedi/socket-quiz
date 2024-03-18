import express, { Application } from "express";

import connect from "./shared/database/connect";
import QuizIndexRoute from "./QuizModule/index.route";
import AuthIndexRoute from "./AuthModule/index.route";
import { responseProcessor } from "./shared/utils/response.processor";
import { RouteNotFound } from "./shared/utils/apiError";
import { middlewareProcessor } from "./shared/utils/middleware.processor";
import { checkAuth } from "./shared/middlewares/auth.middleware";

export class AppServer {
  app: Application;

  constructor() {
    this.app = express();
    this.init();
    this.connectDatabase();
    this.setupController();
  }

  init() {
    this.app.use(express.json());
  }

  connectDatabase() {
    connect();
  }
  setupController() {
    this.app.use("/api/rooms", middlewareProcessor(checkAuth), new QuizIndexRoute().router);
    this.app.use("/api/auth", new AuthIndexRoute().router);
    this.app.use(
      responseProcessor(async () => {
        throw new RouteNotFound();
      })
    );
  }
}

export default new AppServer().app;
