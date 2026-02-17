import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GenerateRecipeUseCase } from './application/use-cases/generate-recipe.use-case';
import { OpenAIAdapter } from './infrastructure/adapters/openAI.adapter';
import { AIController } from './infrastructure/controllers/ai.controller';
import { GetOpenAIConfig } from './infrastructure/services/openai.service';
export const RECIPE_USE_CASES = [GenerateRecipeUseCase];
@Module({
  imports: [ConfigModule],
  providers: [
    ...RECIPE_USE_CASES,
    { provide: 'AIRepository', useClass: OpenAIAdapter },
    GetOpenAIConfig,
  ],
  controllers: [AIController],
})
export class AiModule {}
