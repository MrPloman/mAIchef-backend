import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Duration } from 'src/shared/domain/value-objects/duration.vo';
import { CuisineTypeEnum } from '../../../../shared/domain/enums/cuisine-type.enum';
import { MealTypeEnum } from '../../../../shared/domain/enums/meal-type.enum';
import { RestrictionTypeEnum } from '../../../../shared/domain/enums/restriction-type.enum';

export class RecipePreferencesDTO {
  @IsOptional()
  @IsNumber()
  servings?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(MealTypeEnum, { each: true })
  mealTypes?: MealTypeEnum[];

  @IsOptional()
  @IsArray()
  @IsEnum(CuisineTypeEnum, { each: true })
  cuisineTypes?: CuisineTypeEnum[];

  @IsOptional()
  @IsArray()
  @IsEnum(RestrictionTypeEnum, { each: true })
  restrictions?: RestrictionTypeEnum[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(600)
  maxDuration?: Duration;
}
