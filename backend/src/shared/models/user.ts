import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
} from "mongoose";
import { comparePassword } from "../utils/helpers";

export interface IUser {
  email: string;
  password: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  isPasswordMatch(password: string): Promise<boolean>;
}

interface UserQueryHelpers {
  byEmail(
    email: string
  ): QueryWithHelpers<
    HydratedDocument<IUser>[],
    HydratedDocument<IUser>,
    UserQueryHelpers
  >;
}

interface UserModel extends Model<IUser, UserQueryHelpers, IUserMethods> {
  findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserDocument | null>;
}

const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    refreshToken: String,
  },
  {
    timestamps: true,
    query: {
      byEmail(email: string) {
        return this.findOne({ email });
      },
    },
  }
);

schema.virtual("id").get(function () {
  return this._id;
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
    return ret;
  },
});

schema.methods.isPasswordMatch = async function (password: string) {
  return await comparePassword(password, this.password);
};

schema.statics.findByEmailAndPassword = async function (
  email: string,
  password: string
): Promise<IUser | null> {
  const user = await this.findOne({ email });
  if (!user) return null;
  const matched = await user.isPasswordMatch(password);
  if (!matched) return null;
  return user;
};

const User = model<IUser, UserModel>("User", schema);

export type UserDocument = HydratedDocument<IUser>;
export default User;
