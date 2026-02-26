import { Inject, Injectable } from '@nestjs/common';
import { UserResponse } from '../../domain/entities/user-response.interface';
import type { AuthRepository } from '../../domain/ports/auth.repository';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(body: LoginDTO): Promise<UserResponse> {
    //     const domainData = AuthMapper.toDomain(body);
    return await this.authRepository.loginUser(body);
  }
}
