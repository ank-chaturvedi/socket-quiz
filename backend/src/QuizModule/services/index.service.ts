import Room from "../../shared/models/room";
import { UserDocument } from "../../shared/models/user";
import { getExpiryDate } from "../../shared/utils/helpers";
import { CreateRoomDto } from "../dtos/createRoom.dto";

export class IndexService {
  private authUser: UserDocument;

  constructor(user: UserDocument) {
    this.authUser = user;
  }
  async createRoom(crateDto: CreateRoomDto) {
    const expiresAt = getExpiryDate(24);

    const room = new Room({
      ...crateDto.toObject(),
      expiresAt,
      createdBy: this.authUser._id
    });
    await room.save();
    return room;
  }
}
