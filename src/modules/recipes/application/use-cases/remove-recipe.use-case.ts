import { Inject, Injectable } from '@nestjs/common';
// Add the 'type' keyword here
import type { RecipesRepository } from '../../domain/ports/recipes.repository';

@Injectable()
export class RemoveRecipeUseCase {
  constructor(
    @Inject('RecipesRepository')
    private readonly recipesRepository: RecipesRepository,
  ) {}

  async execute(recipeId: string, userId: string): Promise<boolean> {
    return await this.recipesRepository.removeRecipe(recipeId, userId);
  }
}
