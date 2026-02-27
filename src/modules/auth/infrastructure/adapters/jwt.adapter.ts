// infrastructure/adapters/jwt-token.adapter.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from '../../domain/ports/token.repository';

@Injectable()
export class JwtTokenAdapter implements TokenRepository {
  constructor(private readonly jwtService: JwtService) {}

  generate(payload: object): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): object | null {
    try {
      return this.jwtService.verify(token);
    } catch {
      return null;
    }
  }
}
