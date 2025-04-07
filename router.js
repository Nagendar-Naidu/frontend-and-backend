import express from 'express';
import { addTocart, loginFunc, signupFunc,authmiddleware } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post('/login',loginFunc);

userRouter.post('/register',signupFunc);

userRouter.post('/addtocart',authmiddleware,addTocart);


export {userRouter}