import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionInterface } from '../../domain/entities/session.interface';
import { UserLogin } from '../../domain/entities/user-login.interface';
import { UserPasswordReset } from '../../domain/entities/user-password-reset.interface';
import { UserRegister } from '../../domain/entities/user-register.interface';
import { UserResponse } from '../../domain/entities/user-response.class';
import { UserAlreadyExistsException } from '../../domain/exceptions/auth.exception';
import { AuthRepository } from '../../domain/ports/auth.repository';
import type { BcryptRepository } from '../../domain/ports/bcrypt.repository';
import type { MailRepository } from '../../domain/ports/mail.repository';
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
    @Inject('MailRepository')
    private readonly mailRepository: MailRepository,
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
    if (!userExist) {
      const schema = await this.authRepository.save(user);
      return { ...schema };
    } else {
      throw new UserAlreadyExistsException();
    }
  }

  async recoveryPassword(user: { email: string }): Promise<boolean> {
    const _user = await this.authRepository.findOneBy({ email: user.email });
    if (_user) {
      await this.mailRepository.send({
        email: user.email,
        subject: 'hey',
        content: '',
        template: 'reset-password',
        token: await this.tokenRepository.generate({ email: user.email }),
      });
      return await true;
    } else return await false;
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

  async checkSession(session: SessionInterface): Promise<UserResponse> {
    const _user = await this.authRepository.findOneBy({
      email: session.email,
    });
    if (!_user) throw new NotFoundException();
    const _token = await this.tokenRepository.verify(session.token);
    if (!_token) throw new ForbiddenException();
    return {
      email: _user.email,
      id: _user.id,
      name: _user.name,
      token: session.token,
    };
  }
}
