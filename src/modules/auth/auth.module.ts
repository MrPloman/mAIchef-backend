import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.user-case';
import { AuthAdapter } from './infrastructure/adapters/auth.adapters';
import { BcryptAdapter } from './infrastructure/adapters/bcrypt.adapter';
import { JwtTokenAdapter } from './infrastructure/adapters/jwt.adapter';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { UserSchema } from './infrastructure/persistence/typeorm/user.schema';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
const AUTH_USE_CASES = [LoginUseCase, RegisterUseCase, ResetPasswordUseCase];
@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    ...AUTH_USE_CASES,
    { provide: 'AuthRepository', useClass: AuthAdapter },
    { provide: 'TokenRepository', useClass: JwtTokenAdapter },
    { provide: 'BcryptRepository', useClass: BcryptAdapter },
  ],
  exports: [TypeOrmModule, JwtModule],
})
export class AuthModule {}
