import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { RecipePromptDTO } from '../../application/dto/recipe-prompt.dto';
import { GenerateRecipeUseCase } from '../../application/use-cases/generate-recipe.use-case';

@Controller('ai')
export class AIController {
  constructor(private readonly generateRecipeUseCase: GenerateRecipeUseCase) {}
  @Post('generateRecipe')
  async generateRecipe(@Body() body: RecipePromptDTO, @Res() res: Response) {
    const result = await this.generateRecipeUseCase.execute(body);
    return res.json(result);
  }
  @Post('replanRecipe')
  public async replanRecipe() {
    return 'entra again';
  }
}
