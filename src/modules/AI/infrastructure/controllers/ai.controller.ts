import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { OptionalJwtAuthGuard } from 'src/modules/auth/infrastructure/guards/optional-jwt-auth.guard';
import { GenerateRecipeUseCase } from 'src/modules/recipes/application/use-cases/generate-recipe.use-case';
import { SaveRecipeUseCase } from 'src/modules/recipes/application/use-cases/save-recipe.use-case';
import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import { RecipeMapper } from 'src/shared/infrastructure/persistence/recipe.mapper';
import { RecipePromptDTO } from '../../application/dto/recipe-prompt.dto';
import { PromptRecipeUseCase } from '../../application/use-cases/prompt-recipe.use-case';

@Controller('ai')
export class AIController {
  constructor(
    private readonly generateRecipeUseCase: PromptRecipeUseCase,
    private readonly saveRecipeUseCase: SaveRecipeUseCase,
    private readonly generateRecipeInstanceUseCase: GenerateRecipeUseCase,
  ) {}
  @UseGuards(OptionalJwtAuthGuard)
  @Post('generate')
  async generateRecipe(@Body() body: RecipePromptDTO, @Res() res: Response) {
    const aiRecipes: RecipeEntity[] =
      await this.generateRecipeUseCase.execute(body);
    let parsedRecipes: RecipeEntity[] = await Promise.all(
      aiRecipes.map(async (recipe) => {
        const _recipe =
          await this.generateRecipeInstanceUseCase.execute(recipe);
        return RecipeMapper.fromSchematoDomain(_recipe);
      }),
    );
    return res.json(
      parsedRecipes.map((recipe) =>
        RecipeMapper.fromDomainToClientResponse(recipe),
      ),
    );
    // THIS IS GONNA BE COMMENTED OUT LATER, JUST FOR TESTING PURPOSES
    // const storedRecipes: RecipeSchema[] = await Promise.all(
    //   aiRecipes.map((recipe: RecipeEntity) => {
    //     return this.saveRecipeUseCase.execute(recipe);
    //   }),
    // );
    return res.json(parsedRecipes);
  }
  @Post('replan')
  public async replanRecipe() {
    return 'entra again';
  }
}
