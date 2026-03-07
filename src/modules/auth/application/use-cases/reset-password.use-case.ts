import { Inject, Injectable } from '@nestjs/common';
import { UserPasswordReset } from '../../domain/entities/user-password-reset.interface';
import { UserResponse } from '../../domain/entities/user-response.class';
import type { AuthRepository } from '../../domain/ports/auth.repository';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(body: UserPasswordReset, token: string): Promise<UserResponse> {
    return await this.authRepository.resetPassword(body, token);
  }
}
