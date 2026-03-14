import { Inject, Injectable } from '@nestjs/common';

import type { ListRepository } from '../../domain/ports/list.repository';
import { ListSchema } from '../../infrastructure/persistence/typeorm/list.schema';
import { GetAllUserListstDTO } from '../dto/get-all-user-lists.dto';

@Injectable()
export class GetAllUserListsUseCase {
  constructor(
    @Inject('ListRepository')
    private readonly listRepository: ListRepository,
  ) {}

  async execute(
    body: GetAllUserListstDTO,
    token: string,
  ): Promise<ListSchema[]> {
    return await this.listRepository.getAllUserLists(body, token);
  }
}
