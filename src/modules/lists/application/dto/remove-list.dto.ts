import { IsNotEmpty, IsUUID } from 'class-validator';

export class RemoveListDTO {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsUUID()
  @IsNotEmpty()
  listId!: string;
}
