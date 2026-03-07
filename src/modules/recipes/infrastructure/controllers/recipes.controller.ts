import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from 'src/shared/infrastructure/guards/jwt-auth.guard';
import { RecipeMapper } from 'src/shared/infrastructure/persistence/recipe.mapper';
import { RemoveRecipeDTO } from '../../application/dto/remove-recipe.dto';
import { SaveRecipeDTO } from '../../application/dto/save-recipe.dto';
import { RemoveRecipeUseCase } from '../../application/use-cases/remove-recipe.use-case';
import { SaveRecipeUseCase } from '../../application/use-cases/save-recipe.use-case';

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly saveRecipeUseCase: SaveRecipeUseCase,
    private readonly removeRecipeUseCase: RemoveRecipeUseCase,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post('save-recipe')
  public async saveRecipe(@Body() body: SaveRecipeDTO, @Res() res: Response) {
    const recipe = RecipeMapper.fromAIToDomain(body.recipe);
    const response = await this.saveRecipeUseCase.execute(recipe, body.userId);
    res.json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-recipe')
  public async removeRecipe(
    @Body() body: RemoveRecipeDTO,
    @Res() res: Response,
  ) {
    const response = await this.removeRecipeUseCase.execute(
      body.recipeId,
      body.userId,
    );
    res.json(response);
  }
}
