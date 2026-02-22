import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { maxRecipes } from 'src/shared/constants';
import { RecipePrompt } from '../../domain/models/recipe-prompt.model';

@Injectable()
export class GetOpenAIConfig {
  constructor(private readonly configService: ConfigService) {}
  public getURL() {
    return (
      this.configService.get<string>('OPENAI_API_URL')! ||
      process.env.OPENAI_API_URL!
    );
  }
  public getApiKey() {
    return (
      this.configService.get<string>('OPENAI_API_KEY')! ||
      process.env.OPENAI_API_KEY!
    );
  }
  public getModel(): string {
    return (
      this.configService.get<string>('OPENAI_API_MODEL')! ||
      process.env.OPENAI_API_MODEL!
    );
  }
  public getPromptTemplate(generateRecipePrompt: RecipePrompt): {
    systemMessage: string;
    userMessage: string;
  } {
    const servings = generateRecipePrompt.preferences?.servings || 1;
    const cuisineTypes =
      generateRecipePrompt.preferences?.cuisineTypes?.join(', ');
    const mealTypes =
      generateRecipePrompt.preferences?.mealTypes?.join(', ') || '';
    const restrictionTypes =
      generateRecipePrompt.preferences?.restrictions?.join(', ') || '';
    const maxDuration = generateRecipePrompt.preferences?.maxDuration || '';

    {
      const systemMessage = `
                You are a professional culinary AI that generates structured recipe data.

                You MUST return EXACTLY ${maxRecipes} recipes.
                You MUST return ONLY valid JSON.
                Do NOT include explanations, markdown, comments, or extra text.
                Improve the recipe explanation using the steps array, be concise and friendly.

                Return a JSON array of recipe objects.

                Each recipe must follow this exact schema:

                {
                  "_id": "recipe-<uuid>",
                  "version": 1,
                  "title": "string",
                  "description": "string",
                  "difficulty": "EASY" | "MEDIUM" | "HARD",
                  "estimatedTimeInMinutes": number > 0,
                  "servings": number > 0,
                  "ingredients": [
                    {
                      "name": "string",
                      "quantity": number (optional),
                      "unit": "G" | "KG" | "ML" | "L" | "CUP" | "TBSP" | "TSP" | "UNIT" | "SLICE" | "PIECE" | "CLOVE" (optional),
                      "notes": "string" (optional)
                    }
                  ],
                  "steps": [
                    {
                      "order": number (starting at 1),
                      "instruction": "string" (you can improve and extend this field as much as you want, but it must be concise, friendly and actionable),
                      "duration": number > 0,
                      "tips": ["string"] (optional)
                    }
                  ],
                  "createdAt": "ISO 8601 datetime string",
                  "userId": "string" (optional),
                  "parentRecipeId": "string" (optional)
                }

                STRICT NUMERICAL RULES:
                - estimatedTimeInMinutes MUST be a positive integer greater than 0.
                - Each step.duration MUST be a positive integer greater than 0.
                - Step durations must sum approximately to estimatedTimeInMinutes (±5 minutes tolerance).
                - Servings must be a positive integer greater than 0.
                - No zero or negative numbers allowed anywhere.

                OTHER STRICT RULES:
                - All recipes must respect ALL user constraints.
                - estimatedTimeInMinutes must NOT exceed the maximum allowed time.
                - Ingredient quantities must be realistic and proportional to servings.
                - Steps must be logically ordered and actionable.
                - Recipes must be clearly different from each other.
                - Before returning the result, internally verify:
                - The cuisine type constraint is strictly respected.
                - At least 3 authentic ingredients from the specified cuisine are included. If not, regenerate internally.
                `;

      const userMessage = `
                Generate ${maxRecipes} different recipes with the following requirements:

                User request:
                "${generateRecipePrompt.prompt}"

                Constraints:
                - Cuisine type: ${cuisineTypes} **(IF SPECIFIED give absolute priority to these cuisines, add typical ingredients from that cuisine)**
                - Meal type: ${mealTypes}
                - Dietary restrictions: ${restrictionTypes}
                - Servings: ${servings}
                - Maximum total time: ${maxDuration} minutes

                All recipes must fully respect ALL constraints.
                Return only the JSON array.
                `;
      return { systemMessage, userMessage };
    }
  }
}
