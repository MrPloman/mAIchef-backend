import { Inject, Injectable } from '@nestjs/common';
import { UserPasswordReset } from '../../domain/entities/user-password-reset.interface';
import { UserResponse } from '../../domain/entities/user-response.class';
import type { AuthRepository } from '../../domain/ports/auth.repository';

@Injectable()
export class RecoveryPasswordUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(body: UserPasswordReset): Promise<UserResponse> {
    return await this.authRepository.resetPassword(body);
  }
}
