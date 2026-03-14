import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { BcryptAdapter } from '../auth/infrastructure/adapters/bcrypt.adapter';
import { AddRecipeToListUseCase } from './application/use-cases/add-recipe-to-list.use-case';
import { CreateListUseCase } from './application/use-cases/create-list.use-case';
import { GetAllUserListsUseCase } from './application/use-cases/get-all-user-lists.use-case';
import { RemoveListUseCase } from './application/use-cases/remove-list.use-case';
import { RemoveRecipeFromListUseCase } from './application/use-cases/remove-recipe-from-list.use-case';
import { UpdateListUseCase } from './application/use-cases/update-list.use-case';
import { ListAdapter } from './infrastructure/adapters/list.adapter';
import { ListsController } from './infrastructure/controllers/lists.controller';
import { ListSchema } from './infrastructure/persistence/typeorm/list.schema';
const LISTS_USE_CASES = [
  GetAllUserListsUseCase,
  CreateListUseCase,
  RemoveListUseCase,
  AddRecipeToListUseCase,
  RemoveRecipeFromListUseCase,
  UpdateListUseCase,
];
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
