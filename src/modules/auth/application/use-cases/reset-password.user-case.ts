import { Inject, Injectable } from '@nestjs/common';
import { UserResponse } from '../../domain/entities/user-response.class';
import type { AuthRepository } from '../../domain/ports/auth.repository';
import { RegisterDTO } from '../dto/register.dto';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(body: RegisterDTO): Promise<UserResponse> {
    return await this.authRepository.loginUser(body);
  }
}
