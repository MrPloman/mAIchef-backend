import { List } from '../../domain/entities/list.entity';
import { ListSchema } from './typeorm/list.schema';

export class ListMapper {
  static toDomain(schema: ListSchema): List {
    return new List(
      schema.id,
      schema.userId,
      schema.name,
      schema.description,
      schema.recipes?.map((r) => r.id) || [],
      schema.createdAt,
      schema.updatedAt,
    );
  }

  static toSchema(list: List): Partial<ListSchema> {
    return {
      id: list.id,
      userId: list.userId,
      name: list.name,
      description: list.description ? list.description : '',
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }
}
