import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './router/AuthRouter.js'
import studentRoute from './router/studentRoutes.js'
import teacherRoute from './router/teacherRoute.js'
import courseRoute from './router/courseRoute.js'
import gradeRoute from './router/gradeRouter.js'

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

connectDB();

app.use('/api/auth', authRouter)

app.use('/api', studentRoute)

app.use('/api', teacherRoute)

app.use('/api', courseRoute)

app.use('/api', gradeRoute)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});