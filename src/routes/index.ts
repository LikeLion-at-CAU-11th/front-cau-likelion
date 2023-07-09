import { Router } from 'express';
import { login } from './login';
import { mypage } from './mypage';
import { refresh } from './refresh';
import { signup } from './signup';
import { user } from './user';
const router = Router();

router.use('/', login);
router.use('/signup', signup);
router.use('/mypage', mypage);
router.use('/refresh', refresh);
router.use('/user', user);

export default router;
