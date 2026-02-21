// infrastructure/adapters/openai-ai.adapter.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai'; // Make sure to: npm install openai
import { maxRecipes } from 'src/shared/constants';
import { RecipeMapper } from 'src/shared/infrastructure/recipe.mapper';
import z from 'zod';
import { RecipePrompt } from '../../domain/models/recipe-prompt.model';
import { AIRepository } from '../../domain/ports/ai.repository';
import { recipeSchema } from '../schemas/openAI.schema';
import { GetOpenAIConfig } from '../services/openai.service';

@Injectable()
export class OpenAIAdapter implements AIRepository {
  private readonly openai: OpenAI;

  constructor(private readonly getOpenAIConfig: GetOpenAIConfig) {
    const apiKey = this.getOpenAIConfig.getApiKey();
    this.openai = new OpenAI({
      apiKey,
    });
  }

  async getGeneratedRecipe(generateRecipePrompt: RecipePrompt): Promise<any> {
    const { systemMessage, userMessage } =
      this.getOpenAIConfig.getPromptTemplate(generateRecipePrompt);
    const model = this.getOpenAIConfig.getModel();
    const recipesArraySchema = z.object({
      recipes: z.array(recipeSchema).length(maxRecipes),
    });
    const response = await this.openai.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: systemMessage },
        {
          role: 'user',
          content: `${userMessage}\n\nIMPORTANT: You must respond with valid JSON only. No explanations, no apologies, no extra text. Just the JSON.`,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });
    const content = response.choices[0].message.content;

    if (!content) {
      throw new Error('OpenAI returned empty content');
    }

    // Parse el JSON manualmente
    const parsedData = JSON.parse(content);
    const validatedResponse = recipesArraySchema.parse(parsedData);

    // Validar con Zod
    // const validatedRecipes = recipesArraySchema.parse(parsedData);

    return validatedResponse.recipes.map((recipeData: any) =>
      RecipeMapper.fromOpenAI(recipeData),
    );
  }

  async getReplannedRecipe(replannedRecipePrompt: RecipePrompt): Promise<any> {
    // Logic for replanning goes here
    return { message: 'Replanning logic not implemented yet' };
  }
}
