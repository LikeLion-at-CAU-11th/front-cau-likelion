import { Request, Response } from 'express';
import { UserDAO } from '../DAO/UserDAO';
import { CryptoService } from '../service/CryptoService';
import { UserService } from '../service/UserService';
export class SignUpController {
  static async post(req: Request, res: Response) {
    const { id, pw, name, age } = req.body;
    await UserService.signup(id, pw, name, age);
    res.status(200).json({
      status: 200,
      message: '회원가입 성공',
    });
  }
}
