import { Request, Response, Router } from 'express';
import { UserDAO } from '../DAO/LoginDAO';
import { JWTService } from '../service/JWTService';
import { createHash } from 'crypto';
const router = Router();
router.post('/', async (req: Request, res: Response) => {
  const { id, pw } = req.body;
  const result = await UserDAO.getUser(id);
  const compareHash = createHash('sha512')
    .update(pw + result.salt)
    .digest('hex');

  if (result.id === id && result.pw === compareHash) {
    const { accessToken, refreshToken } = JWTService.make(result.id);
    const response = {
      status: 200,
      message: '로그인 성공',
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
    res.json(response);
  } else {
    res.status(401).send('로그인 실패');
  }
});

export { router as login };
