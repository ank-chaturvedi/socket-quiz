import { Request, Response } from "express";
import MainController from "../../shared/application/main.controller";
import SuccessDTO from "../../shared/application/success.dto";
import { IndexMapper } from "../mappers/index.mapper";
import { IndexService } from "../services/index.service";

export class IndexController extends MainController {
  private mapper: IndexMapper;
  private service: IndexService;

  constructor(req: Request, res: Response) {
    super(req, res);
    this.mapper = new IndexMapper(req);
    this.service = new IndexService();
  }

  async postSignup() {
    const createUserDto = this.mapper.getCreateUserDto();
    await this.service.createUser(createUserDto);
    return new SuccessDTO({}, "Sign Up successful");
  }

  async postLogin() {
    const loginDto = this.mapper.getLoginDto();
    const user = await this.service.validateCredentials(loginDto);
    const tokens = await this.service.generateTokens(user, {
      email: user.email,
    });
    return new SuccessDTO(tokens, "Login successful");
  }
}
