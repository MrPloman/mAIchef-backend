import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLogin } from '../../domain/entities/user-login.interface';
import { UserRegister } from '../../domain/entities/user-register.interface';
import { UserResponse } from '../../domain/entities/user-response.interface';
import { User } from '../../domain/entities/user.entity';
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
    if (
      !userExist ||
      (await !this.bcryptRepository.compare(user.password, userExist.password))
    ) {
      throw new ForbiddenException();
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
  async resetPassword(user: UserLogin): Promise<UserResponse> {
    return await {
      ...new User('', '', '', '', new Date(), new Date()),
      token: '',
    };
  }
}
