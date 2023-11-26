import express from 'express';
import {validateToken} from '../middleware/JwtMiddlewareToProtectHomePage.js';
import {login,loginByEmail} from '../controllers/authControllers/login.js';

const authRouter = express.Router();

authRouter.post('/login',login);
authRouter.post('/loginByEmail',loginByEmail);
authRouter.get('/validateToken',validateToken);

export default authRouter;