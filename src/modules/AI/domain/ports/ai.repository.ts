import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import { RecipePrompt } from '../models/recipe-prompt.model';

export interface AIRepository {
  getGeneratedRecipe(
    generateRecipePrompt: RecipePrompt,
  ): Promise<RecipeEntity[]>;
  getReplannedRecipe(replannedRecipePrompt: RecipePrompt): Promise<any>;
}
