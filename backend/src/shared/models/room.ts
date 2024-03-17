import { HydratedDocument, Model, Schema, Types, model } from "mongoose";
import { GameStatus, RoomStatus } from "../enums/room.enum";

interface IGame {
  _id: Types.ObjectId;
  gameId: Types.ObjectId;
  startedAt: Date;
  expiresAt: Date;
  status: GameStatus;
}

interface IRoom {
  name: string;
  description: string;
  joinType: string;
  expiresAt: Date;
  game: IGame;
  status: RoomStatus;
  createdAt: Date;
  updatedAt: Date;
}

type RoomModelOverrides = {
  game: Types.Subdocument<Types.ObjectId> & IGame;
};

type RoomModelType = Model<IRoom, unknown, RoomModelOverrides>;

const gameSchema = new Schema<IGame, RoomModelType>({
  gameId: { type: Schema.Types.ObjectId, required: true },
  startedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(GameStatus),
    required: true,
  },
});

const schema = new Schema<IRoom>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    joinType: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    game: gameSchema,
    status: {
      type: String,
      enum: Object.values(RoomStatus),
      required: true,
      default: RoomStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

schema.virtual("id").get(function () {
  return this._id;
});

schema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

const Room = model<IRoom>("Room", schema);

export default Room;
export type RoomDocument = HydratedDocument<IRoom, RoomModelOverrides>;
