import { JwtTokenStrategy, TokenStrategy } from "../strategies/token.strategy";
import { ITokenPayload } from "../types/token.type";

export class TokenService<T = ITokenPayload> {
  private strategy: TokenStrategy<T>;
  constructor(strategy = new JwtTokenStrategy<T>()) {
    this.strategy = strategy;
  }

  async generate(payload: T, expiresIn: string) {
    return await this.strategy.generate(payload, expiresIn);
  }

  async verify(token: string) {
    return await this.strategy.verify(token);
  }
}
