import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeSchema } from './infrastructure/persistence/typeorm/recipe.schema';
import { RecipesController } from './recipes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeSchema])],
  controllers: [RecipesController],
  providers: [RecipesModule],
  exports: [TypeOrmModule],
})
export class RecipesModule {}
