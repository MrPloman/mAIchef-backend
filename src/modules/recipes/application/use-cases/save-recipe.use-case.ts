import { Inject, Injectable } from '@nestjs/common';
// Add the 'type' keyword here
import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import type { RecipesRepository } from '../../domain/ports/recipes.repository';
import { RecipeSchema } from '../../infrastructure/persistence/typeorm/recipe.schema';

@Injectable()
export class SaveRecipeUseCase {
  constructor(
    @Inject('RecipesRepository')
    private readonly recipesRepository: RecipesRepository,
  ) {}

  async execute(recipe: RecipeEntity): Promise<RecipeSchema> {
    return await this.recipesRepository.saveRecipe(recipe);
  }
}
