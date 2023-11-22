import mongoose from "mongoose";
import express from "express";
import userRouter from './router/userRouter.js'
import cors from "cors";


const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use('/',userRouter);

var port = 8080;
mongoose.connect(
  'mongodb+srv://mongo:mongo@confusion.jpav0c7.mongodb.net/club_student_managment_system?retryWrites=true&w=majority')
    .then(() => app.listen(port))
    .then(() => console.log(`Server started on port http://localhost:${port}/`))
    .catch((err)=>console.log(err));
