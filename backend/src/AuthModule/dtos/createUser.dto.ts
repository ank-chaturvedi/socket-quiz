import { encryptPassword } from "../../shared/utils/helpers";

export class CreateUserDto {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  async getEncryptedPassword() {
    return await encryptPassword(this.password);
  }

  toObject() {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
