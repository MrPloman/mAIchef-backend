import { RecipeStep } from 'src/shared/domain/entities/recipe-step.model';
import { Duration } from 'src/shared/domain/value-objects/duration.vo';
import { Ingredient } from 'src/shared/domain/value-objects/ingredient.vo';
import { StepInstruction } from 'src/shared/domain/value-objects/step-instruction.vo';
import { StepOrder } from 'src/shared/domain/value-objects/step-order.vo';
import { Unit } from 'src/shared/domain/value-objects/unit.vo';
import { RecipeSchema } from '../../modules/recipes/infrastructure/persistence/typeorm/recipe.schema';
import { Recipe } from '../domain/entities/recipe.entity';
import { IngredientName } from '../domain/value-objects/ingredient-name.vo';
import { Quantity } from '../domain/value-objects/quantity.vo';

export class RecipeMapper {
  static toDomain(schema: RecipeSchema): Recipe {
    const ingredients: Ingredient[] = schema.ingredients.map(
      (i) =>
        new Ingredient(
          new IngredientName(i.name ? i.name.getValue() : 'Unknown Ingredient'),
          new Quantity(i.quantity ? Number(i.quantity) : 0),
          new Unit(
            typeof i.unit === 'string' ? i.unit : (i.unit as any).getValue(),
          ),
          i.notes,
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
      schema.difficulty as unknown as Recipe['difficulty'],
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
          new Unit((ing.unit as Unit).getValue()),
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
      difficulty: recipe.difficulty,
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
}
