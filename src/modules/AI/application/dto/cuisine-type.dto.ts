import { IsArray, IsEnum, IsOptional } from 'class-validator';

export enum CuisineType {
  ITALIAN = 'ITALIAN',
  MEXICAN = 'MEXICAN',
  JAPANESE = 'JAPANESE',
  INDIAN = 'INDIAN',
}

export class CuisineTypeDTO {
  @IsOptional()
  @IsArray()
  @IsEnum(CuisineType)
  value!: CuisineType;
}
