import { Router } from 'express';
import errorHandler from '../controller/errorHandler';
import { MemberController } from '../controller/MemberController';

const router = Router();
router.get('/', errorHandler(MemberController.get));

export { router as user };
