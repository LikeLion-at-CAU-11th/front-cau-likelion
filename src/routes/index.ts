import { Router } from 'express';
import { login } from './login';
import { mypage } from './mypage';
import { refresh } from './refresh';
import { signup } from './signup';
const router = Router();

router.use('/', login);
router.use('/signup', signup);
router.use('/mypage', mypage);
router.use('/refresh', refresh);

export default router;
