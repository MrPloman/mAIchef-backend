import { Inject, Injectable } from '@nestjs/common';

import type { ListRepository } from '../../domain/ports/list.repository';
import { ListSchema } from '../../infrastructure/persistence/typeorm/list.schema';
import { RemoveRecipeFromListDTO } from '../dto/remove-recipe-from-list.dto';

@Injectable()
export class RemoveRecipeFromListUseCase {
  constructor(
    @Inject('ListRepository')
    private readonly listRepository: ListRepository,
  ) {}

  async execute(
    body: RemoveRecipeFromListDTO,
    token: string,
  ): Promise<ListSchema> {
    return await this.listRepository.removeRecipeFromList(body, token);
  }
}
