import { z } from 'zod';

export const difficultySchema = z.enum(['easy', 'medium', 'hard']);

export const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.number().optional(),
  unit: z
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
    .optional(),
  note: z.string().optional(),
});

export const recipeStepSchema = z.object({
  order: z.number(),
  instruction: z.string(),
  duration: z.number().optional(),
  tips: z.array(z.string()).optional(),
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
  userId: z.string().optional(),
  parentRecipeId: z.string().optional(),
});

export const recipesArraySchema = z.array(recipeSchema).length(4);

// Types inferidos
export type RecipeSchema = z.infer<typeof recipeSchema>;
export type IngredientSchema = z.infer<typeof ingredientSchema>;
export type RecipeStepSchema = z.infer<typeof recipeStepSchema>;
export type Difficulty = z.infer<typeof difficultySchema>;
