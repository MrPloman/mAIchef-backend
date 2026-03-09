import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { GenerateRecipeInstanceUseCase } from 'src/modules/recipes/application/use-cases/generate-recipe-instance.use-case';
import { SaveRecipeUseCase } from 'src/modules/recipes/application/use-cases/save-recipe.use-case';
import { RecipeSchema } from 'src/modules/recipes/infrastructure/persistence/typeorm/recipe.schema';
import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import { RecipeMapper } from 'src/shared/infrastructure/persistence/recipe.mapper';
import { GetSavedRecipeUseCase } from '../../../recipes/application/use-cases/get-saved-recipe.use-case';
import { RecipePromptDTO } from '../../application/dto/recipe-prompt.dto';
import { ReplanRecipePrompt } from '../../application/dto/replan-recipe-prompt.dto';
import { PromptRecipeUseCase } from '../../application/use-cases/prompt-recipe.use-case';
import { ReplanRecipeUseCase } from '../../application/use-cases/replan-recipe.use-case';

@Controller('ai')
export class AIController {
  constructor(
    private readonly generateRecipeUseCase: PromptRecipeUseCase,
    private readonly replanRecipeUseCase: ReplanRecipeUseCase,
    private readonly saveRecipeUseCase: SaveRecipeUseCase,
    private readonly getSavedRecipeUseCase: GetSavedRecipeUseCase,

    private readonly generateRecipeInstanceUseCase: GenerateRecipeInstanceUseCase,
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
  public async replanRecipe(
    @Body() body: ReplanRecipePrompt,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const token = auth?.replace('Bearer ', '');
    const _recipe = await this.getSavedRecipeUseCase.execute(
      body.userId,
      body.recipeId,
      token,
    );
    const response = await this.replanRecipeUseCase.execute({
      prompt: body.prompt,
      userId: body.userId,
      recipe: RecipeMapper.fromSchematoDomain(_recipe),
    });
    return res.json(response);
  }
}
