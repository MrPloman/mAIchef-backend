import { IsEnum } from 'class-validator';

export enum RestrictionType {
  VEGAN = 'VEGAN',
  VEGETARIAN = 'VEGETARIAN',
  GLUTEN_FREE = 'GLUTEN_FREE',
  LACTOSE_FREE = 'LACTOSE_FREE',
  NUT_FREE = 'NUT_FREE',
}

export class RestrictionTypeDTO {
  @IsEnum(RestrictionType)
  value!: RestrictionType;
}
