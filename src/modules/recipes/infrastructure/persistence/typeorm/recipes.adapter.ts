import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipesRepository } from 'src/modules/recipes/domain/ports/recipes.repository';
import { Recipe } from 'src/shared/domain/entities/recipe.entity';
import { RecipeMapper } from 'src/shared/infrastructure/recipe.mapper';
import { Repository } from 'typeorm';
import { RecipeSchema } from './recipe.schema';

@Injectable()
export class RecipeAdapter implements RecipesRepository {
  constructor(
    @InjectRepository(RecipeSchema)
    private readonly recipeRepository: Repository<RecipeSchema>,
  ) {}

  async saveRecipe(recipe: Recipe): Promise<Recipe> {
    const schema = await this.recipeRepository.create(
      RecipeMapper.toSchema(recipe),
    );
    const saved = await this.recipeRepository.save(schema);
    const savedRecipe = RecipeMapper.toDomain(saved);
    console.log('Saved recipe:', savedRecipe);
    return savedRecipe;
  }
}
