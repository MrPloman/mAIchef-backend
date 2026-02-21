import { RecipeSchema } from 'src/modules/recipes/infrastructure/persistence/typeorm/recipe.schema';
import { Recipe } from '../../../../shared/domain/entities/recipe.entity';
import { IngredientName } from '../../../../shared/domain/value-objects/ingredient-name.vo';
import { Quantity } from '../../../../shared/domain/value-objects/quantity.vo';
import { RecipeStep } from '../../entities/recipe-step.model';
import { Duration } from '../../value-objects/duration.vo';
import { Ingredient } from '../../value-objects/ingredient.vo';
import { StepInstruction } from '../../value-objects/step-instruction.vo';
import { StepOrder } from '../../value-objects/step-order.vo';
import { Unit } from '../../value-objects/unit.vo';

export class RecipeMapper {
  static toDomain(schema: RecipeSchema): Recipe {
    const ingredients: Ingredient[] = schema.ingredients.map(
      (i) =>
        new Ingredient(
          new IngredientName(i.name),
          new Quantity(i.quantity ? Number(i.quantity) : 0),
          new Unit(
            typeof i.unit === 'string' ? i.unit : (i.unit as Unit).getValue(),
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
