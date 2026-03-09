import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { RecipeEntity } from 'src/shared/domain/entities/recipe.entity';

export class ReplanRecipe {
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  prompt!: string;
  @IsString()
  @IsUUID()
  userId!: string;
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => RecipeEntity) // <- apunta al DTO, no a la entidad
  recipe!: RecipeEntity;
}
