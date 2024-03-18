import { NextFunction, Request, Response } from "express";
import { AuthBearerStrategy } from "../strategies/auth.strategy";
import { IUserTokenPayload } from "../types/token.type";
import User from "../models/user";
import { UnAuthorizedAccess } from "../utils/apiError";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const authStrategy = new AuthBearerStrategy<IUserTokenPayload>();
  const payload: IUserTokenPayload = await authStrategy.verify(token);
  const user = await User.findOne().byEmail(payload.email);

  if (!user) {
    throw new UnAuthorizedAccess();
  }

  req["user"] = user;
  next();
};
