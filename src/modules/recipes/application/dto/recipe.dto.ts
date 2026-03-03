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
import { Difficulty } from 'src/shared/domain/value-objects/difficulty.vo';
import { Ingredient } from 'src/shared/domain/value-objects/ingredient.vo';

export class RecipeDTO {
  @IsString()
  @IsUUID()
  _id!: string;

  @IsNumber()
  version!: number;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(Difficulty)
  difficulty!: Difficulty;

  @IsNumber()
  estimatedTimeInMinutes!: number;

  @IsNumber()
  servings!: number;

  @IsArray()
  ingredients!: Ingredient[];

  @IsArray()
  steps!: RecipeStep[];

  @IsDate()
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
