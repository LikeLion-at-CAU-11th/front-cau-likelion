import { Request, Response } from 'express';
import { UserDAO } from '../DAO/LoginDAO';
import { CryptoService } from '../service/CryptoService';
export class SignUpController {
  static async post(req: Request, res: Response) {
    const { id, pw, name, age } = req.body;
    const { hashedPassword, salt } = CryptoService.getSalt(pw);
    try {
      await UserDAO.signUp(id, hashedPassword, name, age, salt);
      res.status(200).json({
        status: 200,
        message: '회원가입 성공',
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: '회원가입 실패',
      });
    }
  }
}