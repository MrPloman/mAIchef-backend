import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RecoveryDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(500)
  @IsEmail()
  email!: string;
}
