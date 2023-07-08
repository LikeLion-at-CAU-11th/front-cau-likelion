import { Router } from 'express';
import { SignUpController } from '../controller/SignupContoller';
import errorHandler from '../controller/errorHandler';

const router = Router();
router.post('/', errorHandler(SignUpController.post));
export { router as signup };
