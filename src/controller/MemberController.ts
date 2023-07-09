import { Request, Response } from 'express';
import { MemberService } from '../service/MemberService';
import ErrorStatus from '../utils/ErrorStatus';
export class MemberController {
  static async get(req: Request, res: Response) {
    const { page, gender, stack } = req.query;
    if (page) {
      const data = MemberService.page(page);
      res.json(data);
    } else if (gender) {
      const data = MemberService.gender(gender);
      res.json(data);
    } else if (stack) {
      const data = MemberService.stack(stack);
      res.json(data);
    } else {
      throw new ErrorStatus('잘못된 요청입니다', 400);
    }
  }
}
