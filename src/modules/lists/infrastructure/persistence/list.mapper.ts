import { List } from '../../domain/entities/list.entity';
import { ListSchema } from './typeorm/list.schema';

export class ListMapper {
  static toDomain(schema: ListSchema): List {
    return new List(
      schema.id,
      schema.userId,
      schema.recipeIds || [],
      schema.createdAt,
      schema.updatedAt,
    );
  }

  static toSchema(list: List): Partial<ListSchema> {
    return {
      id: list.id,
      userId: list.userId,
      recipeIds: list.recipeIds,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }
}
