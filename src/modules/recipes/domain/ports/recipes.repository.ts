import { Recipe } from 'src/shared/domain/entities/recipe.entity';

export interface RecipesRepository {
  saveRecipe(recipe: Recipe): Promise<Recipe>;
}
