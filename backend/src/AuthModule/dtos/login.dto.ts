export class LoginDto {
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

  toObject() {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
