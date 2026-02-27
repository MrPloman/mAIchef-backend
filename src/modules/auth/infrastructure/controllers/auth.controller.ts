import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { LoginDTO } from '../../application/dto/login.dto';
import { RegisterDTO } from '../../application/dto/register.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
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
}
