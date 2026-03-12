import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetAllUserListstDTO {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
