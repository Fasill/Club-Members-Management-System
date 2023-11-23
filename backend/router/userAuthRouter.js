import express from 'express';
import {FastLogin} from '../controllers/userControllers/TokenGeneratorForFastlLogin.js'
import {signUpPresident,addMember} from '../controllers/userControllers/addUser.js'
import {validateTokenMiddleware} from '../middleware/JwtMiddlewareToProtectHomePage.js'
const router = express.Router()
router.get('/addP',signUpPresident)
router.post('/addMember',validateTokenMiddleware,addMember)
router.get('/fast',FastLogin)

export default router;