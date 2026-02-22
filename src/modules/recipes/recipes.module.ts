import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveRecipeUseCase } from './application/use-cases/save-recipe.use-case';
import { RecipeSchema } from './infrastructure/persistence/typeorm/recipe.schema';
import { RecipeAdapter } from './infrastructure/persistence/typeorm/recipes.adapter';
import { RecipesController } from './recipes.controller';
const RECIPE_USE_CASES = [SaveRecipeUseCase];
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
