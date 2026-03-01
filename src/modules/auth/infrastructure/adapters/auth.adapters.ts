import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLogin } from '../../domain/entities/user-login.interface';
import { UserPasswordReset } from '../../domain/entities/user-password-reset.interface';
import { UserRegister } from '../../domain/entities/user-register.interface';
import { UserResponse } from '../../domain/entities/user-response.class';
import { UserAlreadyExistsException } from '../../domain/exceptions/auth.exception';
import { AuthRepository } from '../../domain/ports/auth.repository';
import type { BcryptRepository } from '../../domain/ports/bcrypt.repository';
import type { TokenRepository } from '../../domain/ports/token.repository';
import { UserSchema } from '../persistence/typeorm/user.schema';

@Injectable()
export class AuthAdapter implements AuthRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly authRepository: Repository<UserSchema>,
    @Inject('BcryptRepository')
    private readonly bcryptRepository: BcryptRepository,
    @Inject('TokenRepository')
    private readonly tokenRepository: TokenRepository,
  ) {}

  async loginUser(user: UserLogin): Promise<UserResponse> {
    const userExist = await this.authRepository.findOneBy({
      email: user.email,
    });

    if (!userExist) {
      throw new NotFoundException();
    }
    const decryptedPassword = await this.bcryptRepository.compare(
      user.password,
      userExist.password,
    );
    if (userExist && !decryptedPassword) {
      throw new UnauthorizedException();
    }
    const token = await this.tokenRepository.generate({
      email: userExist.email,
    });
    return { ...userExist, token: token };
  }
  async registerUser(user: UserRegister): Promise<UserSchema> {
    const userExist = await this.authRepository.findOneBy({
      email: user.email,
    });
    console.log(userExist);
    if (!userExist) {
      const schema = await this.authRepository.save(user);
      return { ...schema };
    } else {
      throw new UserAlreadyExistsException();
    }
  }

  async resetPassword(user: UserPasswordReset): Promise<UserResponse> {
    if (!this.tokenRepository.verify(user.token)) {
      throw new UnauthorizedException();
    }
    const userFound = await this.authRepository.findOne({
      where: { email: user.email },
    });
    if (!userFound) throw new NotFoundException();
    userFound.password = await this.bcryptRepository.hash(user.password);
    const userModified = await this.authRepository.save(userFound);
    return {
      id: userModified.id,
      email: userModified.email,
      name: userModified.name,
      token: await this.tokenRepository.generate({ email: userFound.email }),
    };
  }
}
