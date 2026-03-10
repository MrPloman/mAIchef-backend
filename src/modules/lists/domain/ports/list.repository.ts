import { CreateListDTO } from '../../application/dto/create-list.dto';

export interface ListRepository {
  createList(body: CreateListDTO, token: string): Promise<any>;
}
