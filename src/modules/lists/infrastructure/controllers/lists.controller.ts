import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from 'src/shared/infrastructure/guards/jwt-auth.guard';
import { CreateListDTO } from '../../application/dto/create-list.dto';
import { CreateListUseCase } from '../../application/use-cases/create-list.use-case';

@Controller('lists')
export class ListsController {
  constructor(private readonly createListUseCase: CreateListUseCase) {}
  @UseGuards(JwtAuthGuard)
  @Post('list')
  public async register(@Body() body: CreateListDTO, @Res() res: Response) {
    const token = '';
    const response = await this.createListUseCase.execute(body, token);
    res.json(response);
  }
}
