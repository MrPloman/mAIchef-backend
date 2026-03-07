import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { GenerateRecipeUseCase } from 'src/modules/recipes/application/use-cases/generate-recipe.use-case';
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
    private readonly generateRecipeInstanceUseCase: GenerateRecipeUseCase,
  ) {}
  @Post('generate')
  async generateRecipe(@Body() body: RecipePromptDTO, @Res() res: Response) {
    const aiRecipes: RecipeEntity[] =
      await this.generateRecipeUseCase.execute(body);
    const parsedRecipes: RecipeSchema[] = await Promise.all(
      aiRecipes.map((recipe) =>
        this.generateRecipeInstanceUseCase.execute(recipe),
      ),
    );
    return res.json(parsedRecipes);
  }
  @Post('replan')
  public async replanRecipe() {
    return 'entra again';
  }
}
