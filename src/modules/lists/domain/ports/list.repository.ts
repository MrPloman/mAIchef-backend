import { AddRecipeToListDTO } from '../../application/dto/add-recipe-to-list.dto';
import { CreateListDTO } from '../../application/dto/create-list.dto';
import { RemoveListDTO } from '../../application/dto/remove-list.dto';
import { RemoveRecipeFromListDTO } from '../../application/dto/remove-recipe-from-list.dto';
import { UpdateListDTO } from '../../application/dto/update-list.dto';
import { ListSchema } from '../../infrastructure/persistence/typeorm/list.schema';

export interface ListRepository {
  createList(body: CreateListDTO, token: string): Promise<ListSchema>;
  removeList(body: RemoveListDTO, token: string): Promise<boolean>;
  updateList(body: UpdateListDTO, token: string): Promise<ListSchema>;
  addRecipeToList(body: AddRecipeToListDTO, token: string): Promise<ListSchema>;
  removeRecipeFromList(
    body: RemoveRecipeFromListDTO,
    token: string,
  ): Promise<ListSchema>;
}
