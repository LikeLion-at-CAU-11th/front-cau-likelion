import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

export class LoginController {
  static async login(req: Request, res: Response) {
    const { id, pw } = req.body;
    const { accessToken, refreshToken } = await UserService.login(id, pw);
    const response = {
      status: 200,
      message: '로그인 성공',
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
    res.json(response);
  }
}
