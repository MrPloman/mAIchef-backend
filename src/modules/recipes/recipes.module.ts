import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { GenerateRecipeInstanceUseCase } from './application/use-cases/generate-recipe-instance.use-case';
import { GetSavedRecipeUseCase } from './application/use-cases/get-saved-recipe.use-case';
import { GetSavedRecipesUseCase } from './application/use-cases/get-saved-recipes.use-case';
import { RemoveRecipeUseCase } from './application/use-cases/remove-recipe.use-case';
import { SaveRecipeUseCase } from './application/use-cases/save-recipe.use-case';
import { UpdateRecipeUseCase } from './application/use-cases/update-saved-recipe.use-case';
import { RecipesController } from './infrastructure/controllers/recipes.controller';
import { RecipeSchema } from './infrastructure/persistence/typeorm/recipe.schema';
import { RecipeAdapter } from './infrastructure/persistence/typeorm/recipes.adapter';
const RECIPE_USE_CASES = [
  SaveRecipeUseCase,
  UpdateRecipeUseCase,
  RemoveRecipeUseCase,
  GenerateRecipeInstanceUseCase,
  GetSavedRecipesUseCase,
  GetSavedRecipeUseCase,
];
@Module({
  imports: [TypeOrmModule.forFeature([RecipeSchema]), SharedModule],
  controllers: [RecipesController],
  providers: [
    ...RECIPE_USE_CASES,
    { provide: 'RecipesRepository', useClass: RecipeAdapter },
  ],
  exports: [...RECIPE_USE_CASES, 'RecipesRepository'],
})
export class RecipesModule {}
