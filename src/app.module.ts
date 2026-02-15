import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './modules/AI/ai.module';
import { AuthModule } from './modules/auth/auth.module';
import { RecipesController } from './modules/recipes/recipes.controller';
import { RecipesModule } from './modules/recipes/recipes.module';
import { RecipesService } from './modules/recipes/recipes.service';
import { ListsModule } from './modules/lists/lists.module';

@Module({
  imports: [AuthModule, AiModule, RecipesModule, ListsModule],
  controllers: [AppController, RecipesController],
  providers: [AppService, RecipesService],
})
export class AppModule {}
