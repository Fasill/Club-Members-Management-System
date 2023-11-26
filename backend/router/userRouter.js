import express from 'express';
import {FastLogin} from '../controllers/userControllers/TokenGeneratorForFastlLogin.js';
import {signUpPresident,addMember,verifyOtpLink} from '../controllers/userControllers/addUser.js';
import {validateTokenMiddleware} from '../middleware/JwtMiddlewareToProtectHomePage.js';
import {retrieveAllMembers,retrieveAdmins,retrieveLoggedInUserInfo, retrieveMemberInfo} from '../controllers/userControllers/retrivUserInfo.js';
import {editSelfInfo,editMembersInfo,fireUser} from '../controllers/userControllers/editUserInfo.js';

const router = express.Router()

router.get('/addP',signUpPresident);
router.post('/addMember',validateTokenMiddleware,addMember);
router.get('/fast',FastLogin);
router.get('/verifyOtp',verifyOtpLink);

router.get('/retrieveAllMembers',validateTokenMiddleware,retrieveAllMembers);
router.get('/retrieveAdmins',validateTokenMiddleware,retrieveAdmins);
router.get('/retrieveLoggedInUserInfo',validateTokenMiddleware,retrieveLoggedInUserInfo);
router.get('/retrieveMemberInfo',validateTokenMiddleware,retrieveMemberInfo);

router.put('/editSelfInfo',validateTokenMiddleware,editSelfInfo);
router.put('/editMembersInfo',validateTokenMiddleware,editMembersInfo);
router.delete('/fireUser',validateTokenMiddleware,fireUser);

export default router;