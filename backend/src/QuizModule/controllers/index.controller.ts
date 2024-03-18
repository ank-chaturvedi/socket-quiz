import { Request, Response } from "express";
import MainController from "../../shared/application/main.controller";
import SuccessDTO from "../../shared/application/success.dto";
import { IndexMapper } from "../mappers/index.mapper";
import { IndexService } from "../services/index.service";
import { UserDocument } from "../../shared/models/user";

export class IndexController extends MainController {
  mapper: IndexMapper;
  service: IndexService;
  authUser: UserDocument;

  constructor(req: Request, res: Response) {
    super(req, res);
    this.authUser = req["user"];
    this.mapper = new IndexMapper(req);
    this.service = new IndexService(this.authUser);
  }

  async postCreateRoom() {
    const createRoomDto = this.mapper.getCreateRoomDto();
    const room = await this.service.createRoom(createRoomDto);
    return new SuccessDTO(room.toJSON(), "Room created successfully");
  }
}
