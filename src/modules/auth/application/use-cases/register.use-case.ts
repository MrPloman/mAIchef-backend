import { Inject, Injectable } from '@nestjs/common';
import { UserResponse } from '../../domain/entities/user-response.class';
import type { AuthRepository } from '../../domain/ports/auth.repository';
import type { BcryptRepository } from '../../domain/ports/bcrypt.repository';
import type { TokenRepository } from '../../domain/ports/token.repository';
import { RegisterDTO } from '../dto/register.dto';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
    @Inject('TokenRepository')
    private readonly tokenRepository: TokenRepository,
    @Inject('BcryptRepository')
    private readonly bcryptRepository: BcryptRepository,
  ) {}

  async execute(body: RegisterDTO): Promise<UserResponse> {
    const password = await this.bcryptRepository.hash(body.password);
    const token = await this.tokenRepository.generate({ email: body.email });
    const user = await this.authRepository.registerUser({ ...body, password });
    return new UserResponse({ ...user, token });
  }
}
