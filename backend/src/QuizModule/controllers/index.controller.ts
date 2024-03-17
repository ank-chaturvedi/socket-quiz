import { Request, Response } from "express";
import MainController from "../../shared/application/main.controller";
import SuccessDTO from "../../shared/application/success.dto";
import { IndexMapper } from "../mappers/index.mapper";
import { IndexService } from "../services/index.service";

export class IndexController extends MainController {
  mapper: IndexMapper;
  service: IndexService;

  constructor(req: Request, res: Response) {
    super(req, res);
    this.mapper = new IndexMapper(req);
    this.service = new IndexService();
  }

  async postCreateRoom() {
    const createRoomDto = this.mapper.getCreateRoomDto();
    const room = await this.service.createRoom(createRoomDto);
    return new SuccessDTO(room.toJSON(), "Room created successfully");
  }
}
