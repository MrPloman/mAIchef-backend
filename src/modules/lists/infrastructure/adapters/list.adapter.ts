import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { TokenRepository } from 'src/shared/domain/ports/token.repository';
import { Repository } from 'typeorm';
import { AddRecipeToListDTO } from '../../application/dto/add-recipe-to-list.dto';
import { CreateListDTO } from '../../application/dto/create-list.dto';
import { RemoveListDTO } from '../../application/dto/remove-list.dto';
import { RemoveRecipeFromListDTO } from '../../application/dto/remove-recipe-from-list.dto';
import { UpdateListDTO } from '../../application/dto/update-list.dto';
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

  async createList(list: CreateListDTO, token: string): Promise<ListSchema> {
    const _token = this.tokenRepository.verify(token);
    if (!_token || _token.id !== list.userId) {
      throw new UnauthorizedException();
    }
    return await this.listRepository.save(list);
  }
  async removeList(list: RemoveListDTO, token: string): Promise<boolean> {
    const _token = this.tokenRepository.verify(token);
    if (!_token || _token.id !== list.userId) {
      throw new UnauthorizedException();
    }
    const schema = await this.listRepository.delete({ id: list.listId });
    if (schema.affected === 0 || !schema) {
      throw new NotFoundException('List Not Found');
    }
    return true;
  }
  async updateList(list: UpdateListDTO, token: string): Promise<ListSchema> {
    const _token = this.tokenRepository.verify(token);
    if (!_token || _token.id !== list.userId) {
      throw new UnauthorizedException();
    }
    const schema = await this.listRepository.findOneBy({ id: list.listId });
    if (!schema) throw new NotFoundException();
    const _newSchema = {
      ...schema,
      title: list.title,
      description: list.description ?? '',
    };
    return (await this.listRepository.update({ id: schema?.id }, _newSchema))
      .raw;
  }
  async addRecipeToList(
    list: AddRecipeToListDTO,
    token: string,
  ): Promise<ListSchema> {
    const _token = this.tokenRepository.verify(token);
    if (!_token || _token.id !== list.userId) {
      throw new UnauthorizedException();
    }
    const schema = await this.listRepository.findOneBy({ id: list.listId });
    if (!schema) throw new NotFoundException();
    schema.recipeIds.forEach((recipeId: string) => {
      if (recipeId === list.recipeId)
        throw new ConflictException('Recipe already in the list');
    });
    const _newSchema = {
      ...schema,
      recipeIds: [...(schema?.recipeIds ?? []), list.recipeId],
    };
    return (await this.listRepository.update({ id: schema?.id }, _newSchema))
      .raw;
  }

  async removeRecipeFromList(
    list: RemoveRecipeFromListDTO,
    token: string,
  ): Promise<ListSchema> {
    const _token = this.tokenRepository.verify(token);
    if (!_token || _token.id !== list.userId) {
      throw new UnauthorizedException();
    }
    const schema = await this.listRepository.findOneBy({ id: list.listId });
    if (!schema) throw new NotFoundException();

    if (
      !schema.recipeIds.find((recipeId: string) => recipeId === list.recipeId)
    ) {
      throw new NotFoundException('Not found recipe!');
    }
    const _newSchema = {
      ...schema,
      recipeIds: schema?.recipeIds.filter(
        (_id: string) => _id !== list.recipeId,
      ),
    };
    return (await this.listRepository.update({ id: schema?.id }, _newSchema))
      .raw;
  }
}
