import { Inject, Injectable } from '@nestjs/common';
import { UserResponse } from '../../domain/entities/user-response.interface';
import type { AuthRepository } from '../../domain/ports/auth.repository';
import type { TokenPort } from '../../domain/ports/token.repository';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
    @Inject('TokenRepository')
    private readonly tokenRepository: TokenPort,
  ) {}

  async execute(body: LoginDTO): Promise<UserResponse> {
    //     const domainData = AuthMapper.toDomain(body);
    const user = await this.authRepository.loginUser(body);
    const token = await this.tokenRepository.generate({ user });
    return { ...user, token };
  }
}
