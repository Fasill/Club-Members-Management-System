import express from 'express';
import multer from 'multer'
import firebaseMiddleware from '../middleware/firebaseMiddleware.js'
import uploadController from '../controllers/eventControllers/addEvent.js'

const eventRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

eventRouter.use(firebaseMiddleware);

eventRouter.post('/upload', upload.single('image'), uploadController);

export default eventRouter;
