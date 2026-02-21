import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { RestrictionTypeEnum } from '../../../../shared/domain/enums/restriction-type.enum';

export class RestrictionTypeDTO {
  @IsOptional()
  @IsArray()
  @IsEnum(RestrictionTypeEnum, { each: true })
  value!: RestrictionTypeEnum[];
}
