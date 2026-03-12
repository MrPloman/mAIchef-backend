import { IsNotEmpty, IsUUID } from 'class-validator';

export class RemoveRecipeFromListDTO {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsUUID()
  @IsNotEmpty()
  listId!: string;

  @IsUUID()
  @IsNotEmpty()
  recipeId!: string;
}
