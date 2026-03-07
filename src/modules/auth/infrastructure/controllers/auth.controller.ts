import {
  Body,
  Controller,
  Headers,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from 'src/shared/infrastructure/guards/jwt-auth.guard';
import { LoginDTO } from '../../application/dto/login.dto';
import { PasswordResetDTO } from '../../application/dto/password-reset.dto';
import { RecoveryDTO } from '../../application/dto/recovery.dto';
import { RegisterDTO } from '../../application/dto/register.dto';
import { SessionDTO } from '../../application/dto/session.dto';
import { CheckSessionUseCase } from '../../application/use-cases/check-session.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RecoveryPasswordUseCase } from '../../application/use-cases/recovery-password.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { ResetPasswordUseCase } from '../../application/use-cases/reset-password.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly recoveryPasswordUseCase: RecoveryPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly checkSessionUseCase: CheckSessionUseCase,
  ) {}
  @Post('login')
  public async login(@Body() body: LoginDTO, @Res() res: Response) {
    const response = await this.loginUseCase.execute(body);
    res.json(response);
  }
  @Post('register')
  public async register(@Body() body: RegisterDTO, @Res() res: Response) {
    const response = await this.registerUseCase.execute(body);
    res.json(response);
  }

  @Post('recovery')
  public async recoveryPassword(
    @Body() body: RecoveryDTO,
    @Res() res: Response,
  ) {
    const response = await this.recoveryPasswordUseCase.execute(body);
    res.json({ status: response });
  }
  @Post('reset')
  @UseGuards(JwtAuthGuard)
  public async resetPasswordEmail(
    @Body() body: PasswordResetDTO,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const response = await this.resetPasswordUseCase.execute(body, token);
    res.json(response);
  }

  @Post('session')
  @UseGuards(JwtAuthGuard)
  public async session(@Body() body: SessionDTO, @Res() res: Response) {
    const response = await this.checkSessionUseCase.execute(body);
    res.json(response);
  }
}
