import moment from "moment";
import bcrypt from "bcrypt";

export const getExpiryDate = (hours: number) => {
  const currentDate = moment();
  const expiryTime = currentDate.add(hours, "hours");
  return expiryTime.toDate();
};

export const encryptPassword = async (password: string) => {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
};

export const comparePassword = async (password: string, hashedPass: string) => {
  const isMatch = await bcrypt.compare(password, hashedPass);
  return isMatch;
};
