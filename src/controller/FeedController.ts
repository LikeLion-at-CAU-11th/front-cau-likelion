import { Request, Response } from 'express';
import { FeedService } from '../service/FeedService';

export class FeedController {
  static async post(req: Request, res: Response) {
    const { blogList } = req.body;
    const result = await FeedService.post(blogList);
    res.json(result);
  }
}
