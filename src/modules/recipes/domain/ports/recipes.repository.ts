import { Recipe } from 'src/shared/domain/entities/recipe.entity';
import { RecipeSchema } from '../../infrastructure/persistence/typeorm/recipe.schema';

export interface RecipesRepository {
  saveRecipe(recipe: Recipe): Promise<RecipeSchema>;
}
