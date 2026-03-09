import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { RecipeDTO } from './recipe.dto';

export class SaveRecipeDTO {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => RecipeDTO)
  recipe!: RecipeDTO;
  @IsString()
  @IsUUID()
  userId!: string;
}
