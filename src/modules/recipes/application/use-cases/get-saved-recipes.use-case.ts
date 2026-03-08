import { Inject, Injectable } from '@nestjs/common';
// Add the 'type' keyword here
import type { RecipesRepository } from '../../domain/ports/recipes.repository';
import { RecipeSchema } from '../../infrastructure/persistence/typeorm/recipe.schema';

@Injectable()
export class GetSavedRecipesUseCase {
  constructor(
    @Inject('RecipesRepository')
    private readonly recipesRepository: RecipesRepository,
  ) {}

  async execute(userId: string, token: string): Promise<RecipeSchema[]> {
    return await this.recipesRepository.getAllUserRecipes(userId, token);
  }
}
