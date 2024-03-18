import { Request, Response, NextFunction } from "express";
import SuccessDTO from "../application/success.dto";
import { ApiError, BadRequest, ExpiredJWT } from "./apiError";
import { JsonWebTokenError } from "jsonwebtoken";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<SuccessDTO>;

export const errorProcessor = (res: Response, error) => {
  console.log(error);
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json(error.toResponseJson());
  }
  if (error instanceof JsonWebTokenError) {
    error = new ExpiredJWT();
    return res.status(error.statusCode).json(error.toResponseJson());
  }
  error = new BadRequest();
  return res.status(error.statusCode).json(error.toResponseJson());
};

export const responseProcessor = (asyncFn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFn(req, res, next))
      .then((response: SuccessDTO) => {
        return res.status(response.statusCode).json(response.toResponseJson());
      })
      .catch((error) => {
        return errorProcessor(res, error);
      });
  };
};
