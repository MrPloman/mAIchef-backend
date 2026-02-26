import { UserLogin } from '../entities/user-login.interface';
import { UserRegister } from '../entities/user-register.interface';
import { UserResponse } from '../entities/user-response.interface';

export interface AuthRepository {
  loginUser(user: UserLogin): Promise<UserResponse>;
  registerUser(user: UserRegister): Promise<UserResponse>;
  resetPassword(user: UserLogin): Promise<UserResponse>;
}
