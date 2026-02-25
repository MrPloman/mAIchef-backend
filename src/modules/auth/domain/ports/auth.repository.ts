import { UserLogin } from '../entities/user-login.interface';
import { UserResponse } from '../entities/user-response.interface';
import { User } from '../entities/user.entity';

export interface AuthRepository {
  loginUser(user: UserLogin): Promise<UserResponse>;
  registerUser(user: User): Promise<UserResponse>;
}
