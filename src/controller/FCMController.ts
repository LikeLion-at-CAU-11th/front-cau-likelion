import { Request, Response } from 'express';
import { FCMTokenDAO } from '../DAO/FCMTokenDAO';

export class FCMController {
  static async post(req: Request, res: Response) {
    const { token } = req.body;
    await FCMTokenDAO.addToken(token);
    res.json('토큰 등록 완료');
  }

  static async get(req: Request, res: Response) {
    const result = await FCMTokenDAO.getAllToken();
    res.json(result);
  }

  static async delete(req: Request, res: Response) {
    const { token } = req.body;
    await FCMTokenDAO.deleteToken(token);
    res.json('토큰 삭제 완료');
  }
}
