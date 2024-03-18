import { body } from "express-validator";

export const postLogin = [
  body("email", "Email is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
];
