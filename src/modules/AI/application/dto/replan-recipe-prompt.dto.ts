import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class ReplanRecipePrompt {
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  prompt!: string;
  @IsString()
  @IsUUID()
  userId!: string;
  @IsString()
  @IsUUID()
  recipeId!: string;
}
