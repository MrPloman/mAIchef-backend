import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddRecipeToListDTO {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;
  @IsNotEmpty()
  @IsUUID()
  recipeId!: string;
  @IsUUID()
  @IsNotEmpty()
  listId!: string;
}
