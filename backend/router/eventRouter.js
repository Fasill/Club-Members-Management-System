import express from 'express';

import AddEvent from '../controllers/eventControllers/AddEvent.js'
import {validateTokenMiddleware} from '../middleware/JwtMiddlewareToProtectHomePage.js';
import {GetOrderedEvents,publicGetOrderedEvents} from '../controllers/eventControllers/RetriveEvent.js'

const eventRouter = express.Router();

eventRouter.get('/GetOrderedEvents',validateTokenMiddleware,GetOrderedEvents)
eventRouter.get('/publicGetOrderedEvents',publicGetOrderedEvents)

eventRouter.post('/addevent',validateTokenMiddleware, AddEvent);

export default eventRouter;
