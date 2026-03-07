import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateRecipeInstanceUseCase } from './application/use-cases/generate-recipe-instance.use-case';
import { RemoveRecipeUseCase } from './application/use-cases/remove-recipe.use-case';
import { SaveRecipeUseCase } from './application/use-cases/save-recipe.use-case';
import { RecipesController } from './infrastructure/controllers/recipes.controller';
import { RecipeSchema } from './infrastructure/persistence/typeorm/recipe.schema';
import { RecipeAdapter } from './infrastructure/persistence/typeorm/recipes.adapter';
const RECIPE_USE_CASES = [
  SaveRecipeUseCase,
  RemoveRecipeUseCase,
  GenerateRecipeInstanceUseCase,
];
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
