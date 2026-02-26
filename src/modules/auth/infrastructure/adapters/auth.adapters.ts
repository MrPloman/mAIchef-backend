import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLogin } from '../../domain/entities/user-login.interface';
import { UserRegister } from '../../domain/entities/user-register.interface';
import { UserResponse } from '../../domain/entities/user-response.interface';
import { User } from '../../domain/entities/user.entity';
import { AuthRepository } from '../../domain/ports/auth.repository';
import { UserSchema } from '../persistence/typeorm/user.schema';

@Injectable()
export class AuthAdapter implements AuthRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly authRepository: Repository<UserSchema>,
  ) {}

  async loginUser(user: UserLogin): Promise<UserResponse> {
    //     const schema = await this.authRepository.getId(
    // //       RecipeMapper.toSchema(recipe),
    //     );
    //     const savedRecipe = await this.recipeRepository.save(schema);
    return await {
      ...new User('', '', '', '', new Date(), new Date()),
      token: '',
    };
  }
  async registerUser(user: UserRegister): Promise<UserResponse> {
    const schema = await this.authRepository.create(user);
    const token = '';
    return await {
      ...new User('', '', '', '', new Date(), new Date()),
      token: '',
    };
  }
  async resetPassword(user: UserLogin): Promise<UserResponse> {
    return await {
      ...new User('', '', '', '', new Date(), new Date()),
      token: '',
    };
  }
}
