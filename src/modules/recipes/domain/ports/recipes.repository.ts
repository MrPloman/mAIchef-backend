import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import { RecipeSchema } from '../../infrastructure/persistence/typeorm/recipe.schema';

export interface RecipesRepository {
  saveRecipe(recipe: RecipeEntity): Promise<RecipeSchema>;
}
