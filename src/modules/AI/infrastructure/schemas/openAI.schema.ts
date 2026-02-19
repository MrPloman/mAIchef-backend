import { z } from 'zod';

// ⭐ Transform para convertir a mayúsculas
export const difficultySchema = z
  .enum(['EASY', 'MEDIUM', 'HARD'])
  .or(
    z
      .enum(['easy', 'medium', 'hard'])
      .transform((val) => val.toUpperCase() as 'EASY' | 'MEDIUM' | 'HARD'),
  );

export const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.number().nullable().optional(),
  unit: z
    .enum([
      'G',
      'KG',
      'ML',
      'L',
      'CUP',
      'TBSP',
      'TSP',
      'UNIT',
      'SLICE',
      'PIECE',
    ])
    .or(
      z
        .enum([
          'g',
          'kg',
          'ml',
          'l',
          'cup',
          'tbsp',
          'tsp',
          'unit',
          'slice',
          'piece',
        ])
        .transform((val) => val.toUpperCase() as any),
    )
    .nullable()
    .optional(),
  note: z.string().nullable().optional(),
});

export const recipeStepSchema = z.object({
  order: z.number(),
  instruction: z.string(),
  duration: z.coerce.number().nullable().optional(),
  tips: z.array(z.string()).nullable().optional(),
});

export const recipeSchema = z.object({
  _id: z.string(),
  version: z.number(),
  title: z.string(),
  description: z.string(),
  difficulty: difficultySchema,
  estimatedTimeInMinutes: z.number(),
  servings: z.number(),
  ingredients: z.array(ingredientSchema),
  steps: z.array(recipeStepSchema),
  createdAt: z.string().datetime(),
  userId: z.string().nullable().optional(),
  parentRecipeId: z.string().nullable().optional(),
});

// ⭐ CAMBIO: min(1).max(4) en lugar de .length(4) exacto
export const recipesResponseSchema = z.object({
  recipes: z.array(recipeSchema).min(1).max(4),
});

// Types inferidos
export type RecipeSchema = z.infer<typeof recipeSchema>;
export type IngredientSchema = z.infer<typeof ingredientSchema>;
export type RecipeStepSchema = z.infer<typeof recipeStepSchema>;
export type Difficulty = z.infer<typeof difficultySchema>;
export type RecipesResponse = z.infer<typeof recipesResponseSchema>;
