// infrastructure/adapters/openai-ai.adapter.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai'; // Make sure to: npm install openai
import { RecipePrompt } from '../../domain/models/recipe-prompt.model';
import { AIRepository } from '../../domain/ports/ai.repository';

@Injectable()
export class OpenAIAdapter implements AIRepository {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
    });
  }

  async getGeneratedRecipe(generateRecipePrompt: RecipePrompt): Promise<any> {
    // 1. Build the prompt using the Domain Model
    const systemMessage = `You are a professional chef. Create a recipe for 
    // servings //
    people.`;
    const userMessage = generateRecipePrompt.prompt;

    // 2. Call the external API
    const response = await this.openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_MODEL || 'gpt-4o',
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
