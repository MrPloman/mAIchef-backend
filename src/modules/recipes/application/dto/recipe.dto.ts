import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { RecipeStep } from 'src/shared/domain/entities/recipe-step.model';
import { DifficultyTypeEnum } from 'src/shared/domain/enums/difficulty-type.enum';
import { Ingredient } from 'src/shared/domain/value-objects/ingredient.vo';

export class RecipeDTO {
  @IsOptional()
  @IsString()
  @IsUUID()
  _id!: string;

  @IsNumber()
  version!: number;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(DifficultyTypeEnum)
  difficulty!: DifficultyTypeEnum;

  @IsNumber()
  estimatedTimeInMinutes!: number;

  @IsNumber()
  servings!: number;

  @IsArray()
  ingredients!: Ingredient[];

  @IsArray()
  steps!: RecipeStep[];

  @IsDate()
  @Type(() => Date)
  createdAt!: Date;

  @IsOptional()
  @IsString()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  parentRecipeId?: string;
}
