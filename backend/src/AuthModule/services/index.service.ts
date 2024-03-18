import User, { UserDocument } from "../../shared/models/user";
import { TokenService } from "../../shared/services/token.service";
import { IUserTokenPayload } from "../../shared/types/token.type";
import { UnAuthorizedAccess } from "../../shared/utils/apiError";
import { CreateUserDto } from "../dtos/createUser.dto";
import { LoginDto } from "../dtos/login.dto";

export class IndexService {
  async createUser(createUserDto: CreateUserDto) {
    const encryptedPassword = await createUserDto.getEncryptedPassword();
    const user = new User({
      email: createUserDto.getEmail(),
      password: encryptedPassword,
    });

    return await user.save();
  }

  async validateCredentials(loginDto: LoginDto) {
    const user = await User.findByEmailAndPassword(
      loginDto.getEmail(),
      loginDto.getPassword()
    );
    if (!user) {
      throw new UnAuthorizedAccess();
    }

    return user;
  }

  async generateTokens(user: UserDocument, payload: IUserTokenPayload) {
    const service = new TokenService<IUserTokenPayload>();
    const accessToken = await service.generate(payload, "1h");
    const refreshToken = await service.generate(payload, "7d");
    user.refreshToken = refreshToken;
    await user.save();
    return {
      accessToken,
      refreshToken,
      expiresIn: 60 * 60 * 24,
    };
  }
}
