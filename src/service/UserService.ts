import { UserDAO } from '../DAO/LoginDAO';
import { JWTService } from './JWTService';

export class UserService {
  static async getUserInfo(token) {
    const userId = await JWTService.verify(token);
    const result = await UserDAO.getUser(userId.id);
    return result;
  }
}
