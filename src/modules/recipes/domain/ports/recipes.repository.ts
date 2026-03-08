import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import { RecipeSchema } from '../../infrastructure/persistence/typeorm/recipe.schema';

export interface RecipesRepository {
  getRecipe(
    userId: string,
    recipeId: string,
    token: string,
  ): Promise<RecipeSchema>;
  getAllUserRecipes(userId: string, token: string): Promise<RecipeSchema[]>;
  saveRecipe(
    recipe: RecipeEntity,
    userId: string,
    token: string,
  ): Promise<RecipeSchema>;
  removeRecipe(
    recipeId: string,
    userId: string,
    token: string,
  ): Promise<boolean>;
  updateRecipe(
    recipe: RecipeEntity,
    userId: string,
    token: string,
  ): Promise<RecipeSchema>;
  generateRecipeInstance(recipe: RecipeEntity): Promise<RecipeSchema>;
}
