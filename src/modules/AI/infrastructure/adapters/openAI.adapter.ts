// infrastructure/adapters/openai-ai.adapter.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai'; // Make sure to: npm install openai
import { RecipePrompt } from '../../domain/models/recipe-prompt.model';
import { AIRepository } from '../../domain/ports/ai.repository';

@Injectable()
export class OpenAIAdapter implements AIRepository {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const baseURL =
      this.configService.get<string>('DEEPSEEK_API_URL') ||
      process.env.DEEPSEEK_API_URL ||
      this.configService.get<string>('DEEPSEEK_API_BASE_URL') ||
      process.env.DEEPSEEK_API_BASE_URL;
    const apiKey =
      this.configService.get<string>('DEEPSEEK_API_KEY') ||
      process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      throw new Error('DEEPSEEK_API_KEY is missing. Check your .env file.');
    }
    if (!baseURL) {
      throw new Error(
        'DEEPSEEK_API_URL or DEEPSEEK_API_BASE_URL is missing. Check your .env file.',
      );
    }

    this.openai = new OpenAI({
      baseURL,
      apiKey,
    });
  }

  async getGeneratedRecipe(generateRecipePrompt: RecipePrompt): Promise<any> {
    // 1. Build the prompt using the Domain Model
    const servings = generateRecipePrompt.preferences?.servings || 1;
    const cuisineTypes =
      generateRecipePrompt.preferences?.cuisineType?.join(', ') || '';
    const mealTypes =
      generateRecipePrompt.preferences?.mealType?.join(', ') || '';
    const restrictionTypes =
      generateRecipePrompt.preferences?.restrictionType?.join(', ') || '';
    const maxDuration = generateRecipePrompt.preferences?.maxDuration || '';

    const systemMessage = `You are a professional chef. Create 4 different recipes for 
     ${servings} people with the following preferences:
     Cuisine Types: ${cuisineTypes}
     Meal Types: ${mealTypes}
     Restriction Types: ${restrictionTypes}
     Max Duration: ${maxDuration} minutes

     The recipe should include a list of ingredients and step-by-step instructions. Be concise and clear.`;
    const userMessage = generateRecipePrompt.prompt;

    // 2. Call the external API
    const model =
      this.configService.get<string>('DEEPSEEK_API_MODEL') ||
      process.env.DEEPSEEK_API_MODEL ||
      'deepseek-chat';

    const response = await this.openai.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage },
      ],
    });

    return response.choices[0].message.content;
  }

  async getReplannedRecipe(replannedRecipePrompt: RecipePrompt): Promise<any> {
    // Logic for replanning goes here
    return { message: 'Replanning logic not implemented yet' };
  }
}
