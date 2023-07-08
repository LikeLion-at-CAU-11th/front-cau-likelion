import { NextFunction, Request, Response } from 'express';
import { UserDAO } from '../DAO/LoginDAO';
import { JWTService } from '../service/JWTService';

const express = require('express');
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const userId = await JWTService.verify(req.headers.authorization);
  const result = await UserDAO.getUser(userId.id);
  res.status(200).json({ name: result.name, age: result.age });
});

export { router as mypage };
