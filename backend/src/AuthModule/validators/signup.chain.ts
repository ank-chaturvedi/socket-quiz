import { body } from "express-validator";
import User from "../../shared/models/user";

const checkEmail = async (value: string) => {
  const user = await User.findOne().byEmail(value);
  if (user) {
    throw new Error("Email already exists");
  }

  return true;
};

export const postSignup = [
  body("email", "Email is required").isEmail().custom(checkEmail),
  body("password", "Password is required").notEmpty(),
];
