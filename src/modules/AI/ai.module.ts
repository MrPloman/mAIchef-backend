import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecipesModule } from '../recipes/recipes.module';
import { PromptRecipeUseCase } from './application/use-cases/prompt-recipe.use-case';
import { OpenAIAdapter } from './infrastructure/adapters/openAI.adapter';
import { AIController } from './infrastructure/controllers/ai.controller';
import { GetOpenAIConfig } from './infrastructure/services/openai.service';
export const AI_USE_CASES = [PromptRecipeUseCase];

@Module({
  imports: [ConfigModule, RecipesModule],
  providers: [
    ...AI_USE_CASES,
    { provide: 'AIRepository', useClass: OpenAIAdapter },
    GetOpenAIConfig,
  ],
  controllers: [AIController],
})
export class AiModule {}
