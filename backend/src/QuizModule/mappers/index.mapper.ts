import { Request } from "express";
import { CreateRoomDto } from "../dtos/createRoom.dto";

export class IndexMapper {
  req: Request;

  constructor(req: Request) {
    this.req = req;
  }

  getCreateRoomDto() {
    const { name, description, joinType } = this.req.body;
    return new CreateRoomDto(name, description, joinType);
  }
}
