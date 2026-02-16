import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { CuisineTypeDTO } from './cuisine-type.dto';
import { MealType, MealTypeDTO } from './meal-type.dto';
import { RestrictionTypeDTO } from './restriction-type.dto';

export class RecipePreferencesDTO {
  @IsOptional()
  @IsNumber()
  servings?: number;

  @IsOptional()
  @IsArray()
  @Type(() => MealTypeDTO)
  @IsEnum(MealType, { each: true })
  mealTypes?: MealTypeDTO[];

  @IsOptional()
  @IsArray()
  @Type(() => CuisineTypeDTO)
  cuisineTypes?: CuisineTypeDTO[];

  @IsOptional()
  @IsArray()
  @Type(() => RestrictionTypeDTO)
  restrictions?: RestrictionTypeDTO[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(600)
  maxDuration?: number;
}
