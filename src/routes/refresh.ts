import { Router } from 'express';
import errorHandler from '../controller/errorHandler';
import { RefreshController } from '../controller/RefreshController';

const router = Router();
router.post('/', errorHandler(RefreshController.post));

export { router as refresh };
