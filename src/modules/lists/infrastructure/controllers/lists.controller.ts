import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from 'src/shared/infrastructure/guards/jwt-auth.guard';
import { AddRecipeToListDTO } from '../../application/dto/add-recipe-to-list.dto';
import { CreateListDTO } from '../../application/dto/create-list.dto';
import { GetAllUserListstDTO } from '../../application/dto/get-all-user-lists.dto';
import { RemoveListDTO } from '../../application/dto/remove-list.dto';
import { RemoveRecipeFromListDTO } from '../../application/dto/remove-recipe-from-list.dto';
import { UpdateListDTO } from '../../application/dto/update-list.dto';
import { AddRecipeToListUseCase } from '../../application/use-cases/add-recipe-to-list.use-case';
import { CreateListUseCase } from '../../application/use-cases/create-list.use-case';
import { GetAllUserListsUseCase } from '../../application/use-cases/get-all-user-lists.use-case';
import { RemoveListUseCase } from '../../application/use-cases/remove-list.use-case';
import { RemoveRecipeFromListUseCase } from '../../application/use-cases/remove-recipe-from-list.use-case';
import { UpdateListUseCase } from '../../application/use-cases/update-list.use-case';

@Controller('lists')
export class ListsController {
  constructor(
    private readonly getAllUserListsUseCase: GetAllUserListsUseCase,
    private readonly createListUseCase: CreateListUseCase,
    private readonly addRecipeToListUseCase: AddRecipeToListUseCase,
    private readonly updateListUseCase: UpdateListUseCase,

    private readonly removeRecipeFromListUseCase: RemoveRecipeFromListUseCase,
    private readonly removeListUseCase: RemoveListUseCase,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('all')
  public async getAllUserLists(
    @Body() body: GetAllUserListstDTO,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const response = await this.getAllUserListsUseCase.execute(body, token);
    res.json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('list')
  public async create(
    @Body() body: CreateListDTO,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const response = await this.createListUseCase.execute(body, token);
    res.json(response);
  }
  @UseGuards(JwtAuthGuard)
  @Put('list')
  public async updateList(
    @Body() body: UpdateListDTO,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const response = await this.updateListUseCase.execute(body, token);
    res.json(response);
  }
  @UseGuards(JwtAuthGuard)
  @Post('recipe')
  public async addRecipe(
    @Body() body: AddRecipeToListDTO,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const response = await this.addRecipeToListUseCase.execute(body, token);
    res.json(response);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('recipe')
  public async deleteRecipe(
    @Body() body: RemoveRecipeFromListDTO,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const response = await this.removeRecipeFromListUseCase.execute(
      body,
      token,
    );
    res.json(response);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('list')
  public async delete(
    @Body() body: RemoveListDTO,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const response = await this.removeListUseCase.execute(body, token);
    res.json(response);
  }
}
