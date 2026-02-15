import { List } from '../entities/list.entity';

export interface IListRepository {
  create(list: List): Promise<List>;
  findById(id: string): Promise<List | null>;
  findByUserId(userId: string): Promise<List[]>;
  update(list: List): Promise<List>;
  delete(id: string): Promise<void>;
  addRecipeToList(listId: string, recipeId: string): Promise<void>;
  removeRecipeFromList(listId: string, recipeId: string): Promise<void>;
}
