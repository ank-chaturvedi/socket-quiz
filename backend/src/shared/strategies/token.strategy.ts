import jwt from "jsonwebtoken";

import CONFIG from "../../config";

export interface TokenStrategy<T> {
  generate(payload: T, expiresIn: string): Promise<string>;
  verify(token: string): Promise<T>;
}

export class JwtTokenStrategy<T> implements TokenStrategy<T> {
  async generate(
    payload: T,
    expiresIn: string = CONFIG.JWT_EXPIRES_IN
  ): Promise<string> {
    const sign = await jwt.sign(payload as object, process.env.JWT_SECRET, {
      expiresIn,
    });

    return sign;
  }

  async verify(token: string): Promise<T> {
    const decoded: T = await new Promise((resolve, reject) => {
      jwt.verify(token, CONFIG.JWT_SECRET, (err, decoded: T) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    return decoded;
  }
}
