import express from 'express';
import {FastLogin} from '../controllers/userControllers/TokenGeneratorForFastlLogin.js';
import {signUpPresident,addMember,verifyOtpLink} from '../controllers/userControllers/addUser.js';
import {validateTokenMiddleware} from '../middleware/JwtMiddlewareToProtectHomePage.js';

const router = express.Router()

router.get('/addP',signUpPresident);
router.post('/addMember',validateTokenMiddleware,addMember);
router.get('/fast',FastLogin);
router.get('/verifyOtp',verifyOtpLink);

export default router;