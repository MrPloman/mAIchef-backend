import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { CuisineTypeEnum } from '../../../auth/domain/enums/cuisine-type.enum';

export class CuisineTypeDTO {
  @IsOptional()
  @IsArray()
  @IsEnum(CuisineTypeEnum, { each: true })
  value!: CuisineTypeEnum[];
}
