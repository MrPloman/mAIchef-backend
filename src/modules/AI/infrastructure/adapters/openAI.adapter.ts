// infrastructure/adapters/openai-ai.adapter.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai'; // Make sure to: npm install openai
import { RecipePrompt } from '../../domain/models/recipe-prompt.model';
import { AIRepository } from '../../domain/ports/ai.repository';
import { GetOpenAIConfig } from '../services/openai.service';

@Injectable()
export class OpenAIAdapter implements AIRepository {
  private readonly openai: OpenAI;

  constructor(private readonly getOpenAIConfig: GetOpenAIConfig) {
    const baseURL = this.getOpenAIConfig.getURL();
    const apiKey = this.getOpenAIConfig.getApiKey();
    this.openai = new OpenAI({
      baseURL,
      apiKey,
    });
  }

  async getGeneratedRecipe(generateRecipePrompt: RecipePrompt): Promise<any> {
    const { systemMessage, userMessage } =
      this.getOpenAIConfig.getPromptTemplate(generateRecipePrompt);
    const model = this.getOpenAIConfig.getModel();
    const recipeSchema = undefined;
    const response = await this.openai.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
    });
    const validatedRecipes = response.choices[0].message.content;

    return validatedRecipes;
  }

  async getReplannedRecipe(replannedRecipePrompt: RecipePrompt): Promise<any> {
    // Logic for replanning goes here
    return { message: 'Replanning logic not implemented yet' };
  }
}
