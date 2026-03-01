import { UserSchema } from '../../infrastructure/persistence/typeorm/user.schema';
import { UserLogin } from '../entities/user-login.interface';
import { UserPasswordReset } from '../entities/user-password-reset.interface';
import { UserRegister } from '../entities/user-register.interface';
import { UserResponse } from '../entities/user-response.class';

export interface AuthRepository {
  loginUser(user: UserLogin): Promise<UserResponse>;
  registerUser(user: UserRegister): Promise<UserSchema>;
  resetPassword(user: UserPasswordReset): Promise<UserResponse>;
}
