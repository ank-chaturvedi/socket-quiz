import { Request } from "express";
import { CreateUserDto } from "../dtos/createUser.dto";
import { LoginDto } from "../dtos/login.dto";
export class IndexMapper {
  private req: Request;
  constructor(req: Request) {
    this.req = req;
  }

  getCreateUserDto() {
    const { email, password } = this.req.body;
    return new CreateUserDto(email, password);
  }

  getLoginDto() {
    const { email, password } = this.req.body;
    return new LoginDto(email, password);
  }
}
