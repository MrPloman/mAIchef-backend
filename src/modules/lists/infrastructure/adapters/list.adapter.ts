import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDTO } from '../../application/dto/create-list.dto';
import type { ListRepository } from '../../domain/ports/list.repository';
import { ListSchema } from '../persistence/typeorm/list.schema';

@Injectable()
export class ListAdapter implements ListRepository {
  constructor(
    @InjectRepository(ListSchema)
    private readonly listRepository: Repository<ListSchema>,
  ) {}

  async createList(list: CreateListDTO): Promise<any> {
    const listCreated = await this.listRepository.create(list);

    return await this.listRepository.save(listCreated);
  }
}
