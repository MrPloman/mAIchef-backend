import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { RecipePreferencesDTO } from './recipe-preferences.dto';

export class GenerateRecipePromptDTO {
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  prompt!: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => RecipePreferencesDTO)
  preferences?: RecipePreferencesDTO;
}
