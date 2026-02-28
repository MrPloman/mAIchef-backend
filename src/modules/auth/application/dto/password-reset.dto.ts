import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PasswordResetDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(500)
  @IsEmail()
  email!: string;
  @IsString()
  @MinLength(8)
  @MaxLength(500)
  @IsStrongPassword()
  password!: string;
  @IsString()
  token!: string;
}
