import { Request, Response } from 'express';
import { JWTService } from '../service/JWTService';
import { UserDAO } from '../DAO/LoginDAO';

export class MyPageController {
  static async get(req: Request, res: Response) {
    const userId = await JWTService.verify(req.headers.authorization);
    const result = await UserDAO.getUser(userId.id);
    res.status(200).json({ name: result.name, age: result.age });
  }
}
