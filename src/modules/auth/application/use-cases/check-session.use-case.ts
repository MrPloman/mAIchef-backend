import { Inject, Injectable } from '@nestjs/common';
import { UserResponse } from '../../domain/entities/user-response.class';
import type { AuthRepository } from '../../domain/ports/auth.repository';
import { SessionDTO } from '../dto/session.dto';

@Injectable()
export class CheckSessionUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(body: SessionDTO, token: string): Promise<UserResponse> {
    const _user = await this.authRepository.checkSession({
      email: body.email,
      token,
    });
    return _user;
  }
}
