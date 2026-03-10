import { Inject, Injectable } from '@nestjs/common';

import type { ListRepository } from '../../domain/ports/list.repository';
import { CreateListDTO } from '../dto/create-list.dto';

@Injectable()
export class CreateListUseCase {
  constructor(
    @Inject('ListRepository')
    private readonly listRepository: ListRepository,
  ) {}

  async execute(body: CreateListDTO, token: string): Promise<any> {
    return await this.listRepository.createList(body, token);
  }
}
