import { Inject, Injectable } from '@nestjs/common';
import { UserResponse } from '../../domain/entities/user-response.class';
import type { AuthRepository } from '../../domain/ports/auth.repository';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(body: LoginDTO): Promise<UserResponse> {
    const user = await this.authRepository.loginUser({
      ...body,
    });
    return new UserResponse(user);
  }
}
