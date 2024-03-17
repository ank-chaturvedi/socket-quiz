import express, { Application } from "express";
import connect from "./shared/database/connect";
import QuizIndexRoute from "./QuizModule/index.route";
import { responseProcessor } from "./shared/utils/response.processor";
import { RouteNotFound } from "./shared/utils/apiError";
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
    this.app.use("/api/rooms", new QuizIndexRoute().router);
    this.app.use(responseProcessor(async () => {
      console.log('is comming');
      throw new RouteNotFound();
    }));
  }
}

export default new AppServer().app;
