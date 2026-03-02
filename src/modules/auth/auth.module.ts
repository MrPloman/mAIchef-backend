import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckSessionUseCase } from './application/use-cases/check-session.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RecoveryPasswordUseCase } from './application/use-cases/recovery-password.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.use-case';
import { AuthAdapter } from './infrastructure/adapters/auth.adapter';
import { BcryptAdapter } from './infrastructure/adapters/bcrypt.adapter';
import { JwtTokenAdapter } from './infrastructure/adapters/jwt.adapter';
import { MailAdapter } from './infrastructure/adapters/mail.adapter';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { UserSchema } from './infrastructure/persistence/typeorm/user.schema';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
const AUTH_USE_CASES = [
  LoginUseCase,
  RegisterUseCase,
  RecoveryPasswordUseCase,
  ResetPasswordUseCase,
  CheckSessionUseCase,
];
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
    { provide: 'MailRepository', useClass: MailAdapter },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
