import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { CuisineType, CuisineTypeDTO } from './cuisine-type.dto';
import { MealType, MealTypeDTO } from './meal-type.dto';
import { RestrictionType, RestrictionTypeDTO } from './restriction-type.dto';

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
  @IsEnum(CuisineType, { each: true })
  cuisineTypes?: CuisineTypeDTO[];

  @IsOptional()
  @IsArray()
  @Type(() => RestrictionTypeDTO)
  @IsEnum(RestrictionType, { each: true })
  restrictions?: RestrictionTypeDTO[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(600)
  maxDuration?: number;
}
