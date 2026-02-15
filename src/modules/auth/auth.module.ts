import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './persistence/typeorm/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
