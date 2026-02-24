export interface RecipeInterface {
  _id: string;
  version: number;
  title: string;
  description: string;
  difficulty: DifficultyType;
  estimatedTimeInMinutes: number;
  servings: number;
  ingredients: IngredientInterface[];
  steps: RecipeStepInterface[];
  createdAt: Date;
  userId?: string;
  parentRecipeId?: string;
}
export interface IngredientInterface {
  name: string;
  quantity?: number;
  unit?: string;
  notes?: string;
}
export interface RecipeStepInterface {
  order: number;
  instruction: string;
  duration?: number;
  tips?: string[];
}
export type DifficultyType = 'EASY' | 'MEDIUM' | 'HARD';
