import { Recipe } from '../../domain/entities/recipe.entity';
import { Ingredient } from '../../domain/value-objects/ingredient.vo';
import { RecipeStep } from '../../domain/value-objects/recipe-step.vo';
import { RecipeSchema } from './typeorm/recipe.schema';

export class RecipeMapper {
  static toDomain(schema: RecipeSchema): Recipe {
    return new Recipe(
      schema.id,
      schema.version,
      schema.title,
      schema.description,
      schema.difficulty,
      schema.estimatedTimeInMinutes,
      schema.servings,
      schema.ingredients.map(
        (i) => new Ingredient(i.name, i.quantity, i.unit, i.notes),
      ),
      schema.steps.map(
        (s) =>
          new RecipeStep(s.stepNumber, s.instruction, s.estimatedTimeInMinutes),
      ),
      schema.createdAt,
      schema.userId,
      schema.parentRecipeId,
    );
  }

  static toSchema(recipe: Recipe): Partial<RecipeSchema> {
    return {
      id: recipe._id,
      version: recipe.version,
      title: recipe.title,
      description: recipe.description,
      difficulty: recipe.difficulty,
      estimatedTimeInMinutes: recipe.estimatedTimeInMinutes,
      servings: recipe.servings,
      ingredients: recipe.ingredients.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        unit: i.unit,
        notes: i.notes,
      })),
      steps: recipe.steps.map((s) => ({
        stepNumber: s.stepNumber,
        instruction: s.instruction,
        estimatedTimeInMinutes: s.estimatedTimeInMinutes,
      })),
      createdAt: recipe.createdAt,
      userId: recipe.userId,
      parentRecipeId: recipe.parentRecipeId,
    };
  }
}
