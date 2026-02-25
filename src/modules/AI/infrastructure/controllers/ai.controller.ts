import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { OptionalJwtAuthGuard } from 'src/modules/auth/infrastructure/guards/optional-jwt-auth.guard';
import { SaveRecipeUseCase } from 'src/modules/recipes/application/use-cases/save-recipe.use-case';
import { RecipeSchema } from 'src/modules/recipes/infrastructure/persistence/typeorm/recipe.schema';
import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import { RecipePromptDTO } from '../../application/dto/recipe-prompt.dto';
import { PromptRecipeUseCase } from '../../application/use-cases/prompt-recipe.use-case';

@Controller('ai')
export class AIController {
  constructor(
    private readonly generateRecipeUseCase: PromptRecipeUseCase,
    private readonly saveRecipeUseCase: SaveRecipeUseCase,
  ) {}
  @UseGuards(OptionalJwtAuthGuard)
  @Post('generateRecipe')
  async generateRecipe(@Body() body: RecipePromptDTO, @Res() res: Response) {
    const aiRecipes: RecipeEntity[] =
      await this.generateRecipeUseCase.execute(body);

    // THIS IS GONNA BE COMMENTED OUT LATER, JUST FOR TESTING PURPOSES
    const storedRecipes: RecipeSchema[] = await Promise.all(
      aiRecipes.map((recipe: RecipeEntity) => {
        return this.saveRecipeUseCase.execute(recipe);
      }),
    );
    return res.json(storedRecipes);
  }
  @Post('replanRecipe')
  public async replanRecipe() {
    return 'entra again';
  }
}
