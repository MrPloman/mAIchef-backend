export interface RecipeInterface {
  _id: string;
  version: number;
  title: string;
  description: string;
  difficulty: string;
  estimatedTimeInMinutes: number;
  servings: number;
  ingredients: {
    name: string;
    quantity?: number;
    unit?: string;
    notes?: string;
  }[];
  steps: {
    stepNumber: number;
    instruction: string;
  }[];
  createdAt: Date;
  userId?: string;
  parentRecipeId?: string;
}
