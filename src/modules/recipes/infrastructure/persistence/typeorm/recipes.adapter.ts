import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipesRepository } from 'src/modules/recipes/domain/ports/recipes.repository';
import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';
import type { TokenRepository } from 'src/shared/domain/ports/token.repository';
import { RecipeMapper } from 'src/shared/infrastructure/persistence/recipe.mapper';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Import uuid v4
import { RecipeSchema } from './recipe.schema';

@Injectable()
export class RecipeAdapter implements RecipesRepository {
  constructor(
    @InjectRepository(RecipeSchema)
    private readonly recipeRepository: Repository<RecipeSchema>,
    @Inject('TokenRepository')
    private readonly tokenRepository: TokenRepository,
  ) {}

  async getAllUserRecipes(
    userId: string,
    token: string,
  ): Promise<RecipeSchema[]> {
    const _token = this.tokenRepository.verify(token);
    if (!_token || _token.id !== userId) {
      throw new UnauthorizedException();
    }
    const foundRecipes = await this.recipeRepository.findBy({
      userId: userId,
    });
    if (!foundRecipes || foundRecipes.length === 0) {
      return [];
    }

    return foundRecipes;
  }

  async getRecipe(
    userId: string,
    recipeId: string,
    token: string,
  ): Promise<RecipeSchema> {
    const _token = this.tokenRepository.verify(token);
    if (!_token || _token.id !== userId) {
      throw new UnauthorizedException();
    }
    const foundRecipe = await this.recipeRepository.findOneBy({
      _id: recipeId,
      userId: userId,
    });
    if (!foundRecipe) {
      throw new HttpException('No recipe found.', HttpStatus.CONFLICT);
    }
    return foundRecipe;
  }

  async saveRecipe(
    recipe: RecipeEntity,
    userId: string,
    token: string,
  ): Promise<RecipeSchema> {
    const _token = this.tokenRepository.verify(token);
    if (!_token || _token.id !== userId) {
      throw new UnauthorizedException();
    }
    const foundRecipe = await this.recipeRepository.findOneBy({
      _id: recipe._id,
      userId: userId,
    });
    if (foundRecipe) {
      throw new HttpException(
        'The recipe was already saved. For modification use update.',
        HttpStatus.CONFLICT,
      );
    }
    const schema = await this.recipeRepository.create(
      RecipeMapper.fromDomaintoSchema({ ...recipe, userId: userId }),
    );
    const savedRecipe = await this.recipeRepository.save(schema);
    return savedRecipe;
  }

  async removeRecipe(
    recipeId: string,
    userId: string,
    token: string,
  ): Promise<boolean> {
    const _token = this.tokenRepository.verify(token);
    if (!_token || _token.id !== userId) {
      throw new UnauthorizedException();
    }
    const schema = await this.recipeRepository.delete({ _id: recipeId });
    if (schema.affected === 0) {
      throw new NotFoundException('Recipe Not Found');
    }
    return true;
  }

  async updateRecipe(recipe: RecipeEntity, userId: string, token: string) {
    const _recipe = RecipeMapper.fromDomaintoSchema({
      ...recipe,
      userId: userId,
    });

    const _token = this.tokenRepository.verify(token);
    if (!_token || _token.id !== userId) {
      throw new UnauthorizedException();
    }
    const foundRecipe = await this.recipeRepository.findOneBy({
      _id: recipe._id,
      userId: userId,
    });
    if (!foundRecipe) {
      throw new HttpException('Recipe Not Found', HttpStatus.NOT_FOUND);
    }

    this.recipeRepository.merge(foundRecipe, _recipe);

    return this.recipeRepository.save(_recipe);
  }

  async generateRecipeInstance(recipe: RecipeEntity): Promise<RecipeSchema> {
    const schema = await this.recipeRepository.create(
      RecipeMapper.fromDomaintoSchema(recipe),
    );
    schema._id = uuidv4();
    return schema;
  }
}
