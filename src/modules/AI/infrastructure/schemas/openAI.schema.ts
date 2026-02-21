import { maxRecipes, minRecipes } from 'src/shared/constants';
import { z } from 'zod';

// ⭐ Acepta cualquier string y lo convierte a mayúsculas
export const difficultySchema = z.preprocess(
  (val) => (typeof val === 'string' ? val.toUpperCase() : val),
  z.enum(['EASY', 'MEDIUM', 'HARD']),
);

// ⭐ SOLUCIÓN: Acepta CUALQUIER string como unidad
export const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.number().nullable().optional(),
  unit: z.string().nullable().optional(), // ✅ Acepta cualquier string
  notes: z.string().nullable().optional(),
});

export const recipeStepSchema = z.object({
  order: z.number(),
  instruction: z.string(),
  duration: z.coerce.number(),
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
  recipes: z.array(recipeSchema).min(minRecipes).max(maxRecipes),
});

export type RecipesResponse = z.infer<typeof recipesResponseSchema>;
