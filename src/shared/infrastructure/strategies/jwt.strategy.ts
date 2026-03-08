// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET ?? configService.get<string>('JWT_SECRET')!,
    });
  }

  // Si el token es válido, este método recibe el payload decodificado
  async validate(payload: any) {
    // const user = await this.userRepository.findById(payload.sub);

    return { userId: payload.sub, email: payload.email };
  }
}
