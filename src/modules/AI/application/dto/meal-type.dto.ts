import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { MealTypeEnum } from '../../domain/enums/meal-type.enum';

export class MealTypeDTO {
  @IsOptional()
  @IsArray()
  @IsEnum(MealTypeEnum, { each: true })
  value!: MealTypeEnum;
}
