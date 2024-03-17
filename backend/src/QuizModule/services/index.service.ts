import Room from "../../shared/models/room";
import { getExpiryDate } from "../../shared/utils/helpers";
import { CreateRoomDto } from "../dtos/createRoom.dto";

export class IndexService {
    async createRoom(crateDto: CreateRoomDto) {
        const expiresAt = getExpiryDate(24);

        const room = new Room({
            ...crateDto.toObject(),
            expiresAt
        });
        await room.save();
        return room;
    }
}