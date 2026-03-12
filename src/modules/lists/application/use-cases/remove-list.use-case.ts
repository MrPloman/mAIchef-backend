import { Inject, Injectable } from '@nestjs/common';

import type { ListRepository } from '../../domain/ports/list.repository';
import { RemoveListDTO } from '../dto/remove-list.dto';

@Injectable()
export class RemoveListUseCase {
  constructor(
    @Inject('ListRepository')
    private readonly listRepository: ListRepository,
  ) {}

  async execute(body: RemoveListDTO, token: string): Promise<boolean> {
    return await this.listRepository.removeList(body, token);
  }
}
