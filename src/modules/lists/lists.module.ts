import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { BcryptAdapter } from '../auth/infrastructure/adapters/bcrypt.adapter';
import { CreateListUseCase } from './application/use-cases/create-list.use-case';
import { ListAdapter } from './infrastructure/adapters/list.adapter';
import { ListsController } from './infrastructure/controllers/lists.controller';
import { ListSchema } from './infrastructure/persistence/typeorm/list.schema';
const LISTS_USE_CASES = [CreateListUseCase];
@Module({
  imports: [TypeOrmModule.forFeature([ListSchema]), SharedModule],
  providers: [
    ...LISTS_USE_CASES,
    { provide: 'ListRepository', useClass: ListAdapter },
    { provide: 'BcryptRepository', useClass: BcryptAdapter },
  ],
  controllers: [ListsController],
  exports: [TypeOrmModule],
})
export class ListsModule {}
