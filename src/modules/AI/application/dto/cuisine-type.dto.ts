import { IsEnum } from 'class-validator';

export enum CuisineType {
  ITALIAN = 'ITALIAN',
  MEXICAN = 'MEXICAN',
  JAPANESE = 'JAPANESE',
  INDIAN = 'INDIAN',
}

export class CuisineTypeDTO {
  @IsEnum(CuisineType)
  value!: CuisineType;
}
