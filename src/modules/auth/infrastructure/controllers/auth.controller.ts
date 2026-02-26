import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { LoginDTO } from '../../application/dto/login.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}
  @Post('login')
  public async login(@Body() body: LoginDTO, @Res() res: Response) {
    const response = await this.loginUseCase.execute(body);
    res.json(response);
  }
}
