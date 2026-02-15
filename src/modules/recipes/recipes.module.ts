import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';

@Module({
  controllers: [RecipesController],
  providers: [RecipesModule],
})
export class RecipesModule {}
