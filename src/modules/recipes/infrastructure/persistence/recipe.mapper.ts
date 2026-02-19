import { Recipe } from '../../domain/entities/recipe.entity';
import { Duration } from '../../domain/value-objects/duration.vo';
import { IngredientName } from '../../domain/value-objects/ingredient-name.vo';
import { Quantity } from '../../domain/value-objects/quantity.vo';
import { RecipeStep } from '../../domain/value-objects/recipe-step.vo';
import { StepInstruction } from '../../domain/value-objects/step-instruction.vo';
import { StepOrder } from '../../domain/value-objects/step-order.vo';
import { RecipeSchema } from './typeorm/recipe.schema';

export class RecipeMapper {
  static toDomain(schema: RecipeSchema): Recipe {
    return new Recipe(
      schema._id,
      schema.version,
      schema.title,
      schema.description,
      schema.difficulty,
      schema.estimatedTimeInMinutes,
      schema.servings,
      schema.ingredients.map((i) => ({
        name: new IngredientName(i.name),
        quantity: new Quantity(i.quantity),
        unit: typeof i.unit === 'string' ? i.unit : (i.unit as any).getValue(),
        notes: i.notes,
      })),
      schema.steps.map(
        (s) =>
          new RecipeStep(
            s.order as unknown as StepOrder,
            s.instruction as unknown as StepInstruction,
            s.duration as unknown as Duration,
          ),
      ),
      schema.createdAt,
      schema.userId,
      schema.parentRecipeId,
    );
  }

  static toSchema(recipe: Recipe): Partial<RecipeSchema> {
    return {
      _id: recipe._id,
      version: recipe.version,
      title: recipe.title,
      description: recipe.description,
      difficulty: recipe.difficulty,
      estimatedTimeInMinutes: recipe.estimatedTimeInMinutes,
      servings: recipe.servings,
      ingredients: recipe.ingredients.map((i) => ({
        name: i.name.getValue(),
        quantity: i.quantity.getValue(),
        unit: typeof i.unit === 'string' ? i.unit : (i.unit as any).getValue(),
        notes: i.notes ?? undefined,
      })),
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
}
