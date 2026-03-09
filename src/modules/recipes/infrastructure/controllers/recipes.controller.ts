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
import { RecipeMapper } from 'src/shared/infrastructure/persistence/recipe.mapper';
import { GetRecipeInformationDTO } from '../../application/dto/get-recipe-information.dto';
import { RemoveRecipeDTO } from '../../application/dto/remove-recipe.dto';
import { SaveRecipeDTO } from '../../application/dto/save-recipe.dto';
import { GetSavedRecipeUseCase } from '../../application/use-cases/get-saved-recipe.use-case';
import { GetSavedRecipesUseCase } from '../../application/use-cases/get-saved-recipes.use-case';
import { RemoveRecipeUseCase } from '../../application/use-cases/remove-recipe.use-case';
import { SaveRecipeUseCase } from '../../application/use-cases/save-recipe.use-case';
import { UpdateRecipeUseCase } from '../../application/use-cases/update-saved-recipe.use-case';

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly saveRecipeUseCase: SaveRecipeUseCase,
    private readonly updateRecipeUseCase: UpdateRecipeUseCase,
    private readonly removeRecipeUseCase: RemoveRecipeUseCase,
    private readonly getSavedRecipesUseCase: GetSavedRecipesUseCase,
    private readonly getSavedRecipeUseCase: GetSavedRecipeUseCase,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post('recipe')
  public async saveRecipe(
    @Body() body: SaveRecipeDTO,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const recipe = RecipeMapper.fromAIToDomain(body.recipe);
    const response = await this.saveRecipeUseCase.execute(
      recipe,
      body.userId,
      token,
    );
    res.json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('recipe')
  public async removeRecipe(
    @Body() body: RemoveRecipeDTO,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const response = await this.removeRecipeUseCase.execute(
      body.recipeId,
      body.userId,
      token,
    );
    if (response) res.json({ token: token, status: true });
  }
  @UseGuards(JwtAuthGuard)
  @Get('recipes')
  public async getAllUserRecipes(
    @Body() body: { userId: string },
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const response = await this.getSavedRecipesUseCase.execute(
      body.userId,
      token,
    );
    res.json({ recipes: response });
  }
  @UseGuards(JwtAuthGuard)
  @Get('recipe')
  public async getUserRecipe(
    @Body() body: GetRecipeInformationDTO,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const response = await this.getSavedRecipeUseCase.execute(
      body.userId,
      body.recipeId,
      token,
    );
    res.json(response);
  }
  @UseGuards(JwtAuthGuard)
  @Put('recipe')
  public async updateUserRecipe(
    @Body() body: SaveRecipeDTO,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const recipe = RecipeMapper.fromAIToDomain(body.recipe);
    const response = await this.updateRecipeUseCase.execute(
      recipe,
      body.userId,
      token,
    );
    res.json({ recipes: response });
  }
}
