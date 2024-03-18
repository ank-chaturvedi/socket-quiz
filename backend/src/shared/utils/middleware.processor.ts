import { Request, Response, NextFunction } from "express";
import { errorProcessor } from "./response.processor";

type AsyncFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const middlewareProcessor = (fn: AsyncFn) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      errorProcessor(res, error);
    }
  };
};
