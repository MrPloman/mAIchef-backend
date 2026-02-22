import { Inject, Injectable } from '@nestjs/common';
// Add the 'type' keyword here
import { Recipe } from 'src/shared/domain/entities/recipe.entity';
import type { RecipesRepository } from '../../domain/ports/recipes.repository';

@Injectable()
export class SaveRecipeUseCase {
  constructor(
    @Inject('RecipesRepository')
    private readonly recipesRepository: RecipesRepository,
  ) {}

  async execute(recipe: Recipe): Promise<Recipe> {
    return await this.recipesRepository.saveRecipe(recipe);
  }
}
