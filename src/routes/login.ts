import { Router } from 'express';
import { LoginController } from '../controller/LoginController';
import errorHandler from '../controller/errorHandler';

const router = Router();
router.post('/', errorHandler(LoginController.login));

export { router as login };
