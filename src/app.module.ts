import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './modules/AI/ai.module';
import { AuthModule } from './modules/auth/auth.module';
import { ListsModule } from './modules/lists/lists.module';
import { RecipesModule } from './modules/recipes/recipes.module';

@Module({
  imports: [AuthModule, AiModule, RecipesModule, ListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
