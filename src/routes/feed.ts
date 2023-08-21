import { Router } from 'express';
import errorHandler from '../controller/errorHandler';
import { FeedController } from '../controller/FeedController';

const router = Router();
router.post('/', errorHandler(FeedController.post));
export { router as feed };
