import { Request, Response } from 'express';
import { JWTService } from '../service/JWTService';

export class RefreshController {
  static post(req: Request, res: Response) {
    const access = req.headers.authorization;
    const { refreshToken } = req.body;
    try {
      const decoded = JWTService.refreshVerify({ access, refreshToken });
      const token = JWTService.make(decoded.id);
      res.json(token);
    } catch (err) {
      res.status(401).json({ message: '유효하지 않은 refresh token입니다.' });
    }
  }
}
