import { Request, Response } from 'express';
import { TestService } from '../service/TestService';

export class TestController {
  static async get(req: Request, res: Response) {
    const result = { message: 'success' } as any;
    const data = TestService.getQuizList();
    result.data = data;
    res.json(result);
  }
  static async post(req: Request, res: Response) {
    const { answer } = req.body;
    const data = TestService.getQuizResult(answer);
    res.json({ message: 'success', data });
  }
}
