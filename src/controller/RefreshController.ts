import { Request, Response } from 'express';
import { JWTService } from '../service/JWTService';

export class RefreshController {
  static async post(req: Request, res: Response) {
    const access = req.headers.authorization;
    const { refreshToken } = req.body;
    const decoded = await JWTService.refreshVerify({ access, refreshToken });
    const token = await JWTService.make(decoded.id);
    res.json(token);
  }
}
