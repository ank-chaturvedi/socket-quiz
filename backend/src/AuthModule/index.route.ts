import { IndexController } from "./controllers/index.controller";
import { MainRoute } from "../shared/application/main.route";
import { validate } from "../shared/utils/validate";
import { postSignup } from "./validators";

class IndexRoute extends MainRoute {
  constructor() {
    super(IndexController);
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post("/login", this.attach("postLogin"));
    this.router.post(
      "/signup",
      validate(postSignup),
      this.attach("postSignup")
    );
  }
}

export default IndexRoute;
