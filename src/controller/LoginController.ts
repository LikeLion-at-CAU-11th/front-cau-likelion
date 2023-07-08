import { Request, Response } from 'express';
import { UserDAO } from '../DAO/LoginDAO';
import { JWTService } from '../service/JWTService';
import { createHash } from 'crypto';
import ErrorStatus from '../utils/ErrorStatus';

export class LoginController {
  static async login(req: Request, res: Response) {
    const { id, pw } = req.body;
    const result = await UserDAO.getUser(id);
    const compareHash = createHash('sha512')
      .update(pw + result.salt)
      .digest('hex');

    if (result.id === id && result.pw === compareHash) {
      const { accessToken, refreshToken } = JWTService.make(result.id);
      const response = {
        status: 200,
        message: '로그인 성공',
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
      res.json(response);
    } else {
      throw new ErrorStatus('로그인 실패', 401);
    }
  }
}
