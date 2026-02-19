import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Recipe } from 'src/modules/recipes/domain/entities/recipe.entity';
import { Difficulty } from 'src/modules/recipes/domain/value-objects/difficulty.vo';
import { Duration } from 'src/modules/recipes/domain/value-objects/duration.vo';
import { IngredientName } from 'src/modules/recipes/domain/value-objects/ingredient-name.vo';
import { Ingredient } from 'src/modules/recipes/domain/value-objects/ingredient.vo';
import { Quantity } from 'src/modules/recipes/domain/value-objects/quantity.vo';
import { RecipeStep } from 'src/modules/recipes/domain/value-objects/recipe-step.vo';
import { StepInstruction } from 'src/modules/recipes/domain/value-objects/step-instruction.vo';
import { StepOrder } from 'src/modules/recipes/domain/value-objects/step-order.vo';
import { RecipePrompt } from '../../domain/models/recipe-prompt.model';
import { Unit } from '../../domain/value-objects/unit.vo';
import type { RecipeSchema } from '../schemas/openAI.schema';

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
                You are a culinary expert that generates recipe data. You must return exactly 1 different recipes that match the user's requirements.
                Each recipe must include:
                - A unique _id in format "recipe-[uuid]"
                - version: 1
                - title: clear, appetizing name
                - description: brief, appetizing description
                - difficulty: "easy", "medium", or "hard"
                - estimatedTimeInMinutes: realistic time estimate
                - servings: number of servings
                - ingredients: array with name, optional quantity, optional unit, optional note
                - steps: array with order (starting at 1), instruction, optional duration, optional tips
                - createdAt: current ISO 8601 datetime string
                - userId: optional user identifier
                - parentRecipeId: optional parent recipe reference

                IMPORTANT RULES:
                - All recipes must respect the dietary restrictions, cuisine type, meal type, difficulty, and time constraints
                - Ingredients must be realistic and proportional to servings
                - Steps must be clear, actionable, and in logical order
                - Each recipe must be unique and different from the others`;

      const userMessage = `
                Generate 4 recipes based on these requirements:

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
  public toDomainEntity(recipeData: RecipeSchema): Recipe {
    const ingredients = recipeData.ingredients.map(
      (ing) =>
        new Ingredient(
          new IngredientName(ing.name),
          new Quantity(ing.quantity ? Number(ing.quantity) : 0),
          new Unit(ing.unit ?? '').getValue(),
          ing.note ?? undefined,
        ),
    );

    const steps = recipeData.steps.map(
      (step) =>
        new RecipeStep(
          step.order as unknown as StepOrder,
          step.instruction as unknown as StepInstruction,
          step.duration as unknown as Duration,
        ),
    );

    return new Recipe(
      recipeData._id,
      recipeData.version,
      recipeData.title,
      recipeData.description,
      recipeData.difficulty.toLowerCase() as Difficulty,
      recipeData.estimatedTimeInMinutes,
      recipeData.servings,
      ingredients,
      steps,
      new Date(recipeData.createdAt),
      recipeData.userId ?? undefined,
      recipeData.parentRecipeId ?? undefined,
    );
  }
}
