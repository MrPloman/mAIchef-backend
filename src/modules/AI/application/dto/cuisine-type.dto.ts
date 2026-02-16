import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { CuisineTypeEnum } from '../../domain/enums/cuisine-type.enum';

export class CuisineTypeDTO {
  @IsOptional()
  @IsArray()
  @IsEnum(CuisineTypeEnum)
  value!: CuisineTypeEnum;
}
