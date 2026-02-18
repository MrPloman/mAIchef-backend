import { z } from 'zod';

export const difficultySchema = z.enum(['EASY', 'MEDIUM', 'HARD']);

export const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.number().nullable(),
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
    .nullable(),
  note: z.string().nullable(),
});

export const recipeStepSchema = z.object({
  order: z.number(),
  instruction: z.string(),
  duration: z.number().nullable(),
  tips: z.array(z.string()).nullable(),
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
  userId: z.string().nullable(),
  parentRecipeId: z.string().nullable(),
});

export const recipesResponseSchema = z.object({
  recipes: z.array(recipeSchema).length(4),
});

// Types inferidos
export type RecipeSchema = z.infer<typeof recipeSchema>;
export type IngredientSchema = z.infer<typeof ingredientSchema>;
export type RecipeStepSchema = z.infer<typeof recipeStepSchema>;
export type Difficulty = z.infer<typeof difficultySchema>;
export type RecipesResponse = z.infer<typeof recipesResponseSchema>;
