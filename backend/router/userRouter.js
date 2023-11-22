import express from 'express';
import {login} from '../controller/authontication.js'
const useRouter = express.Router()

useRouter.get('/',login)

export default useRouter;