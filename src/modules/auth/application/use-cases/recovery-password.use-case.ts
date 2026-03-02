import { Inject, Injectable } from '@nestjs/common';
import type { AuthRepository } from '../../domain/ports/auth.repository';

@Injectable()
export class RecoveryPasswordUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(body: { email: string }): Promise<boolean> {
    return await this.authRepository.recoveryPassword(body);
  }
}
