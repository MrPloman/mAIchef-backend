import { IsString, IsUUID } from 'class-validator';

export class GetRecipeInformationDTO {
  @IsString()
  @IsUUID()
  recipeId!: string;
  @IsString()
  @IsUUID()
  userId!: string;
}
