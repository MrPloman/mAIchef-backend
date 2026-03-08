import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { CheckSessionUseCase } from './application/use-cases/check-session.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RecoveryPasswordUseCase } from './application/use-cases/recovery-password.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.use-case';
import { AuthAdapter } from './infrastructure/adapters/auth.adapter';
import { BcryptAdapter } from './infrastructure/adapters/bcrypt.adapter';
import { MailAdapter } from './infrastructure/adapters/mail.adapter';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { UserSchema } from './infrastructure/persistence/typeorm/user.schema';
const AUTH_USE_CASES = [
  LoginUseCase,
  RegisterUseCase,
  RecoveryPasswordUseCase,
  ResetPasswordUseCase,
  CheckSessionUseCase,
];
@Module({
  imports: [TypeOrmModule.forFeature([UserSchema]), SharedModule],
  controllers: [AuthController],
  providers: [
    ...AUTH_USE_CASES,
    { provide: 'AuthRepository', useClass: AuthAdapter },
    { provide: 'BcryptRepository', useClass: BcryptAdapter },
    { provide: 'MailRepository', useClass: MailAdapter },
  ],
  exports: [],
})
export class AuthModule {}
