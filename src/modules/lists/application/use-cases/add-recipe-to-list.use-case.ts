import { Inject, Injectable } from '@nestjs/common';

import type { ListRepository } from '../../domain/ports/list.repository';
import { ListSchema } from '../../infrastructure/persistence/typeorm/list.schema';
import { AddRecipeToListDTO } from '../dto/add-recipe-to-list.dto';

@Injectable()
export class AddRecipeToListUseCase {
  constructor(
    @Inject('ListRepository')
    private readonly listRepository: ListRepository,
  ) {}

  async execute(body: AddRecipeToListDTO, token: string): Promise<ListSchema> {
    return await this.listRepository.addRecipeToList(body, token);
  }
}
