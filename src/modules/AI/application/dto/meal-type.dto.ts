import { IsArray, IsEnum, IsOptional } from 'class-validator';

export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACK = 'SNACK',
}

export class MealTypeDTO {
  @IsOptional()
  @IsArray()
  @IsEnum(MealType)
  value!: MealType;
}
