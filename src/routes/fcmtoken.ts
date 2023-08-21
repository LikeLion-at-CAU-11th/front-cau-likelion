import errorHandler from '../controller/errorHandler';
import { FCMController } from '../controller/FCMController';
import { MyPageController } from '../controller/MypageController';

const express = require('express');
const router = express.Router();

router.get('/', errorHandler(FCMController.get));
router.post('/', errorHandler(FCMController.post));
router.delete('/', errorHandler(FCMController.delete));

export { router as fcmtoken };
