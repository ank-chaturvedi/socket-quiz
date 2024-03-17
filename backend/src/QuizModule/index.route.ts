import { IndexController } from "./controllers/index.controller";
import { MainRoute } from "../shared/application/main.route";
import { validate } from "../shared/utils/validate";
import { postCreateRoom } from "./validators/index.chain";

class IndexRoute extends MainRoute {
  constructor() {
    super(IndexController);
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post(
      "",
      validate(postCreateRoom),
      this.attach("postCreateRoom")
    );
  }
}

export default IndexRoute;
