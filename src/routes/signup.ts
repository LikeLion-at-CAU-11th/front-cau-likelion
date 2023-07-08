import { Router } from 'express';
import { SignUpController } from '../controller/SignUpContoller';
import errorHandler from '../controller/errorHandler';

const router = Router();
router.post('/', errorHandler(SignUpController.post));
export { router as signup };
