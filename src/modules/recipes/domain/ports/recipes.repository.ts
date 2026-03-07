import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import { RecipeSchema } from '../../infrastructure/persistence/typeorm/recipe.schema';

export interface RecipesRepository {
  saveRecipe(recipe: RecipeEntity, userId: string): Promise<RecipeSchema>;
  removeRecipe(recipeId: string, userId: string): Promise<boolean>;
  generateRecipeInstance(recipe: RecipeEntity): Promise<RecipeSchema>;
}
