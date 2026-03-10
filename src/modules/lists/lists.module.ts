import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateListUseCase } from './application/use-cases/create-list.use-case';
import { ListAdapter } from './infrastructure/adapters/list.adapter';
import { ListsController } from './infrastructure/controllers/lists.controller';
import { ListSchema } from './infrastructure/persistence/typeorm/list.schema';
const LISTS_USE_CASES = [CreateListUseCase];
@Module({
  imports: [TypeOrmModule.forFeature([ListSchema])],
  providers: [
    ...LISTS_USE_CASES,
    { provide: 'ListRepository', useClass: ListAdapter },
  ],
  controllers: [ListsController],
  exports: [TypeOrmModule],
})
export class ListsModule {}
