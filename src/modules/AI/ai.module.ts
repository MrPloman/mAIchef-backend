import { Module } from '@nestjs/common';
import { GenerateRecipeUseCase } from './application/use-cases/generate-recipe.use-case';
import { OpenAIAdapter } from './infrastructure/adapters/openAI.service';
import { AIController } from './infrastructure/controllers/ai.controller';
export const RECIPE_USE_CASES = [GenerateRecipeUseCase];
@Module({
  providers: [
    ...RECIPE_USE_CASES,
    { provide: 'AIRepository', useClass: OpenAIAdapter },
  ],
  controllers: [AIController],
})
export class AiModule {}
