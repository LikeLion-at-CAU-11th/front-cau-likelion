import { Request, Response } from 'express';
import { MemberService } from '../service/MemberService';
import ErrorStatus from '../utils/ErrorStatus';
export class MemberController {
  static async get(req: Request, res: Response) {
    const { page, gender, stack } = req.query;
    const result = {
      message: 'success',
    } as any;
    if (page) {
      result.data = MemberService.page(page);
    } else if (gender) {
      result.data = MemberService.gender(gender);
    } else if (stack) {
      result.data = MemberService.stack(stack);
    } else {
      throw new ErrorStatus('잘못된 요청입니다', 400);
    }
    res.json(result);
  }
}
