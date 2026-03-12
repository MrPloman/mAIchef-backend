import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateListDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsUUID()
  @IsNotEmpty()
  listId!: string;

  @IsString()
  @IsOptional()
  description?: string;
}
