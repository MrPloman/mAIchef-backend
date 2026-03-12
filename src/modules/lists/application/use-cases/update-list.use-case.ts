import { Inject, Injectable } from '@nestjs/common';

import type { ListRepository } from '../../domain/ports/list.repository';
import { ListSchema } from '../../infrastructure/persistence/typeorm/list.schema';
import { UpdateListDTO } from '../dto/update-list.dto';

@Injectable()
export class UpdateListUseCase {
  constructor(
    @Inject('ListRepository')
    private readonly listRepository: ListRepository,
  ) {}

  async execute(body: UpdateListDTO, token: string): Promise<ListSchema> {
    return await this.listRepository.updateList(body, token);
  }
}
