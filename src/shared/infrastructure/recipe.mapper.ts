import { RecipeStep } from 'src/shared/domain/entities/recipe-step.model';
import { Ingredient } from 'src/shared/domain/value-objects/ingredient.vo';
import { RecipeSchema } from '../../modules/recipes/infrastructure/persistence/typeorm/recipe.schema';
import { Recipe } from '../domain/entities/recipe.entity';
import { DifficultyTypeEnum } from '../domain/enums/difficulty-type.enum';
import { UnitTypeEnum } from '../domain/enums/unit-type.enum';
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
        tips: s.tips ?? [],
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
          ingredient.unit
            ? UnitTypeEnum[ingredient.unit.toUpperCase()]
            : undefined, // ✅ ingredient.unit es string | null
          ingredient.notes ?? undefined, // ✅ ingredient.note es string | null (nota: es "note" no "notes")
        ),
    );
    const steps: RecipeStep[] = schema.steps.map((s: RecipeStep) => {
      const _step = {
        order: s.order ? Number(s.order) : 1,
        instruction: s.instruction
          ? String(s.instruction)
          : 'No instruction provided',
        duration: s.duration ? Number(s.duration) : 0,
        tips: s.tips ?? [],
      };
      return _step as any as RecipeStep;
    });
    return new Recipe(
      schema._id,
      schema.version,
      schema.title,
      schema.description,
      difficulty.getValue() as unknown as Recipe['difficulty'],
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
    // const ingredients: Ingredient[] = recipe.ingredients.map(
    //   (ingredient: Ingredient) => {
    //     const _ingredient = {
    //       name: ingredient.name,
    //       quantity: ingredient.quantity ?? 0,
    //       unit: ingredient.unit ?? 'G',
    //       notes: ingredient.notes ?? [],
    //     };
    //     return _ingredient as any as Ingredient;
    //   },
    // );
    // const steps: RecipeStep[] = recipe.steps.map((s: RecipeStep) => {
    //   const _step = {
    //     order: s.order ?? 1,
    //     instruction: s.instruction ?? 'No instruction provided',
    //     duration: s.duration ?? 0,
    //     tips: s.tips ?? [],
    //   };
    //   return _step as any as RecipeStep;
    // });
    const schema: Partial<RecipeSchema> = {
      title: recipe.title,
      description: recipe.description,
      difficulty: recipe.difficulty as unknown as DifficultyTypeEnum,
      estimatedTimeInMinutes: recipe.estimatedTimeInMinutes,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
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

    // return {
    //   version: recipe.version,
    //   title: recipe.title,
    //   description: recipe.description,
    //   difficulty: recipe.difficulty as unknown as DifficultyTypeEnum,
    //   estimatedTimeInMinutes: recipe.estimatedTimeInMinutes,
    //   servings: recipe.servings,
    //   ingredients: ingredients,
    //   steps: steps,
    //   createdAt: recipe.createdAt,
    // };
  }
  static parseDifficulty(value: string): Difficulty {
    const upperValue = value.toUpperCase();

    if (upperValue === 'EASY') return Difficulty.EASY;
    if (upperValue === 'MEDIUM') return Difficulty.MEDIUM;
    if (upperValue === 'HARD') return Difficulty.HARD;

    throw new Error(`Invalid difficulty value: ${value}`);
  }
}
