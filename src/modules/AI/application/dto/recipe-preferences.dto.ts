import { Type } from 'class-transformer';
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
import { CuisineTypeDTO } from './cuisine-type.dto';
import { MealTypeDTO } from './meal-type.dto';
import { RestrictionTypeDTO } from './restriction-type.dto';

export class RecipePreferencesDTO {
  @IsOptional()
  @IsNumber()
  servings?: number;

  @IsOptional()
  @IsArray()
  @Type(() => MealTypeDTO)
  @IsEnum(MealTypeEnum, { each: true })
  mealTypes?: MealTypeDTO[];

  @IsOptional()
  @IsArray()
  @Type(() => CuisineTypeDTO)
  @IsEnum(CuisineTypeEnum, { each: true })
  cuisineTypes?: CuisineTypeDTO[];

  @IsOptional()
  @IsArray()
  @Type(() => RestrictionTypeDTO)
  @IsEnum(RestrictionTypeEnum, { each: true })
  restrictions?: RestrictionTypeDTO[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(600)
  maxDuration?: Duration;
}
