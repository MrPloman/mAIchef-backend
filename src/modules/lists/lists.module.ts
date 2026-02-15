import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListSchema } from './infrastructure/persistence/typeorm/list.schema';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([ListSchema])],
  providers: [ListsService],
  controllers: [ListsController],
  exports: [TypeOrmModule],
})
export class ListsModule {}
