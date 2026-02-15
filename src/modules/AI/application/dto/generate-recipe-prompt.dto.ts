import { IsString, MaxLength, MinLength } from 'class-validator';
import { RecipePreferences } from '../../domain/value-objects/recipe-preferences.vo';

export class GenerateRecipePromptDTO {
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  prompt!: string;
  preferences?: RecipePreferences;
}
