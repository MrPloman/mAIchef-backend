import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('ai')
export class OpenAIController {
  @Post('generateRecipe')
  async generateRecipe(@Body() body: any, @Res() res: Response) {
    await res.status(300).send('hola');
  }
  @Post('replanRecipe')
  public async replanRecipe() {
    return 'entra again';
  }
}
