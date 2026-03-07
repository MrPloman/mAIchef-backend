import { IsString, IsUUID } from 'class-validator';

export class RemoveRecipeDTO {
  @IsString()
  @IsUUID()
  recipeId!: string;
  @IsString()
  @IsUUID()
  userId!: string;
}
