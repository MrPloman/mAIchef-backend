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
      generateRecipePrompt.preferences?.cuisineType?.join(', ') || '';
    const mealTypes =
      generateRecipePrompt.preferences?.mealType?.join(', ') || '';
    const restrictionTypes =
      generateRecipePrompt.preferences?.restrictionType?.join(', ') || '';
    const maxDuration = generateRecipePrompt.preferences?.maxDuration || '';

    {
      const systemMessage = `
                You are a culinary expert that generates recipe data. You must return exactly ${maxRecipes} different recipes that match the user's requirements.
                Each recipe must include:
                - A unique _id in format "recipe-[uuid]"
                - version: 1
                - title: clear, appetizing name
                - description: brief, appetizing description
                - difficulty: "EASY", "MEDIUM", or "HARD"
                - estimatedTimeInMinutes: realistic time estimate
                - servings: number of servings
                - ingredients: array with name, optional quantity, optional unit but it has to be one of these strings ('G', 'KG', 'ML', 'L', 'CUP', 'TBSP', 'TSP', 'UNIT', 'SLICE' or 'PIECE'), optional notes
                - steps: array with order (starting at 1), instruction, duration **REQUIRED** AS A NUMBER IN MINUTES, optional tips
                - createdAt: current ISO 8601 datetime string
                - userId: optional user identifier
                - parentRecipeId: optional parent recipe reference

                IMPORTANT RULES:
                - All recipes must respect the dietary restrictions, cuisine type, meal type, difficulty, and time constraints
                - Ingredients must be realistic and proportional to servings
                - Steps must be clear, actionable, and in logical order
                - Each recipe must be unique and different from the others`;

      const userMessage = `
                Generate ${maxRecipes} recipes based on these requirements:

                User prompt: "${generateRecipePrompt.prompt}"

                Preferences:
                - Cuisine type: ${cuisineTypes}
                - Meal type: ${mealTypes}
                - Dietary restrictions: ${restrictionTypes}
                - Servings: ${servings}
                - Maximum time: ${maxDuration} minutes

                Provide 4 varied recipes that all meet these criteria.
      `;
      return { systemMessage, userMessage };
    }
  }
}
