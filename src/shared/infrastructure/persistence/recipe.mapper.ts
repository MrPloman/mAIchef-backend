import { RecipeStep } from 'src/shared/domain/entities/recipe-step.model';
import {
  IngredientInterface,
  RecipeInterface,
  RecipeStepInterface,
} from 'src/shared/domain/entities/recipe.interface';
import { Ingredient } from 'src/shared/domain/value-objects/ingredient.vo';
import { Unit } from 'src/shared/domain/value-objects/unit.vo';
import { RecipeSchema } from '../../../modules/recipes/infrastructure/persistence/typeorm/recipe.schema';
import { RecipeEntity } from '../../domain/entities/recipe.entity';
import { DifficultyTypeEnum } from '../../domain/enums/difficulty-type.enum';
import { UnitTypeEnum } from '../../domain/enums/unit-type.enum';
import { Difficulty } from '../../domain/value-objects/difficulty.vo';
import { Duration } from '../../domain/value-objects/duration.vo';
import { IngredientName } from '../../domain/value-objects/ingredient-name.vo';
import { Quantity } from '../../domain/value-objects/quantity.vo';
import { StepInstruction } from '../../domain/value-objects/step-instruction.vo';
import { StepOrder } from '../../domain/value-objects/step-order.vo';
export class RecipeMapper {
  static fromAIToDomain(AIData: any): RecipeEntity {
    const difficulty = AIData.difficulty
      ? new Difficulty(AIData.difficulty)
      : new Difficulty('EASY');
    const ingredients: Ingredient[] = AIData.ingredients.map(
      (ingredient: IngredientInterface) => {
        const _ingredient = {
          name:
            ingredient.name.length > 2
              ? new IngredientName(ingredient.name)
              : new IngredientName('Unknown'),
          quantity: ingredient.quantity
            ? new Quantity(ingredient.quantity)
            : new Quantity(0),
          unit: Object.values(UnitTypeEnum).includes(
            ingredient.unit as UnitTypeEnum,
          )
            ? new Unit(ingredient.unit as UnitTypeEnum)
            : new Unit(UnitTypeEnum.G),
          notes: ingredient.notes ?? '',
        };
        return _ingredient as any as Ingredient;
      },
    );

    const steps: RecipeStep[] = AIData.steps.map((s: RecipeStepInterface) => {
      const _step = {
        order:
          s.order > 0
            ? new StepOrder(s.order)
            : new StepOrder(AIData.steps.length + 1),
        instruction:
          s.instruction.length > 5
            ? new StepInstruction(s.instruction)
            : new StepInstruction('No instruction provided'),
        duration: s.duration ? new Duration(s.duration) : new Duration(0),
        tips: s.tips ?? [],
      };
      return _step as any as RecipeStep;
    });
    return new RecipeEntity(
      AIData._id,
      AIData.version,
      AIData.title,
      AIData.description,
      difficulty,
      AIData.estimatedTimeInMinutes,
      AIData.servings,
      ingredients,
      steps,
      new Date(AIData.createdAt),
      AIData.userId ?? undefined,
      AIData.parentRecipeId ?? undefined,
    );
  }

  static fromSchematoDomain(schema: RecipeSchema): RecipeEntity {
    const difficulty = schema.difficulty
      ? new Difficulty(schema.difficulty)
      : new Difficulty('EASY');
    const ingredients: Ingredient[] = schema.ingredients.map(
      (ingredient: any) => {
        const _ingredient = {
          name:
            ingredient.name.length > 2
              ? new IngredientName(ingredient.name)
              : new IngredientName('Unknown'),
          quantity: ingredient.quantity
            ? new Quantity(ingredient.quantity)
            : new Quantity(0),
          unit: ingredient.unit
            ? new Unit(ingredient.unit as UnitTypeEnum)
            : new Unit(UnitTypeEnum.G),
          notes: ingredient.notes ?? '',
        };
        return _ingredient as any as Ingredient;
      },
    );

    const steps: RecipeStep[] = schema.steps.map((s: any) => {
      const _step = {
        order:
          s.order > 0
            ? new StepOrder(s.order)
            : new StepOrder(schema.steps.length + 1),
        instruction:
          s.instruction.length > 5
            ? new StepInstruction(s.instruction)
            : new StepInstruction('No instruction provided'),
        duration: s.duration ? new Duration(s.duration) : new Duration(0),
        tips: s.tips ?? [],
      };
      return _step as any as RecipeStep;
    });

    return new RecipeEntity(
      schema._id,
      schema.version,
      schema.title,
      schema.description,
      difficulty,
      schema.estimatedTimeInMinutes,
      schema.servings,
      ingredients,
      steps,
      new Date(schema.createdAt),
      schema.userId ?? undefined,
      schema.parentRecipeId ?? undefined,
    );
  }

  static fromDomaintoSchema(recipe: RecipeEntity): Partial<RecipeSchema> {
    const difficultyValue: DifficultyTypeEnum =
      recipe.difficulty.getValue() as DifficultyTypeEnum;

    const ingredients: any[] = recipe.ingredients.map(
      (ingredient: Ingredient) => {
        return {
          name: ingredient.name.getValue(), // ✅ ingredient.name es string
          quantity: ingredient.quantity?.getValue(), // ✅ ingredient.quantity es number | null
          unit: ingredient.unit?.getValue(), // ✅ ingredient.unit es string | null
          notes: ingredient.notes ?? undefined, // ✅ ingredient.note es string | null (nota: es "note" no "notes")
        };
      },
    );
    const steps: any[] = recipe.steps.map((step: RecipeStep) => {
      return {
        order: step.order.getValue(),
        duration: step.duration.getValue(),
        instruction: step.instruction.getValue(),
        tips: step.tips ?? [],
      };
    });

    const schema: Partial<RecipeSchema> = {
      title: recipe.title,
      version: recipe.version,
      description: recipe.description,
      difficulty: difficultyValue,
      estimatedTimeInMinutes: recipe.estimatedTimeInMinutes,
      servings: recipe.servings,
      ingredients: ingredients,
      steps: steps,
      createdAt: recipe.createdAt,
    };

    // Solo incluir _id si existe y no está vacío
    if (recipe._id && recipe._id.trim() !== '') {
      schema._id = recipe._id;
    }
    if (recipe.userId && recipe.userId.trim() !== '') {
      schema.userId = recipe.userId;
    }
    if (recipe.parentRecipeId && recipe.parentRecipeId.trim() !== '') {
      schema.parentRecipeId = recipe.parentRecipeId;
    }
    return schema;
  }
  static fromDomainToClientResponse(recipe: RecipeEntity): RecipeInterface {
    return {
      _id: recipe._id,
      version: recipe.version,
      title: recipe.title,
      description: recipe.description,
      difficulty: recipe.difficulty.getValue(),
      estimatedTimeInMinutes: recipe.estimatedTimeInMinutes,
      servings: recipe.servings,
      ingredients: recipe.ingredients.map((ingredient) => ({
        name: ingredient.name.getValue(),
        quantity: ingredient.quantity ? ingredient.quantity.getValue() : 1,
        unit: ingredient.unit ? ingredient.unit.getValue() : 'G',
        notes: ingredient.notes ?? '',
      })),
      steps: recipe.steps.map((step) => ({
        order: step.order.getValue(),
        instruction: step.instruction.getValue(),
        duration: step.duration.getValue(),
        tips: step.tips ?? [],
      })),
      createdAt: recipe.createdAt,
      userId: recipe.userId ?? undefined,
      parentRecipeId: recipe.parentRecipeId ?? undefined,
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
