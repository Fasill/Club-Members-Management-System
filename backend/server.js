import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";
import eventRouter from './router/eventRouter.js';

const app = express();

app.use(cookieParser());

app.use(cors());
app.use(express.json());

app.use(router);
app.use(authRouter);
app.use(eventRouter);

const port =  8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});