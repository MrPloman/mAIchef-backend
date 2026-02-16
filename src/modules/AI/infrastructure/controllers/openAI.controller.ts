import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { RecipePromptDTO } from '../../application/dto/recipe-prompt.dto';

@Controller('ai')
export class OpenAIController {
  @Post('generateRecipe')
  async generateRecipe(@Body() body: RecipePromptDTO, @Res() res: Response) {
    console.log(body);
    await res.status(300).send('hola');
  }
  @Post('replanRecipe')
  public async replanRecipe() {
    return 'entra again';
  }
}
