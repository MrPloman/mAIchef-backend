import { RecipePrompt } from '../models/recipe-prompt.model';

export interface AIRepository {
  getGeneratedRecipe(generateRecipePrompt: RecipePrompt): Promise<any>;
  getReplannedRecipe(replannedRecipePrompt: RecipePrompt): Promise<any>;
}
