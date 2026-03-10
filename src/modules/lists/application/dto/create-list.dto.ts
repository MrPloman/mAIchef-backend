import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateListDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsArray()
  @IsUUID('all', { each: true })
  recipeIds!: string[];

  @IsString()
  @IsOptional()
  description?: string;
}
