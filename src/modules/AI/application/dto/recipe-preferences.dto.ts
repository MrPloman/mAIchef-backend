import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { CuisineTypeEnum } from '../../../auth/domain/enums/cuisine-type.enum';
import { MealTypeEnum } from '../../../auth/domain/enums/meal-type.enum';
import { RestrictionTypeEnum } from '../../../auth/domain/enums/restriction-type.enum';
import { Duration } from '../../domain/value-objects/duration.vo';
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
