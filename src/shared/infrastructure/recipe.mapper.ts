import { RecipeStep } from 'src/shared/domain/entities/recipe-step.model';
import { Duration } from 'src/shared/domain/value-objects/duration.vo';
import { Ingredient } from 'src/shared/domain/value-objects/ingredient.vo';
import { StepInstruction } from 'src/shared/domain/value-objects/step-instruction.vo';
import { StepOrder } from 'src/shared/domain/value-objects/step-order.vo';
import { Unit } from 'src/shared/domain/value-objects/unit.vo';
import { RecipeSchema } from '../../modules/recipes/infrastructure/persistence/typeorm/recipe.schema';
import { Recipe } from '../domain/entities/recipe.entity';
import { Difficulty } from '../domain/value-objects/difficulty.vo';
import { IngredientName } from '../domain/value-objects/ingredient-name.vo';
import { Quantity } from '../domain/value-objects/quantity.vo';

export class RecipeMapper {
  static fromOpenAI(openAIData: Recipe): Recipe {
    const ingredients: Ingredient[] = openAIData.ingredients.map(
      (ingredient: Ingredient) => {
        const _ingredient = {
          name: ingredient.name,
          quantity: ingredient.quantity ? Number(ingredient.quantity) : 0,
          unit: ingredient.unit ? String(ingredient.unit).toUpperCase() : 'G',
          notes: ingredient.notes ?? undefined,
        };
        return _ingredient as any as Ingredient;
      },
    );

    const steps: RecipeStep[] = openAIData.steps.map((s: RecipeStep) => {
      const _step = {
        order: s.order ? Number(s.order) : 1,
        instruction: s.instruction
          ? String(s.instruction)
          : 'No instruction provided',
        duration: s.duration ? Number(s.duration) : 0,
        tips: s.tips ?? undefined,
      };
      return _step as any as RecipeStep;
    });

    return new Recipe(
      openAIData._id,
      openAIData.version,
      openAIData.title,
      openAIData.description,
      openAIData.difficulty as unknown as Recipe['difficulty'],
      openAIData.estimatedTimeInMinutes,
      openAIData.servings,
      ingredients,
      steps,
      new Date(openAIData.createdAt),
      openAIData.userId ?? undefined,
      openAIData.parentRecipeId ?? undefined,
    );
  }
  static toDomain(schema: RecipeSchema): Recipe {
    const difficulty = this.parseDifficulty(schema.difficulty);
    const ingredients: Ingredient[] = schema.ingredients.map(
      (ingredient: any) =>
        new Ingredient(
          new IngredientName(ingredient.name), // ✅ ingredient.name es string
          new Quantity(ingredient.quantity ?? 0), // ✅ ingredient.quantity es number | null
          new Unit(ingredient.unit?.toUpperCase() ?? ''), // ✅ ingredient.unit es string | null
          ingredient.notes ?? undefined, // ✅ ingredient.note es string | null (nota: es "note" no "notes")
        ),
    );
    const steps: RecipeStep[] = schema.steps.map(
      (s) =>
        new RecipeStep(
          new StepOrder(s.order),
          new StepInstruction(s.instruction),
          new Duration(s.duration ? Number(s.duration) : 0),
          s.tips,
        ),
    );
    return new Recipe(
      schema._id,
      schema.version,
      schema.title,
      schema.description,
      difficulty,
      schema.estimatedTimeInMinutes,
      schema.servings,
      ingredients,
      steps,
      schema.createdAt,
      schema.userId,
      schema.parentRecipeId,
    );
  }

  static toSchema(recipe: Recipe): Partial<RecipeSchema> {
    const ingredients: Ingredient[] = recipe.ingredients.map(
      (ing) =>
        new Ingredient(
          new IngredientName(
            ing.name ? ing.name.getValue() : 'Unknown Ingredient',
          ),
          new Quantity(ing.quantity ? Number(ing.quantity) : 0),
          new Unit((ing.unit as Unit).getValue().toUpperCase()),
          ing.notes ?? undefined,
        ),
    );
    const steps: RecipeStep[] = recipe.steps.map(
      (s) =>
        new RecipeStep(
          new StepOrder(s.order.getValue()),
          new StepInstruction(s.instruction.getValue()),
          new Duration(s.duration?.getValue() ?? 0),
          s.tips,
        ),
    );
    return {
      _id: recipe._id,
      version: recipe.version,
      title: recipe.title,
      description: recipe.description,
      difficulty: recipe.difficulty
        .getValue()
        .toUpperCase() as unknown as RecipeSchema['difficulty'],
      estimatedTimeInMinutes: recipe.estimatedTimeInMinutes,
      servings: recipe.servings,
      ingredients: ingredients,
      steps: recipe.steps.map((s) => ({
        order: s.order.getValue(),
        instruction: s.instruction.getValue(),
        duration: s.duration?.getValue() ?? 0,
      })),
      createdAt: recipe.createdAt,
      userId: recipe.userId,
      parentRecipeId: recipe.parentRecipeId,
    };
  }
  static parseDifficulty(value: string): Difficulty {
    const upperValue = value.toUpperCase();

    if (upperValue === 'EASY') return Difficulty.EASY;
    if (upperValue === 'MEDIUM') return Difficulty.MEDIUM;
    if (upperValue === 'HARD') return Difficulty.HARD;

    throw new Error(`Invalid difficulty value: ${value}`);
  }
}
