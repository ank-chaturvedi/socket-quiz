import { MissingAuthorizationHeader } from "../utils/apiError";
import { JwtTokenStrategy, TokenStrategy } from "./token.strategy";

interface AuthStrategy {
  verify(...args: unknown[]): unknown;
}

export class AuthBearerStrategy<T> implements AuthStrategy {
  strategy: TokenStrategy<T>;
  constructor(strategy = new JwtTokenStrategy<T>()) {
    this.strategy = strategy;
  }
  async verify(token: string): Promise<T> {
    if(!token) {
      throw new MissingAuthorizationHeader();
    }
    const [type, value] = token.split(" ");

    if (type !== "Bearer") {
      throw new MissingAuthorizationHeader();
    }

    return await this.strategy.verify(value);
  }
}
