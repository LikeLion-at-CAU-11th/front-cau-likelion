import { Request } from 'express';
import { Router } from 'express';
import { JWTService } from '../service/JWTService';
const router = Router();
router.post('/', (req: Request, res) => {
  const access = req.headers.authorization;
  const { refreshToken } = req.body;
  try {
    const decoded = JWTService.refreshVerify({ access, refreshToken });
    const token = JWTService.make(decoded.id);
    res.json(token);
  } catch (err) {
    res.status(401).json({ message: '유효하지 않은 refresh token입니다.' });
  }
});
export { router as refresh };
