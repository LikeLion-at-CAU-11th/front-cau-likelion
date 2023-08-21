import { Router } from 'express';
import { login } from './login';
import { mypage } from './mypage';
import { refresh } from './refresh';
import { signup } from './signup';
import { user } from './user';
import { liontest } from './liontest';
import { fcmtoken } from './fcmtoken';
import { feed } from './feed';
const router = Router();

router.use('/', login);
router.use('/signup', signup);
router.use('/mypage', mypage);
router.use('/refresh', refresh);
router.use('/user', user);
router.use('/liontest', liontest);
router.use('/fcmtoken', fcmtoken);
router.use('/feed', feed);

export default router;
