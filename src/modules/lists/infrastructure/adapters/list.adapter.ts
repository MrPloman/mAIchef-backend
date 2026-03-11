import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { TokenRepository } from 'src/shared/domain/ports/token.repository';
import { Repository } from 'typeorm';
import { CreateListDTO } from '../../application/dto/create-list.dto';
import type { ListRepository } from '../../domain/ports/list.repository';
import { ListSchema } from '../persistence/typeorm/list.schema';

@Injectable()
export class ListAdapter implements ListRepository {
  constructor(
    @InjectRepository(ListSchema)
    private readonly listRepository: Repository<ListSchema>,
    @Inject('TokenRepository')
    private readonly tokenRepository: TokenRepository,
  ) {}

  async createList(list: CreateListDTO, token: string): Promise<any> {
    const _token = this.tokenRepository.verify(token);
    if (!_token || _token.id !== list.userId) {
      throw new UnauthorizedException();
    }

    return await this.listRepository.save(list);
  }
}
