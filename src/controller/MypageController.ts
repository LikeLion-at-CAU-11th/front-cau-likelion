import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

export class MyPageController {
  static async get(req: Request, res: Response) {
    const token = req.headers.authorization;
    const user = await UserService.getUserInfo(token);
    res.status(200).json({ name: user.name, age: user.age });
  }
}
