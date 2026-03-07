import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipesRepository } from 'src/modules/recipes/domain/ports/recipes.repository';
import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import { RecipeMapper } from 'src/shared/infrastructure/persistence/recipe.mapper';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Import uuid v4
import { RecipeSchema } from './recipe.schema';

@Injectable()
export class RecipeAdapter implements RecipesRepository {
  constructor(
    @InjectRepository(RecipeSchema)
    private readonly recipeRepository: Repository<RecipeSchema>,
  ) {}

  async saveRecipe(
    recipe: RecipeEntity,
    userId: string,
  ): Promise<RecipeSchema> {
    const schema = await this.recipeRepository.create(
      RecipeMapper.fromDomaintoSchema({ ...recipe, userId: userId }),
    );
    const savedRecipe = await this.recipeRepository.save(schema);
    return savedRecipe;
  }
  async removeRecipe(recipeId: string, userId: string): Promise<boolean> {
    return true;
  }

  async generateRecipeInstance(recipe: RecipeEntity): Promise<RecipeSchema> {
    const schema = await this.recipeRepository.create(
      RecipeMapper.fromDomaintoSchema(recipe),
    );
    schema._id = uuidv4();
    return schema;
  }
}
