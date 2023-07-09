import { Router } from 'express';
import errorHandler from '../controller/errorHandler';
import { TestController } from '../controller/TestController';

const router = Router();
router.get('/question', errorHandler(TestController.get));
router.post('/result', errorHandler(TestController.post));

export { router as liontest };
