import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateRecipeUseCase } from './application/use-cases/generate-recipe.use-case';
import { SaveRecipeUseCase } from './application/use-cases/save-recipe.use-case';
import { RecipesController } from './infrastructure/controllers/recipes.controller';
import { RecipeSchema } from './infrastructure/persistence/typeorm/recipe.schema';
import { RecipeAdapter } from './infrastructure/persistence/typeorm/recipes.adapter';
const RECIPE_USE_CASES = [SaveRecipeUseCase, GenerateRecipeUseCase];
@Module({
  imports: [TypeOrmModule.forFeature([RecipeSchema])],
  controllers: [RecipesController],
  providers: [
    ...RECIPE_USE_CASES,
    { provide: 'RecipesRepository', useClass: RecipeAdapter },
  ],
  exports: [...RECIPE_USE_CASES, 'RecipesRepository'],
})
export class RecipesModule {}
