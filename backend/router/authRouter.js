import express from 'express';
import {login,loginByEmail} from '../controllers/authControllers/login.js';

const authRouter = express.Router();

authRouter.post('/login',login);
authRouter.post('/loginByEmail',loginByEmail);


export default authRouter;