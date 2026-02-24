import { Difficulty } from '../value-objects/difficulty.vo';
import { Ingredient } from '../value-objects/ingredient.vo';
import { RecipeStep } from './recipe-step.model';

export class RecipeEntity {
  constructor(
    public readonly _id: string,
    public readonly version: number,
    public readonly title: string,
    public readonly description: string,
    public readonly difficulty: Difficulty,
    public readonly estimatedTimeInMinutes: number,
    public readonly servings: number,
    public readonly ingredients: Ingredient[],
    public readonly steps: RecipeStep[],
    public readonly createdAt: Date,
    public readonly userId?: string,
    public readonly parentRecipeId?: string,
  ) {}
}
