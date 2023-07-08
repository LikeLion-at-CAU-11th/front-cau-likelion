import { createHash } from 'crypto';
import { UserDAO } from '../DAO/LoginDAO';
import { JWTService } from './JWTService';
import ErrorStatus from '../utils/ErrorStatus';

export class UserService {
  static async getUserInfo(token) {
    const userId = await JWTService.verify(token);
    const result = await UserDAO.getUser(userId.id);
    return result;
  }
  static async login(id: string, pw: string) {
    const result = await UserDAO.getUser(id);
    const compareHash = createHash('sha512')
      .update(pw + result.salt)
      .digest('hex');

    if (result.id === id && result.pw === compareHash)
      return JWTService.make(result.id);
    throw new ErrorStatus('로그인 실패', 401);
  }
}
