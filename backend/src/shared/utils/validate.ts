import { validationResult } from "express-validator";
import { errorProcessor } from "./response.processor";
import { InvalidParameter } from "./apiError";

export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const error = new InvalidParameter(
      errors.array({
        onlyFirstError: true,
      })
    );

    errorProcessor(res, error);
  };
};
