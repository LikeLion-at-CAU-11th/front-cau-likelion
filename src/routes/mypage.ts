import errorHandler from '../controller/errorHandler';
import { MyPageController } from '../controller/MypageController';

const express = require('express');
const router = express.Router();

router.get('/', errorHandler(MyPageController.get));

export { router as mypage };
