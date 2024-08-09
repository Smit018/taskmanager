import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import { errorHandler, notFound } from './middleware/errorMiddleware.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));