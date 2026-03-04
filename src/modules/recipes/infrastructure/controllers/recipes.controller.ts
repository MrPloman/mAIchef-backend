import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { SaveRecipeDTO } from '../../application/dto/save-recipe.dto';
import { SaveRecipeUseCase } from '../../application/use-cases/save-recipe.use-case';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly saveRecipeUseCase: SaveRecipeUseCase) {}
  @Post('save-recipe')
  public async saveRecipe(@Body() body: SaveRecipeDTO, @Res() res: Response) {
    const response = await this.saveRecipeUseCase.execute(
      body.recipe,
      body.userId,
    );
    res.json(response);
  }
}
