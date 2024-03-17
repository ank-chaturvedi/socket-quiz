import { body } from "express-validator";
import { JoinType } from "../../shared/enums/room.enum";

const checkInviteType = (value: string) => {
  const allowedTypes = Object.values(JoinType);
  const exists = allowedTypes.find((joinType) => joinType === value);

  if (!exists) {
    throw new Error(`Join Type can only be [${allowedTypes}]`);
  }

  return true;
};
export const postCreateRoom = [
  body("name", "Name is required, it should be between 1 and 24 characters")
    .isString()
    .trim()
    .isLength({ min: 1, max: 24 }),
  body("description", "Description is required").isString().trim().notEmpty(),
  body("joinType").custom(checkInviteType),
];
