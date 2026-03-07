import { IsEmail, IsString } from 'class-validator';

export class SessionDTO {
  @IsEmail()
  @IsString()
  email!: string;
}
